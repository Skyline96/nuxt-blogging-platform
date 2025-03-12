import { open } from "sqlite";
import sqlite3 from "sqlite3";

let dbInstance = null;

export const initDB = async () => {
    // Reuse existing database connection
    if (dbInstance) return dbInstance;
    
    try {
        const db = await open({
            filename: "./database.sqlite",
            driver: sqlite3.Database,
        });

        // Create users table
        await db.exec(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                username TEXT UNIQUE,
                password TEXT
            )
        `);

        // Create blogposts table
        await db.exec(`
            CREATE TABLE IF NOT EXISTS blogposts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER,
                title TEXT NOT NULL,
                content TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )
        `);

        console.log("Database initialized successfully");
        dbInstance = db;
        return db;
    } catch (error) {
        console.error("Failed to initialize database:", error);
        throw error;
    }
};