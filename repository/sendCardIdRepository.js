const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { getIO } = require("../socket"); // Import the Socket.IO instance getter

// Create a new CardIdDump
const createCardIdDump = async (cardId) => {
  const cardIdDump = await prisma.cardIdDumps.create({
    data: { card_id: cardId },
  });

  // Emit real-time event for CardIdDump creation
  const io = getIO();
  io.emit("cardIdDump_created", cardIdDump);
  console.log("Real-time event emitted: cardIdDump_created", cardIdDump);

  return cardIdDump;
};

// Fetch the latest CardIdDump
const getLatestCardIdDump = async () => {
  const latest = await prisma.cardIdDumps.findFirst({
    orderBy: { id: "desc" },
  });

  // Emit real-time event for fetching the latest CardIdDump
  const io = getIO();
  io.emit("cardIdDump_latest", latest);
  console.log("Real-time event emitted: cardIdDump_latest", latest);

  return latest;
};

module.exports = { createCardIdDump, getLatestCardIdDump };
