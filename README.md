## Notes for nodejs

> Add _controllers, db, middleware, models, routes_ folders in the root

1. Require dotenv and express in app.js

```javascript
// app.js
require('dotenv').config();
const express = require('express');

const app = express();
```

2. Setup the server

3. Setup error-handler and not-found middlewares

4. Setup routes

```javascript
// app.js

require('dotenv').config();

const express = require('express');
const app = express();

const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');

// middleware
app.use(express.json());

// routes
app.get('/', (req, res) => {
  res.send('<h1>Store API</h1> <a href="/api/v1/products">products route</a>');
});

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    // connectDB
    app.listen(port, () => {
      console.log('Running on port: ', port);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
```

5. Connect app to mongoDB

6. Copypaste the connection string to MONGO*URI variable in .env
   *-Make sure to add project name before '?' and replace the password\_

7. In the db folder, create connect.js to connect app to db using mongoose

```javascript
// connect.js
const mongoose = require('mongoose');

const connectDB = (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
};

module.exports = connectDB;
```
