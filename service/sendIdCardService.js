const { createCardIdDump, getLatestCardIdDump } = require("../repository/sendCardIdRepository");
const { getIO } = require("../socket");

// Service to create a CardIdDump
const createCardIdDumpService = async (card_id) => {
  if (!card_id) {
    throw new Error("Card ID is required.");
  }

  const createdCardIdDump = await createCardIdDump(card_id);

  // Emit real-time event for CardIdDump creation
  const io = getIO();
  console.log("Emitting cardIdDump_created event:", createdCardIdDump); // Log the emitted response
  io.emit("cardIdDump_created", createdCardIdDump);

  return createdCardIdDump;
};

// Service to fetch the latest CardIdDump
const getLatestCardIdDumpService = async () => {
  const latestCardIdDump = await getLatestCardIdDump();

  if (!latestCardIdDump) {
    throw new Error("No CardIdDumps found.");
  }

  // Emit real-time event for fetching the latest CardIdDump
  const io = getIO();
  console.log("Emitting cardIdDump_latest event:", latestCardIdDump); // Log the emitted response
  io.emit("cardIdDump_latest", latestCardIdDump);

  return latestCardIdDump;
};

module.exports = {
  createCardIdDumpService,
  getLatestCardIdDumpService,
};
