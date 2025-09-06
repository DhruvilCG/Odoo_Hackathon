import db from "../config/db.js";

const createTables = () => {
    const userTable = `
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(50),
            email VARCHAR(100) UNIQUE,
            password VARCHAR(255)
        )
    `;

    const productTable = `
        CREATE TABLE IF NOT EXISTS products (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(100),
            description TEXT,
            category VARCHAR(50),
            price DECIMAL(10,2),
            user_id INT,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
    `;

    db.query(userTable);
    db.query(productTable);
};

createTables();