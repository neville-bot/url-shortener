# url-shortener
URL-sortener is a server based application with simple features, including reducing a full length URL to an encoded 7 letter shortened URL, and sending back that 7 letter query to get the full-length URL. The application is accessible through two endpoints. A GET /long/ endpoint where you can send your shortened URL. And a POST /short/ endpoint to send your full-length URL.


## Technologies Used

* Backend
  * Express
  * Node.js
  * Mongo.db
  * Mongoose

* Libraries/API
  * Node-forge
  * Validator

## Features and MVP's

### Input Validation

Input validation is very important, as functionality is key to receiving correctly formatted input. I opted to use a library - validator - to take in every input from the user. 
This library has an extensive isURL() method where I customized the constraints to allowing only for specifically formatted URLs (no protocols only TLD-domain-subdomain)

### Storage

To create unique IDs, I used node-forge's MD5 algortihm, then used base64 encoding and took the first 7 letters from the string. A 7 letters long key would result in 64^7 = ~4.3 trillion possible strings.
Given the possible massive storage and lack of relationship between tables, I opted to use the noSQL database mongoDB, in conjunction with mongoose. MongoDB makes it easy
to scale, and eventually a load balancer could be put between the server and databases and route the heavy read requests.


 
