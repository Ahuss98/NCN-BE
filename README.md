# **Northcoders News API** 📰

[![Node.js](https://img.shields.io/badge/Node.js-20.10.0-green.svg)](https://nodejs.org/)  
**Live Hosted Version:** 🌍  
🔗 **[ncn-network.onrender.com](https://ncn-network.onrender.com)**  

---

## **📌 About the Project**
This is a **fully functional RESTful API** built using **Node.js** and **PostgreSQL**, designed to manage a live database of:
- 📰 **Articles**  
- 🎭 **Topics**  
- 💬 **Comments**  
- 👤 **Users**  

All database operations—**GET, POST, PATCH, DELETE**—are supported for efficient data management.

---

## **🛠 Setup Instructions**
### **📌 1. Clone the Repository**
1. Fork this repository.
2. Copy the **forked repo** link.
3. In your terminal, run:
   ```bash
   git clone <your-forked-repo-link>

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

## 🌍 Environment Variables

To set up environment variables for **local database connection**, follow these steps:

### **1️⃣ Create `.env.developer`**
In the **root directory**, create a file named **`.env.developer`**, then add the following line:

### **2️⃣ Set the following environment variable in .env.developer**
    - PGDATABASE=(your-database-name-here)
    - You can find the database name in setup.sql.
    - Use the non-test database for the developer environment variable.
### **3️⃣ Create another file in the root directory called .env.test**
### **4️⃣ Set the following environment variable in .env.test**
    - PGDATABASE=(your-test-database-name-here)
    - You can find the test database name in setup.sql.
    - Use the test database for the test environment variable.
### Minimum Versions of node
    Node.js Version: 20.10.0 (default)
