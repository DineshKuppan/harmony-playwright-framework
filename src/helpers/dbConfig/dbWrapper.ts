import { Pool, QueryResult } from 'pg';
import mysql, { Pool as MySQLPool } from 'mysql2/promise';
import { MongoClient, Db, Collection, Document } from 'mongodb';

export type DatabaseType = 'postgresql' | 'mysql' | 'mongodb';

interface DbConfig {
    type: DatabaseType;
    postgresql?: { user: string; host: string; database: string; password: string; port: number };
    mysql?: { user: string; host: string; database: string; password: string; port: number };
    mongodb?: { url: string; dbName: string };
}

export class DBWrapper {
    private dbType: DatabaseType;
    private pgPool?: Pool;
    private mysqlPool?: MySQLPool;
    private mongoClient?: MongoClient;
    private mongoDb?: Db;

    constructor(private config: DbConfig) {
        this.dbType = config.type;

        if (config.type === 'postgresql' && config.postgresql) {
            this.pgPool = new Pool(config.postgresql);
        } else if (config.type === 'mysql' && config.mysql) {
            this.mysqlPool = mysql.createPool(config.mysql);
        } else if (config.type === 'mongodb' && config.mongodb) {
            this.mongoClient = new MongoClient(config.mongodb.url);
        }
    }

    /**
     * Initialize the database connection (for MongoDB).
     */
    async initialize(): Promise<void> {
        if (this.dbType === 'mongodb' && this.mongoClient) {
            await this.mongoClient.connect();
            this.mongoDb = this.mongoClient.db(this.config.mongodb?.dbName);
        }
    }

    /**
     * Executes a query (PostgreSQL or MySQL).
     * @param query - The SQL query string.
     * @param params - The query parameters (optional).
     * @returns The query result rows.
     */
    async executeQuery<T>(query: string, params?: any[]): Promise<T[]> {
        if (this.dbType === 'postgresql' && this.pgPool) {
            const result = await this.pgPool.query(query, params);
            return result.rows as T[];
        } else if (this.dbType === 'mysql' && this.mysqlPool) {
            const [rows] = await this.mysqlPool.execute(query, params);
            return rows as T[];
        } else {
            throw new Error('executeQuery is only supported for PostgreSQL and MySQL.');
        }
    }

    /**
     * Performs MongoDB operations on a collection.
     * @param collectionName - The MongoDB collection name.
     * @param operation - A function performing operations on the collection.
     */
    async withMongoCollection<T>(
        collectionName: string,
        operation: (collection: Collection<Document>) => Promise<T>
    ): Promise<T> {
        if (this.dbType !== 'mongodb' || !this.mongoDb) {
            throw new Error('withMongoCollection is only supported for MongoDB.');
        }
        const collection = this.mongoDb.collection(collectionName);
        return operation(collection);
    }

    /**
     * Closes the database connection pool or client.
     */
    async close(): Promise<void> {
        if (this.dbType === 'postgresql' && this.pgPool) {
            await this.pgPool.end();
        } else if (this.dbType === 'mysql' && this.mysqlPool) {
            await this.mysqlPool.end();
        } else if (this.dbType === 'mongodb' && this.mongoClient) {
            await this.mongoClient.close();
        }
    }
}
