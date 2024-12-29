import { PostgreSQL } from './../helpers/dbConfig/postgresqlUtils';

const dbConfig = {
    user: 'your_username',
    host: 'localhost',
    database: 'your_database',
    password: 'your_password',
    port: 5432,
};

const db = new PostgreSQL(dbConfig);

async function runExamples() {
    try {
        // Insert data
        const newUser = await db.insertData('users', { name: 'John Doe', email: 'john.doe@example.com', age: 30 });
        console.log('Inserted User:', newUser);

        // Query data
        const users = await db.executeQuery('SELECT * FROM users');
        console.log('All Users:', users);

        // Update data
        const updatedUser = await db.updateData(
            'users',
            { age: 31 },
            'email = $1',
            ['john.doe@example.com']
        );
        console.log('Updated User:', updatedUser);

        // Delete data
        const deletedCount = await db.deleteData('users', 'email = $1', ['john.doe@example.com']);
        console.log('Number of Users Deleted:', deletedCount);
    } catch (error) {
        console.error('Error during database operations:', error);
    } finally {
        await db.close();
    }
}

runExamples();
