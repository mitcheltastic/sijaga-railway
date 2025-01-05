const { Server } = require("socket.io");

let io; // Variable to hold the Socket.IO instance

/**
 * Initialize the Socket.IO instance
 * @param {http.Server} server - The HTTP server
 */
const initSocket = (server) => {
  // Initialize Socket.IO with the provided server
  io = new Server(server, {
    cors: {
      origin: [
        "http://localhost:3000",  // Frontend origin
        "http://127.0.0.1:3000",  // Alternative local frontend origin
      ],
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"], // Allow specific HTTP methods
      credentials: true, // Allow credentials (cookies, headers)
    },
    transports: ["polling", "websocket"], // Allow both polling and WebSocket
  });

  console.log("Socket.IO initialized");

  // Handle client connections
  io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);

    // Send a welcome message to the connected client
    socket.emit("message", "Welcome to the real-time server!");

    // Handle custom events from the client
    socket.on("custom_event", (data) => {
      console.log(`Received custom_event from ${socket.id}:`, data);
      // Broadcast the custom event response to all connected clients except the sender
      socket.broadcast.emit("custom_event_response", {
        message: "This is a response from the server.",
        data,
      });
    });

    // Handle client disconnection
    socket.on("disconnect", (reason) => {
      console.log(`Client disconnected: ${socket.id}, reason: ${reason}`);
    });

    // Log errors for debugging
    socket.on("error", (err) => {
      console.error(`Socket error from ${socket.id}:`, err);
    });
  });

  return io;
};

/**
 * Get the Socket.IO instance
 * @returns {Server} - The Socket.IO instance
 */
const getIO = () => {
  if (!io) {
    throw new Error("Socket.IO not initialized!");
  }
  return io;
};

module.exports = { initSocket, getIO };
