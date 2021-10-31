---
title: DBS Exercises
slug: dbs-exercises
template: post
noteType:
    - Revision
---

*Keep this without metadata until you can filter out confidential notes*

Below are only solutions for tutorial sheets, as of yet.

## Week 1: SQL Exercises

### Problem 1

```sql
-- Problem 1
-- (1)
SELECT A.number
FROM Account A JOIN Customer C ON A.custid = C.id
WHERE C.name = 'John Doe'

-- (2)
SELECT A.number, C.branch
FROM Account A JOIN Customer C ON A.custid = C.id
WHERE A.custid = 'xyx123'

-- (3)
SELECT A.number, A.balance
FROM Account A
WHERE A.branch = 'London' AND balance < 0

-- (4)
SELECT C.name, A.number
FROM Account A JOIN Customer C ON A.custid = C.id
WHERE A.branch <> C.city
```

### Problem 2

The query returns all instances in `Customer` that have the same `id` but do not have the same `name` or the same `city`. Given the constraints on `Customer` in the exercise sheet, this query will return an empty schema.

## Week 2: Relational Algebra

### Problem 1

- $\pi_{Branch,CustID}(ACCOUNT)$ yields:

  | Branch    | CustID |
  | --------- | ------ |
  | London    | 1      |
  | Edinburgh | 1      |
  | London    | 3      |
  | London    | 2      |

- Renaming:

  | City      | ID  |
  | --------- | --- |
  | London    | 1   |
  | Edinburgh | 1   |
  | London    | 3   |
  | London    | 2   |

- $\pi_{ID,City}$

  | ID  | City      |
  | --- | --------- |
  | 1   | London    |
  | 2   | Edinburgh |
  | 3   | London    |
  | 4   | Cardiff   |

- Intersection:

  | ID  | City   |
  | --- | ------ |
  | 1   | London |
  | 3   | London |

- Natural join:

  | ID  | Name | City   |
  | --- | ---- | ------ |
  | 1   | John | London |
  | 3   | Jeff | London |
  

### Problem 2

1. $\pi_{ID, Name}(CUSTOMER\bowtie_{ID=CustID, City=Branch} ACCOUNT)$
2. $Customer - Customer (semijoin)_{ID=CustID} Account$ 
3. $\pi_{ID, Name}(idk. i really don't know)$


## Week 3: Advanced SQL

```sql
-- 1
SELECT C.ID, C.name
FROM   Customer C
WHERE  C.city = 'London'
AND NOT EXISTS ( SELECT 1
                 FROM   Account A
                 WHERE  C.ID = A.CustID
                 AND    A.Branch = 'Edinburgh' );

-- 2

SELECT C.ID, C.name
FROM   Customer C
WHERE  (SELECT COUNT(DISTINCT A.branch)
        FROM   Account A1)
    =
      (SELECT COUNT(DISTINCT A.branch)
       FROM   Account A2, Customer C
       WHERE  A.custID = C.ID);

-- 3
-- ID and name of customers who own an account with a balance which is no less than the balance of
-- any other account.

-- 1. Get balance of other accounts

SELECT A.balance
FROM   Account A, Customer C
WHERE  C.ID <> A.custID

SELECT C.ID, C.name
FROM   Customer C, Account A
WHERE  C.ID = A.custID
AND    A.balance >= ALL (SELECT A.balance
                         FROM   Account A2
                         WHERE  C.ID <> A2.custID)

-- 4
-- Customers who own an account with a balance that is at least 500 pounds higher than the average
-- balance of all accounts in the same branch (of the account in question). Return the customer’s ID,
-- their name, and the corresponding account number.

-- 1. Get average balance of all accounts in the same branch

SELECT C.ID, C.name, A.number
FROM   JOIN Customer C, Account A ON C.id = A.custID
WHERE  A.balance >= ( SELECT AVG(A2.balance) + 500
                      FROM   Account A2
                      WHERE  A.branch = A2.branch );
```