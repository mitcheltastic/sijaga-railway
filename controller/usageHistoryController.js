const {
  getAllUsersService,
  addUsageHistoryService,
  getAllUsageHistoryService,
  getLatestUsageHistoryService,
  getTop3NamesService,
  getTop3TimestampsService,
  createLockedStatusService,
  getLatestLockedStatusService,
} = require("../service/usageHistoryService");

// Import the Socket.IO instance
const { getIO } = require("../socket");

// Controller to get all users
const getAllUsersController = async (req, res) => {
  try {
    const users = await getAllUsersService();
    res.json({ success: true, users });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Controller to add usage history (Real-Time)
// Controller to add usage history (Real-Time)
const addUsageHistoryController = async (req, res) => {
  try {
    const { card_id, status, availStatus } = req.body;

    if (!card_id || !status || !availStatus) {
      return res.status(400).json({
        success: false,
        message: "card_id, status, and availStatus are required.",
      });
    }

    const usageHistory = await addUsageHistoryService(card_id, status, availStatus);

    // Emit real-time event
    const io = getIO();
    io.emit("usageHistory_update", usageHistory);

    res.json({ success: true, usageHistory });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};


// Controller to get all usage history
const getAllUsageHistoryController = async (req, res) => {
  try {
    const usageHistory = await getAllUsageHistoryService();
    res.json({ success: true, usageHistory });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Controller to get the latest usage history entry
const getLatestUsageHistoryController = async (req, res) => {
  try {
    const latestUsageHistory = await getLatestUsageHistoryService();
    res.json({ success: true, latestUsageHistory });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Controller to get the top 3 names from usage history
const getTop3NamesController = async (req, res) => {
  try {
    const top3Names = await getTop3NamesService();
    res.json({ success: true, top3Names });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Controller to get the top 3 timestamps from usage history
const getTop3TimestampsController = async (req, res) => {
  try {
    const top3Timestamps = await getTop3TimestampsService();
    res.json({ success: true, top3Timestamps });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Controller to post a new locked status (Real-Time)
const createLockedStatusController = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required.",
      });
    }

    const newStatus = await createLockedStatusService(status);

    // Emit real-time event
    const io = getIO();
    io.emit("lockedStatus_update", newStatus);

    res.json({
      success: true,
      message: "Status added successfully.",
      status: newStatus,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Controller to get the latest locked status
const getLatestLockedStatusController = async (req, res) => {
  try {
    const latestStatus = await getLatestLockedStatusService();

    if (!latestStatus) {
      return res.status(404).json({
        success: false,
        message: "No status found.",
      });
    }

    res.json({
      success: true,
      message: "Latest status retrieved successfully.",
      status: latestStatus,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllUsersController,
  addUsageHistoryController,
  getAllUsageHistoryController,
  getLatestUsageHistoryController,
  getTop3NamesController,
  getTop3TimestampsController,
  createLockedStatusController,
  getLatestLockedStatusController,
};
