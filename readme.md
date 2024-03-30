# In this project we're creating API

So basically we've store the data in the backend
Step 1: Initialize the "npm"
            "npm init" or "npm init -y"
(This will create a package.json and then open it using any text editor to see all details)
[ if ask for "package name:" then we've to give the related directory name to our project]

Step 2: Install the dependencies and required other modules
            "npm install express mongoose"

Step 3: After that we've created "src" directory within that 
           - we've created "db" directory, "models" directory and "index.js" or "app.js" file. 
                    - Inside "db" directory we've created "conn.js" file for connecting to the mongodb server 
                    - Inside "models" directory we've created "cricketinfo.js" file where the schema or structure of our json data is stored.

**What is model**
- A model is a high-level representation of the structure of a database, while a schema is a low-level representation of the same structure. Data modeling is the process of designing and creating the structure of documents and collections that will be stored in the database.

Step 4: Install the "cors" module to enable the cors policy
           "npm install cors"

Step 5: Install the "nodemon" module globally if not installed already and then run "index.js" file
          "nodemon index"