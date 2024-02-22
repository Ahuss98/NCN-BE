# Northcoders News API

**Link to Hosted Version:**  
[https://ncn-network.onrender.com](https://ncn-network.onrender.com)

**Summary:**  
This project is a live database created from scratch using Node.js and PostgreSQL. It houses articles, topics, comments, and users, all within this codebase that can be queried, posted to, patched, or deleted as needed.

## Instructions

### Clone Repository
1. Fork this repository.
2. Copy the link of your forked repo.
3. In your terminal, run:
```bash
git clone <the link of the forked repo>
```

### Install Dependencies
```bash
npm install
```

### Seed Local Database
To set up the databases, run:
```bash
npm run setup-dbs
```

#### Then, seed the databases:
```bash
npm run seed
```

### Run Tests
Install required testing libraries:
```bash
npm install jest jest-extended jest-sorted supertest --save-dev
```
Run tests:
```bash
npm t NCN.test.js
```
## Environment Variables
If you need access to the necessary environment variables to connect to the databases locally for development purposes, follow these steps:

1. Create a file in the root directory called .env.developer.
2. Set the following environment variable in .env.developer:
    - PGDATABASE=(your-database-name-here)
    - You can find the database name in setup.sql.
    - Use the non-test database for the developer environment variable.
3. Create another file in the root directory called .env.test.
4. Set the following environment variable in .env.test:
    - PGDATABASE=(your-test-database-name-here)
    - You can find the test database name in setup.sql.
    - Use the test database for the test environment variable.
### Minimum Versions of node
    Node.js Version: 20.10.0 (default)