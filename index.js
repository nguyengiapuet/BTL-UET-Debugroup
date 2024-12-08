require("dotenv").config();

const express = require("express");
const cors = require("cors");
const router = require("./routes");
const path = require('path');

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", router);

// Serve static files from the React app's build folder
app.use(express.static(path.join(__dirname, 'build')));

// Catch-all handler to serve React's index.html for any unknown route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


const PORT = 3000;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
