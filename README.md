## SB Online Test 2021
Andre Setiawan

**Number 1**: SQL Query. Answer in file 1.sql

**Number 2**: Create a service to crawl omdbapi.com
The project is inside '2' folder. Tools that I used
| Plugin | Purpose | URL |
| ------ | ------ | ----- |
| Axios | Request to URL |[https://github.com/axios/axios] |
| Express | Build the API |[https://expressjs.com/] |
| MySQL | Access MySQL database |[https://github.com/mysqljs/mysql#readme] |
| dotenv | Set environtment for the project |[github.com/motdotla/dotenv#readme] |
| Mocha | Unit testing |[github.com/mochajs/mocha] |
| Chai | Unit testing |[github.com/chaijs/chai] |

_**Public Accessible URL to check the result**_

Here's the URL

Search : https://apis.andresetiawan.com/stockbit/apis/search?keyword=Spider-Man&page=1
| Query String | Definition | Example |
| --------- | ---------- | -------- |
| keyword | Keyword of movie title | Spider-Man |
| page | Pagination | 1 |

Detail : https://apis.andresetiawan.com/stockbit/apis/detail?id=tt0371746

| Query String | Definition | Example |
| --------- | ---------- | -------- |
| id | IMDB ID | tt0371746 |
| title | Movie Title | Iron Man |

(choose one between id or title)

View access log : https://apis.andresetiawan.com/stockbit/apis/view_access_log


_**How to run locally on your computer**_

In case you want to run it locally on your computer: (if there's an error or something, please let me know by approach me via email)
1. npm install, to install all the package into node_modules
2. deploy the MySQL database, first you can create a database in your MySQL, then run the 'CREATE TABLE' SQL command in file sql/ACCESS_LOG.sql
3. setup .env file in project root folder, containing this variables:
  - DB_HOST=your mysql host
  - DB_PORT=your mysql port
  - DB_NAME=your database name
  - DB_USER=your username
  - DB_PASSWORD=your password
  - OMDB_KEY=faf7e5bb&s
  - SERVER=production
3. npm start


_**Do the Unit Test**_

I've made some unit tests in file 2/test/crawl.test.js. Please run it with command : **npm test**


**Number 3**: Refactoring the code. 
Command to run the solution: node 3.js

**Number 4**: Anagram problem.
Command to run the solution: node 4.js


Thank you!