-- Active: 1682397207093@@127.0.0.1@3306@csv_personal_financial_manager_db

DROP DATABASE IF EXISTS csv_personal_financial_manager_db;

CREATE DATABASE csv_personal_financial_manager_db;

USE csv_personal_financial_manager_db;

CREATE TABLE
    users (
        id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
        firstname varchar(254) NOT NULL,
        lastname varchar(254) NOT NULL,
        photo varchar(254),
        email varchar(254) NOT NULL UNIQUE,
        hash varchar(254) NOT NULL
    );

CREATE TABLE
    files (
        id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
        original_name VARCHAR(254) NOT NULL,
        filename_server VARCHAR(254) NOT NULL,
        account_nb INT NOT NULL,
        created_date DATE DEFAULT (CURRENT_DATE) NOT NULL,
        start_period VARCHAR(100) NOT NULL,
        end_period VARCHAR(100) NOT NULL,
        size INT NOT NULL,
        user_id INT NOT NULL
    );

CREATE TABLE
    transactions (
        id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
        bank_date VARCHAR(254) NOT NULL,
        transaction_date VARCHAR(100) NOT NULL,
        value VARCHAR(100) NOT NULL,
        title VARCHAR(254) NOT NULL,
        description VARCHAR(254) NOT NULL,
        undefined VARCHAR(100) NULL,
        file_id INT NOT NULL,
        category_id INT NOT NULL
    );

CREATE TABLE
    types (
        id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
        title varchar(254) NOT NULL,
        description varchar(254) NOT NULL
    );

CREATE TABLE
    transactions_types (
        id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
        transaction_id INT NOT NULL,
        type_id INT NOT NULL,
        FOREIGN KEY (transaction_id) REFERENCES transactions(id),
        FOREIGN KEY (type_id) REFERENCES types(id)
    );

CREATE TABLE
    categories (
        id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
        title varchar(254) NOT NULL,
        description varchar(254) NOT NULL
    );

INSERT INTO
    users (
        firstname,
        lastname,
        photo,
        email,
        hash
    )
VALUES (
        "toto",
        "tota",
        NULL,
        "toto@toto.com",
        "toto"
    ), (
        "toto1",
        "tota1",
        NULL,
        "toto1@toto.com",
        "toto1"
    ), (
        "toto2",
        "tota2",
        NULL,
        "toto2@toto.com",
        "toto2"
    ), (
        "toto3",
        "tota3",
        NULL,
        "toto3@toto.com",
        "toto3"
    ), (
        "toto4",
        "tota4",
        NULL,
        "toto4@toto.com",
        "toto4"
    ), (
        "toto5",
        "tota5",
        NULL,
        "toto5@toto.com",
        "toto5"
    ), (
        "toto6",
        "tota6",
        NULL,
        "toto6@toto.com",
        "toto6"
    );

INSERT INTO
    files (
        original_name,
        filename_server,
        account_nb,
        created_date,
        start_period,
        end_period,
        size,
        user_id
    )
VALUES (
        "testFile",
        "testFileServer",
        12345,
        "2023-01-01",
        "2023-02-01",
        "2023-02-28",
        546,
        1
    ), (
        "testFile1",
        "testFileServer1",
        23455,
        "2023-02-01",
        "2023-03-01",
        "2023-03-31",
        1546,
        2
    ), (
        "testFile2",
        "testFileServer2",
        132445,
        "2023-03-01",
        "2023-04-01",
        "2023-04-30",
        345,
        2
    ), (
        "testFile",
        "testFileServer",
        3214,
        "2023-04-01",
        "2023-05-01",
        "2023-05-30",
        3243,
        3
    ), (
        "testFile",
        "testFileServer",
        53425,
        "2023-06-01",
        "2023-06-01",
        "2023-06-31",
        567,
        1
    );

INSERT INTO
    categories (title, description)
Values (
        "Market places",
        "All kind of daily things bought in a super market"
    ), (
        "Shopping",
        "All kind of things bought like clothes..."
    ), (
        "Amazon",
        "All kind of things bought from Amazon"
    ), (
        "Health",
        "All kind of things bought pharmacy, hospital, doctor..."
    ), (
        "Assurances",
        "All kind of assurances"
    ), (
        "Home",
        "All kind of things like bills, water, electricity, gaz..."
    ), (
        "Cars",
        "All kind of things bought like, gasoline, tiers, garage..."
    ), (
        "Communications",
        "All kind of bills from phone usage"
    ), (
        "Transports",
        "All kind of bills from voyaging"
    ), (
        "Undefined",
        "All transactions that aren't in the categories"
    );

INSERT INTO
    transactions (
        bank_date,
        value,
        title,
        description,
        transaction_date,
        undefined,
        file_id,
        category_id
    )
VALUES (
        "Super Market",
        "Super Market desc",
        "23-01-02",
        "23-01-01",
        "50",
        NULL,
        1,
        1
    ), (
        "Super Market1",
        "Super Market desc1",
        "23-01-02",
        "23-01-01",
        "43",
        NULL,
        2,
        1
    ), (
        "Super Market",
        "Super Market desc",
        "23-01-02",
        "23-01-01",
        "324",
        NULL,
        3,
        3
    );

INSERT INTO
    types (title, description)
VALUES (
        "debit",
        "remove an amount of money"
    ), (
        "credit",
        "add an amount of money"
    ), (
        "external",
        "involve outside organization"
    ), (
        "internal",
        "not involve outside organization"
    ), ("personal", "????"), (
        "bank",
        "internal bank transaction"
    );

INSERT INTO
    transactions_types (transaction_id, type_id)
VALUES (1, 1), (1, 3), (2, 1);