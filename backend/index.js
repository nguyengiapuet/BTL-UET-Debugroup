require('dotenv').config();

const express = require('express');
const cors = require('cors');
const router = require('./routes');

const app = express();

app.use(express.json());
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
    }),
);
app.get('/', function (req, res) {
    res.send('Hello World');
});

app.use('/api', router);

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
