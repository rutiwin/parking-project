import runQuery from "./dal"

const createTables = async () => {
    let Q = `
        CREATE TABLE IF NOT EXISTS street  (
            id INT AUTO_INCREMENT PRIMARY KEY,
            streetName VARCHAR(50) NOT NULL
        );
    `
    await runQuery(Q);

    Q = `
    CREATE TABLE IF NOT EXISTS parking (
        id INT AUTO_INCREMENT PRIMARY KEY,
        streetId INT NOT NULL,
        isOccupied BOOLEAN DEFAULT FALSE,
            FOREIGN KEY (streetId) REFERENCES street(id)
            );
    `
    await runQuery(Q)
}

const createSampleData = async () => {
    let Q = `
        INSERT INTO street (streetName) values 
        ('Kings of Israel St'),
        ('Uziel St'),
        ('Beit and Gan St'),
        ('Hafisga St'),
        ('Hafisga St'),
        ('Shamgar St'),
        ('Agron St'),
        ('Agrippa St'),
        ('Ethiopia St'),
        ('Bezalel St'),
        ('Bar-Ilan St'),
        ('Sderot Ben Maimon'),
        ('Sderot Ben-Zvi'),
        ('Ben Yehuda St'),
        ('Bar-Lev Boulevard'),
        ('pedestrian way'),
        ('Hillel St'),
        ('Sderot Herzl'),
        ('Sderot Weizman'),
        ('Jaffa St'),
        ('Mea Shearim St'),
        ('King George St'),
        ('King David St'),
        ('Sultan Suleiman St'),
        ('Salah a-Din St'),
        ('Gaza Road'),
        ('Jeremiah St'),
        ('Rachel Ameno St'),
        ('Ramban St'),
        ('Israel Tribes St'),
        ('Sderot Meiri'),
        ('Levy Eshkol Blvd'),
        ('Sderot Moshe Dayan'),
        ('Sderot Zalman Shazer'),
        ('Strauss St'),
        ('Queen Shlomzion St'),
        ('Raul Wallenberg St');        
    `
    await runQuery(Q);

    Q = `
    INSERT INTO parking (streetId) values 
        (3),
        (5),
        (12),
        (6),
        (1),
        (7),
        (29),
        (25),
        (8),
        (6),
        (16),
        (26),
        (25),
        (22),
        (23),
        (29),
        (14),
        (1),
        (4),
        (24),
        (2),
        (5),
        (15),
        (10),
        (11),
        (21),
        (22),
        (22),
        (23),
        (17),
        (20),
        (18),
        (7),
        (18),
        (28),
        (10),
        (9),
        (25),
        (28),
        (31),
        (30),
        (24),
        (2);
    `
    await runQuery(Q);
}

// createTables().then(() => {
//     console.log("Done creating tables");
// })

// createSampleData().then(()=>{console.log("Done adding data");})
