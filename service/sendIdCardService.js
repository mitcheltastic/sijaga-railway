const { createCardIdDump, getLatestCardIdDump } = require("../repository/sendCardIdRepository");
const { getIO } = require("../socket");

// Service to create a CardIdDump
const createCardIdDumpService = async (cardId) => {
  if (!cardId) {
    throw new Error("Card ID is required.");
  }

  const createdCardIdDump = await createCardIdDump(cardId);

  // Emit the `cardIdDump_created` event via Socket.IO
  const io = getIO();
  io.emit("cardIdDump_created", createdCardIdDump);

  return createdCardIdDump;
};

// Service to fetch the latest CardIdDump
const getLatestCardIdDumpService = async () => {
  const latest = await getLatestCardIdDump();

  if (!latest) {
    throw new Error("No CardIdDumps found.");
  }

  // Emit the `cardIdDump_latest` event via Socket.IO
  const io = getIO();
  io.emit("cardIdDump_latest", latest);

  return latest;
};

module.exports = { createCardIdDumpService, getLatestCardIdDumpService };
