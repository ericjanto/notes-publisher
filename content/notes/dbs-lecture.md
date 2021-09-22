---
title: DBS Lecture Write-Up
slug: dbs-lecture
template: post
noteType:
    - Lecture Write-up
course:
    - DBS
---

```toc
from-heading: 2
to-heading: 6
```

## Week 1: Introduction and Basic SQL

- Introduction
  - Data is the most important asset of any enterprise
  - To be turned into meaningful information, must find way to effectively, efficiently, and reliably:
    - collect and store
    - maintain and update
    - process and analyse data.
  - That way should enable *decision making*
  - What is a database?
    > A collection of data items related to a specific enterprise, which is structured and organised so as to be more easily accessed, managed, and updated.
  - **D**ata**b**ase **M**anagement **S**ystem (DBMS)
    - Software package for creating and managing databases
    - Mediates interaction between end-users and the database
      - End-users can be humans or applications
    - Ensures that data is consistently organised and remains easily accessible
      - This makes sense since you could see a DBMS as a kind of interface between the user and the database system, and when manipulating the database system through the same interface, its ensured to be manipulated in a consistent way
  - Advantages of a DBMS
    - Uniform data administration
    - Efficient access to resources
    - Data independence
      - Question: What does data independence mean?
      - Answer: You don't want the logical description of your data and the physical storage of your data entangled so that one change requires a change of the other one.
        - Description of the data vs actual raw data that is stored
        - The application does not need to know how the data is organised (similar to intefaces and encapsulation paradigm in OOP)
    - Reduced application development time
    - Data integrity and security
    - Concurrent access
    - Recovery from crashes
  - Different kinds of data(bases)
    - A *data model* is a collection of concepts for describing data
    - A *schema* is a description of a particular collection of data, using a given data model
      - A schema is just the table name and the attributes
      - Analogy:
        - A data model is like some programming paradigm, like OOP
        - While the schema (table name and attributes) is a particular implementation of that paradigm, like the organisation of the code into classes
        - The data could be the objects of those classes
    - Relational databases
      - Data organised in tables (relations) with typed attributes
      - Most common type of databases out there
    - Document stores
      - Text documents structured using tags (similar to HTML tags)
    - Graph databases
      - Data organised in graph structures with nodes and edges
      - Common for modelling social networks
    - Key-value stores
      - Data organised in associative arrays (i.e. dictionaries or maps)
  - The relational model
    - Simple idea: organise data in *tables*
      - Those tables are also called *relations*
    - Datamodel: a relational one, tables
    - Schema (concept of a relational database model):
      - Description of the data, how it is organised
      - We have a set of *table names*
        - Kind of like an index which points to all tables
      - List of distinct (typed) *column names* (= *attributes*) for each table
      - *Constraints* within a table or between tables
    - Instance
      - That's what the actual data is
        - It's stored in the rows of the tables
      - Must satisfy typing and constraints
  - Example of a relational database

    **Customer**
    | CustID | Name   | City      | Address         |
    | ------ | ------ | --------- | --------------- |
    | cust1  | Renton | Edinburgh | 2 Wellington Pl |
    | cust2  | Watson | London    | 221B Baker St   |
    | cust3  | Holmes | London    | 221B Baker St   |


    **Account**
    | Number | Branch     | CustID | Balance |
    | ------ | ---------- | ------ | ------- |
    | 243576 | Edinburgh  | cust1  | -120.00 |
    | 250018 | London     | cust3  | 5621.73 |
    | 745622 | Manchester | cust2  | 1503.82 |

  - This is a database with a collection of tables $\{Customer, Account\}$
  - Below are schema and instances illustrated:

    ![Sample table, the red area is the schema, blue are the instances](../images/dbs-schema.png 'Red: Schema (table title and attributes), blue: instances (the actual data)')

  - Query Languages
    - Used to ask questions (queries) to a database
    - Two different types of query languages
      - Procedural: specify a *sequence of steps* to obtain the expected result
      - Declarative: specify *what* you want, not *how* to get it
    - Typically, queries are asked in a declarative way
    - DBMSs figure out internally how to translate a query into procedures
      - Analogy: using a high-level programming language (declarative) and the compiler figures out internally how to translate it into an imperative script in machine language so that the computer can understand it (procedural)
  - SQL
    - **S**tructured **Q**uery **L**anguage
    - *Declarative* language for querying relational databases
    - Implemented in all major RDBMSs (Relational DBMSs)
- Basic SQL
  - Consists of two sublanguages
    - **DDL**: Data definition language
      - Operations on the schema (the set of table names and the list of column names)
    - **DML**: Data manipulation language
      - Operations on the instance (the rows, data itself)
  - *Base tables* are tables that you define in the schema of your database
  - Non-base tables are called *views*
    - For example outputs of queries
  - Creating tables
    ```sql
    -- Syntax
    CREATE TABLE <table_name> (
        <column 1> <type1>,
        <column 2> <type2>,
        ...
        <column N> <typeN>
    );

    -- Example
    CREATE TABLE Customer(
        custid  varchar(10),
        name    varchar(20),
        city    varchar(30),
        address varchar(30)
    );
    ```
  - Most common SQL data types
    - Strings
      - `varchar(n)`, at most `n` characters
    - Numbers
      - *Byte indications may differ for different programs, these are correct for PostgreSQL*
      - `smallint` (2 bytes)
      - `integer` or `int` (4 bytes)
      - `bigint` (8 bytes)
      - `numeric(p,s)`: arbitrary precision number, at most `p` total digits and `s`digits in the fractional part
        - `numeric(4,3)` would allow `3.141`
    - Date and time
      - `date`, e.g. `2000-27-01`        
      - `time`, time of the day, e.g. `16:23`
      - `timestamp`
  - Default values
    - Specifies the default value of a column
      - Does not mean that the column is initialised with that default value, it gets initialised with no value
        - When using an `INSERT` statement we can make use of the `DEFAULT` value
    ```sql
    -- Syntax
    CREATE TABLE <table_name> (
        <column 1> <type 1>,
        <column 2> <type 2> DEFAULT <value>,
        ...
        <column N> <type N>
    );

    -- Example
    CREATE TABLE Account (
        accnum  varchar(12),
        branch  varchar(30),
        custid  varchar(10),
        balance numeric(14,2) DEFAULT 0
    );
    ```
  - Populating tables
    - The process of adding data to tables
    ```sql
    -- General syntax
    INSERT INTO <table_name> VALUES (...), ..., (...);
    
    -- Example 1
    INSERT INTO Account VALUES
        ('243576', 'Edinburgh', 'cust1', -120);

    -- Example 2
    INSERT INTO Customer VALUES
        ('cust1','Renton','Edinburgh','2 Wellington Pl'),
        ('cust2','Watson','London','221B Baker St'),
        ('cust3','Holmes','London','221B Baker St');
    ```
  - Populating tables with default values
    - There are two possibilities
    ```sql
    -- 1st possibility: explicitly use default
    INSERT INTO Account VALUES
        ('250018','London','cust',DEFAULT);

    -- 2nd possibility: explicitly list attributes (ommitted ones get the default)
    INSERT INTO Account (accnum,branch,custid) VALUES
        ('250018','London','cust3');
    ```
    - Attributes without specified `DEFAULT` in `CREATE TABLE` have default value `NULL`
    - Possible to reorder attribute tuple
  - Changing the definition of a table
    ```sql
    ALTER TABLE <name>
        RENAME TO <new_name>;
        RENAME <column> TO <new_column>;
        ADD <column> <type>;
        DROP <column>;
        ALTER <column>
            TYPE <type>;
            SET DEFAULT <value>;
            DROP DEFAULT;
    ```
    - Note that you need to use the `ALTER TABLE` statement for each individual statement with a semicolon, you can't execute it as specified above
    - `ALTER TABLE` is part of the *DDL*, operations at the level of the structure of the table, whereas everything we did before was *DML*, on the level of data
  - Destroying tables
    ```sql
    TRUNCATE TABLE <name>;
    DROP TABLE <name>;
    ```
    - `TRUNCATE` removes all the instances (rows) of a table but keeps the schema
    - `DROP` completely removes the table from the database (data + definition)
      - This is only possible if the table has no dependencies in other tables
        - If you use `DROP ... CASCADE`, it also removes all dependent data in other tables
  - Many other changes are possible, this list is non-exhaustive
  - Basic queries in SQL
    ```sql
    -- Basic pattern
    SELECT <list_of_attributes>
    FROM <list_of_tables>
    WHERE <condition>;
    ```
    - Idea:
      1. Loop over all rows of the tables listed in `FROM`
      2. Take those that satisfy the `WHERE` condition
      3. Output the values of the attributes listed in `SELECT`
      
    ![Customer Table](../images/dbs-customer-table.png)

    ```sql
    -- This returns the entire table as we select all (*) attributes from Customer, and we did not specify filtering conditions:
    SELECT *
    FROM Customer ;

    -- This returns the Name and Address column:
    SELECT Name, Address
    FROM Customer ;

    -- This returns the name and address column of every instance that has 'Edinburgh' specified as city
    SELECT Name, Address
    FROM Customer
    WHERE City = 'Edinburgh' ;
    ```
    - Use enclosing single quotes for String values
    - Double quotes are reserved for table and attribute names (in case there are spaces like a table called "Icecream Flavours")
      - That's quite uncommon though, I wouldn't advise to use identifiers with spaces
  - Queries that involve multiple tables in `FROM`
    - When you have two tables in the `FROM` clause, each row of the first table is concatenated with each row of the second table
      - Same process for more than two tables
    - Can do this:
       ```sql
       SELECT B, C
       FROM Table1, Table2 ;
       ```
    - What essentially happens is that we take the Cartesian product $table_1 \times table_2$
      - Each row of the first table gets concatenated with ALL rows of the second table
      - Same principle for Cartesian products involving more factors
    - What if there are attributes named `B` in both tables?
      - That's what we call clashing names
      - As long as you don't need to reference it, it's fine for views / virtual tables
      - Would not be allowed when defining base tables, would throw an error
      - Will talk about how to use fully qualified references and aliases to enable referencing in virtual tables later

  - Joining tables
    - Assume we wanted to join the two tables below
    ![Customer and Account table](../images/dbs-customer-account.png)
    - We use the attributes `ID` and and `CustID` to find the corresponding instances
    ```sql
    SELECT Name, AccNum
    FROM Customer, Account
    WHERE ID = CustID ;
    ```
  - Conditions: the basic `WHERE` clause
    - Our smallest building block is a `term`
    ```sql
    term :=
        | attribute
        | value
    ```
    - We use terms in atomic statements, comparisons
    ```sql
    comparison :=
        | term1 op term2, with op ∈ {=, <>, <, >, <=, >=}
        | term IS NULL
        | term IS NOT NULL
    ```
    - Our final condition clause combines comparisons, or nested conditions
    ```sql
    condition :=
        | comparison
        | condition1 AND condition2
        | condition OR condition2
        | NOT condition
    ```
    - That's not an exclusive OR
  - Deletion
    - Process of deleting instances from a table
    ```sql
    -- Syntax
    DELETE FROM <table>
    WHERE <condition> ;
    ```
    - All rows in `<table>` satisfying `<condition>` are deleted
    ```sql
    -- Remove accounts with zero balance and unknown owner
    DELETE FROM Account
    WHERE Balance = 0 AND CustID IS NULL ;
    ```
  - Replacement
    - Process of replacing values of attributes
    ```sql
    -- Syntax
    UPDATE <table>
    SET    <assignments>
    WHERE  <condition> ;
    ```
    - Replaces the values of attributes specified in `<assignments>` in each row of `<table>` that satisfies `<condition>`
    ```sql
    -- Set a new balance on account 745622
    UPDATE Account
    SET    balance = 1503.82
    WHERE  accnum = '745622' ;

    -- Accounts in London with a positive balance get a 0.2% bonus
    UPDATE Account
    SET    balance = balance + balance * 0.002
    WHERE  branch = 'London' AND balance > 0 ;
    ```
  - `WHERE` conditions in queries
    - We have seen two different uses of `WHERE` clauses so far
    - The effect depends on how many tables are involved in `FROM`:
      - One table: `WHERE` *filters* data
      - Multiple tables: `WHERE` *joins* data from different tables
        - But can still also filter:
        ```sql
        SELECT Name, Address, AccNum
        FROM   Customer, Account
        WHERE  ID = CustID AND City = 'Edinburgh' ;
        ```
        - *This can lead to convoluted `WHERE` statements, hence see the solution in the next section*
  - Explicit `JOIN` syntax
    ```sql
    table1 JOIN table2 ON <condition>
    ...
           JOIN tableN ON <condition>
    ```
    - Allows us to logically separate join conditions from filters
    ```sql
    -- Convoluted WHERE statement
    SELECT Name, Balance
    FROM   Customer, Account
    WHERE  ID = CustID AND Balance < 0 ;

    -- Cleaner
    SELECT Name, Balance
    FROM   Customer JOIN Account ON ID=CustID
    WHERE  Balance < 0 ;
    ```
  - Qualification of attributes
    - This regards the situation when multpile tables share the same attribute labels, like in the example below
    ![Customer and Account table, they share the same label for the CustID attribute](../images/dbs-customer-account-shared-attribute-label.png)
    
    - Assume we want to list the names of customers whose account is overdrawn
      - Need `Name` from `Customer`, but also need to check `Balance` in `Account`
      - So we need to check which rows correlate by using `CustID`
      - But they're labelled the same in both tables, so we can do this:
      ```sql
      SELECT Customer.Name
      FROM   Customer, Account
      WHERE  Account.CustID = Customer.CustID
             AND Account.Balance < 0 ;
      ```
      - Note that this yields the same output as the cleaner `WHERE` statement example above
  - Range variables
    - They're aliases
    - Related to qualified references to attributes
    - Assign new names to tables in `FROM`
    - Used to give attributes new *local* names within a query
      ```sql
      -- Previously
      SELECT Customer.Name, Account.Balance
      FROM   Customer, Account
      WHERE  Account.CustID = Customer.CustID
             AND Account.Balance < 0 ;

      -- Introduce range variables
      -- Customer C has the same effect as Customer AS C
      SELECT C.Name, A.Balance
      FROM   Customer C, Account AS A
      WHERE  A.CustID = C.CustID
             AND A.Balance < 0 ;

      -- Which is the same as
      SELECT C.Name, A.Balance
      FROM   Customer C JOIN Account A ON C.CustID = A.CustID
      WHERE  A.Balance < 0 ;
      ```
  - Renaming attributes
    - Can rename attributes whilst doing a query by using range variables in the `SELECT` statement
      - This does only affect the output, cannot be used within the query to reference those attribute (see example below)
      - Does not actually rename the attribute in the base table
    ```sql
    SELECT C.Name CustName, A.Balance AS AccBal
    FROM   Customer C, Account A
    WHERE  A.CustID = C.CustID
           AND A.Balance < 0 ;
    ```
    - Note that the below query would not work
    ```sql
    -- Throws an error
    SELECT C.Name CustName, A.Balance AS AccBal
    FROM   Customer C, Account A
    WHERE  A.CustID = C.CustID
           AND AccBal < 0 ;
    ```
    - This makes sense if we recall the order in which SQL queries are executed: `FROM -> WHERE -> SELECT`
      - So when we're looking into the `WHERE` clause, the alises from `SELECT` are not in the namespace yet, hence we'd get an error
  - Using SQL files
    - You can store schema definitions and the relation creation procedure in `.sql` files, like
      ```sql
      --------------------
      -- SCHEMA ----------
      --------------------
      CREATE TABLE FavouriteIceCream (
        flavour varchar(20),
        rating  int
      );

      --------------------
      -- DATA INSERTION --
      --------------------

      INSERT INTO FavouriteIceCream VALUES 
        ('Mango', 10),
        ('Vanilla', 7),
        ('Hazelnut', 9);
      ```
      - Can save this in `icecream.sql`
      - Execute the file using `psql -h pgteach -d idbcourse -f icecream.sql`
  - Concluding remarks
    - SQL is case-insensitive for keywords and table / column names
    - SQL queries are read-only
      - The never modify the schema nor the instance of the database
    - Always use range variables and fully qualify references to attributes
      - Improves readability of queries (range variables + qualified references)
      - More robust against schema changes (qualified references)

## Week 2: Relational Algebra