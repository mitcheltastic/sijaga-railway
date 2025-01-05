const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { getIO } = require("../socket"); // Import the Socket.IO instance getter

// Get all users
const getAllUsers = async () => {
  return await prisma.user.findMany();
};

// Add a new usage history entry
const addUsageHistory = async (card_id, status, availStatus) => {
  const user = await prisma.user.findUnique({ where: { card_id } });
  if (!user) {
    throw new Error("User with this card_id does not exist.");
  }

  const usageHistory = await prisma.usageHistory.create({
    data: {
      Timestamp: new Date(),
      name: user.name,
      status: status,
      card_id: card_id,
      availtatus: availStatus,
    },
  });

  // Emit real-time event for usage history
  const io = getIO();
  io.emit("usageHistory_update", usageHistory);

  return usageHistory;
};

// Get all usage history
const getAllUsageHistory = async () => {
  return await prisma.usageHistory.findMany({ orderBy: { Timestamp: "desc" } });
};

// Get the latest usage history entry
const getLatestUsageHistory = async () => {
  return await prisma.usageHistory.findFirst({ orderBy: { Timestamp: "desc" } });
};

// Get top 3 names from usage history
const getTop3NamesFromUsageHistory = async () => {
  return await prisma.usageHistory.findMany({
    select: { name: true },
    distinct: ["name"],
    take: 3,
    orderBy: { Timestamp: "desc" },
  });
};

// Get top 3 timestamps from usage history
const getTop3TimestampsFromUsageHistory = async () => {
  return await prisma.usageHistory.findMany({
    select: { Timestamp: true },
    take: 3,
    orderBy: { Timestamp: "desc" },
  });
};

// Post status to locked_status table
const createLockedStatus = async (status) => {
  const newStatus = await prisma.lockedStatus.create({
    data: {
      status,
    },
  });

  // Emit real-time event for locked status
  const io = getIO();
  io.emit("lockedStatus_update", newStatus);

  return newStatus;
};

// Get the latest status from locked_status table
const getLatestLockedStatus = async () => {
  return await prisma.lockedStatus.findFirst({
    orderBy: {
      Timestamp: "desc",
    },
  });
};

module.exports = {
  getAllUsers,
  addUsageHistory,
  getAllUsageHistory,
  getLatestUsageHistory,
  getTop3NamesFromUsageHistory,
  getTop3TimestampsFromUsageHistory,
  createLockedStatus,
  getLatestLockedStatus,
};
