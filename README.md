# Northcoders News API

if you would like access to the necessory envirmonet vaariable to connect to the databses locally (for developing purposes) you must follow the instruction listed below .
you can do this by:
1.create a file in the root directory called .env.developer
2.set the PGDATABASE=(your-data-base-name-here)
    - you can find the database name in the setup.sql
    - use the non-test databse for the developer enviroment vriable
3.creat another file in the root directory called .env.test
4.set the PGDATABASE=(your-data-base-test-name-here)
    - you can find the database name in the setup.sql
    - use the test databse for the developer enviroment vriable


