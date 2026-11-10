require("dotenv").config();

const express = require('express');
const connectDatabase = require('./config/db');
const app = express();
const port = process.env.PORT

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', require('./routes/KomikRoutes'));

async function startServer() {
    await connectDatabase();
    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    });
}

startServer();
