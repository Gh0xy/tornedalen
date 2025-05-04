CREATE TABLE IF NOT EXISTS kontaktmeddelanden (
    id INT AUTO_INCREMENT PRIMARY KEY,
    förnamn VARCHAR(100) NOT NULL,
    efternamn VARCHAR(100) NOT NULL,
    telefon VARCHAR(50),
    epost VARCHAR(255) NOT NULL,
    meddelande TEXT NOT NULL,
    skapad DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS diskussionsinlägg (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ämne VARCHAR(255) NOT NULL,
    författare VARCHAR(100) NOT NULL,
    epost VARCHAR(255) NOT NULL,
    inlägg TEXT NOT NULL,
    skapad DATETIME DEFAULT CURRENT_TIMESTAMP,
    parent_id INT,
    CONSTRAINT fk_parent FOREIGN KEY (parent_id) REFERENCES diskussionsinlägg(id) ON DELETE CASCADE
);