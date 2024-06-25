-- Create the products table
CREATE TABLE products (
    id SERIAL PRIMARY KEY,           -- Unique identifier for each product
    name VARCHAR(255) NOT NULL,      -- Name of the product
    description TEXT,                -- Description of the product
    price DECIMAL(10, 2) NOT NULL,   -- Price of the product
    stock_quantity INT NOT NULL,     -- Quantity of the product in stock
    category VARCHAR(100),           -- Category of the product
    date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Date and time the product was added
    is_available BOOLEAN DEFAULT TRUE -- Indicates if the product is available for sale
);