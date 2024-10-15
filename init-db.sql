CREATE DATABASE dashboard;

\c dashboard;

SET CLIENT_ENCODING TO 'UTF8';

CREATE TABLE publishers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    foundation_date DATE NOT NULL,
		tin NUMERIC(12, 0) NOT NULL,
		rating INTEGER NOT NULL,
		created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  	updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE boardgames (
    id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    release_date DATE NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    publishers_id INTEGER REFERENCES publishers(id),
		created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  	updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION insert_publishers()
RETURNS VOID AS $$
DECLARE i INTEGER;
BEGIN FOR i IN 1..200 LOOP INSERT INTO publishers (name, foundation_date, tin, rating)
        VALUES (
            'Hobby World ' || i,
            '2001-03-01',
            7708812210 + i,
            i
				);
    END LOOP;
END;
$$ LANGUAGE plpgsql;

SELECT insert_publishers();

CREATE OR REPLACE FUNCTION insert_boardgames()
RETURNS VOID AS $$
DECLARE
    i INTEGER;
    j INTEGER;
BEGIN
    FOR i IN 1..200 LOOP
        FOR j IN 1..20 LOOP INSERT INTO boardgames (title, release_date, price, publishers_id)
            VALUES (
                'Немезида ' || j,
                '2020-01-01',
                1000.00 + i * 10 + j,
                i
            );
        END LOOP;
    END LOOP;
END;
$$ LANGUAGE plpgsql;

SELECT insert_boardgames();


CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamp_publishers
BEFORE UPDATE ON publishers
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TRIGGER set_timestamp_boardgames
BEFORE UPDATE ON boardgames
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();