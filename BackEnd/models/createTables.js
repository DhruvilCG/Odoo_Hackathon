import db from "../config/db.js";

const createTables = () => {
  const users = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      display_name VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  const products = `
    CREATE TABLE IF NOT EXISTS products (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      title VARCHAR(150) NOT NULL,
      category VARCHAR(50) NOT NULL,
      description TEXT,
      price DECIMAL(10,2) NOT NULL,
      quantity INT DEFAULT 1,
      condition VARCHAR(50),
      year_of_manufacture YEAR,
      brand VARCHAR(50),
      model VARCHAR(50),
      length DECIMAL(10,2),
      width DECIMAL(10,2),
      height DECIMAL(10,2),
      weight DECIMAL(10,2),
      material VARCHAR(50),
      color VARCHAR(50),
      original_packaging BOOLEAN DEFAULT FALSE,
      manual_included BOOLEAN DEFAULT FALSE,
      working_condition TEXT,
      image_url VARCHAR(255),
      status VARCHAR(20) DEFAULT 'Available',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `;

  const cart = `
    CREATE TABLE IF NOT EXISTS cart (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      product_id INT NOT NULL,
      quantity INT DEFAULT 1,
      added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
    )
  `;

  const purchases = `
    CREATE TABLE IF NOT EXISTS purchases (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      product_id INT NOT NULL,
      quantity INT DEFAULT 1,
      price_paid DECIMAL(10,2),
      purchase_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
    )
  `;

  db.query(users);
  db.query(products);
  db.query(cart);
  db.query(purchases);
  console.log("Tables created (if not exist)");
};

createTables();
