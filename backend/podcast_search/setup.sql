DROP TABLE songs;

CREATE TABLE
    songs (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255),
        artist VARCHAR(255)
    );

INSERT INTO
    songs (title, artist)
VALUES
    ('Pantropiko', 'BINI'),
    ('Doomed', 'Bring Me The Horizon'),
    ('C2 NA RED', 'zaniel');