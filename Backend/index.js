const express = require('express');
const connectToMongo = require('./db');
const authRoutes = require('./routes/auth');

const app = express();
const port = 5000;

// ✅ Connect to MongoDB
connectToMongo();

//When a client sends this JSON body:
//The middleware express.json() parses it and makes it accessible like:
//req.body.name
app.use(express.json());

// ✅ Mount routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/notes', require('./routes/notes'))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
