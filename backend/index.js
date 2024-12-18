require("dotenv").config();

const express = require("express");
const cors = require("cors");
const router = require("./routes");
const { Server } = require("socket.io");
const { createServer } = require("node:http");
const app = express();
const path = require('path');

const server = createServer(app);
const io = new Server(server, {
	cors: {
		origin: "http://fall2024c8g3.int3306.freeddns.org",
		methods: ["GET", "POST"],
	},
});

app.use(express.json());
app.use(cors());

app.use("/api", router);

app.use("/api", router);

// Serve static files from the React app's build folder
app.use(express.static(path.join(__dirname, 'build')));

// Catch-all handler to serve React's index.html for any unknown route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

let activeUsers = [];

io.on("connection", (socket) => {
	socket.on("register", (userId) => {
		if (
			!activeUsers.some((user) => user.userId === userId) &&
			userId !== null
		) {
			activeUsers.push({ userId: userId, socketId: socket.id });
		}
	});
	socket.on("notification", (data) => {
		if (data.recipientId !== data.issuerId) {
			const user = activeUsers.find(
				(user) => user.userId === data.recipientId
			);
			if (user) {
				io.to(user.socketId).emit("notification", data);
			}
		}
	});
	socket.on("disconnect", () => {
		activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
	});
});

const PORT = 3000;

server.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
