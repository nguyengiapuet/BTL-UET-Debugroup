require("dotenv").config();

const express = require("express");
const cors = require("cors");
const router = require("./routes");
const { Server } = require("socket.io");
const { createServer } = require("node:http");
const app = express();
const server = createServer(app);
const io = new Server(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"],
	},
});

app.use(express.json());
app.use(cors());

app.use("/api", router);

let activeUsers = [];
io.on("connection", (socket) => {
	socket.on("register", (userId) => {
		if (!activeUsers.some((user) => user.userId === userId)) {
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

const PORT = 8080;

server.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
