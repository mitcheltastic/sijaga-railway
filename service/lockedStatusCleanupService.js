const { getIO } = require("../socket"); // Import the Socket.IO instance getter
const { deleteLockedStatusesOlderThanOneDay } = require("../repository/lockedStatusRepository");

// Function to clean up old locked statuses and emit an event to notify clients
const cleanUpOldLockedStatuses = async () => {
  try {
    // Clean up the old statuses
    await deleteLockedStatusesOlderThanOneDay();

    // Get the Socket.IO instance
    const io = getIO();

    // Emit an event to notify all clients that the cleanup is done
    io.emit("status_cleanup", "Old locked statuses have been deleted");

    console.log("Old locked statuses deleted successfully");
  } catch (error) {
    console.error("Error in cleanup service:", error);
  }
};

module.exports = {
  cleanUpOldLockedStatuses,
};
