*Keep this without metadata until you can filter out confidential notes*

## Week 1: Basic SQL

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