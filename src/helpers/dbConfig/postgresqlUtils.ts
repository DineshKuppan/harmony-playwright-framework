import { Pool, PoolClient, QueryResult } from 'pg';

export class PostgreSQL {
  private pool: Pool;

  constructor(config: { user: string; host: string; database: string; password: string; port: number }) {
    this.pool = new Pool(config);
  }

  /**
   * Executes a SQL query with optional parameters.
   * @param query - The SQL query string.
   * @param params - The query parameters (if any).
   * @returns Query result rows.
   */
  async executeQuery<T>(query: string, params?: any[]): Promise<T[]> {
    let client: PoolClient | undefined;
    try {
      client = await this.pool.connect();
      const result = await client.query(query, params);
      return result.rows as T[];
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    } finally {
      client?.release();
    }
  }

  /**
   * Inserts data into a specified table.
   * @param tableName - The name of the table.
   * @param data - An object containing the column names and values.
   * @returns The inserted row(s).
   */
  async insertData<T>(tableName: string, data: Record<string, any>): Promise<T[]> {
    const columns = Object.keys(data).join(', ');
    const values = Object.values(data);
    const placeholders = values.map((_, index) => `$${index + 1}`).join(', ');

    const query = `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders}) RETURNING *`;
    return this.executeQuery<T>(query, values);
  }

  /**
   * Updates data in a specified table.
   * @param tableName - The name of the table.
   * @param data - An object containing the column names and new values.
   * @param condition - The WHERE clause condition (e.g., "id = $1").
   * @param conditionParams - The parameters for the WHERE clause.
   * @returns The updated row(s).
   */
  async updateData<T>(
    tableName: string,
    data: Record<string, any>,
    condition: string,
    conditionParams: any[]
  ): Promise<T[]> {
    const updates = Object.keys(data)
      .map((key, index) => `${key} = $${index + 1}`)
      .join(', ');
    const values = [...Object.values(data), ...conditionParams];

    const query = `UPDATE ${tableName} SET ${updates} WHERE ${condition} RETURNING *`;
    return this.executeQuery<T>(query, values);
  }

  /**
   * Deletes data from a specified table.
   * @param tableName - The name of the table.
   * @param condition - The WHERE clause condition (e.g., "id = $1").
   * @param conditionParams - The parameters for the WHERE clause.
   * @returns The number of rows deleted.
   */
  async deleteData(tableName: string, condition: string, conditionParams: any[]): Promise<number> {
    const query = `DELETE FROM ${tableName} WHERE ${condition}`;
    const result = await this.executeQuery(query, conditionParams);
    return result.length;
  }

  /**
   * Closes the database connection pool.
   */
  async close(): Promise<void> {
    await this.pool.end();
  }
}
