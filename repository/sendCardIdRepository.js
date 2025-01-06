const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Function to create a new CardIdDump
const createCardIdDump = async (card_id) => {
  return await prisma.cardIdDumps.create({
    data: { card_id },
  });
};

// Function to fetch the latest CardIdDump
const getLatestCardIdDump = async () => {
  return await prisma.cardIdDumps.findFirst({
    orderBy: { id: "desc" },
  });
};

module.exports = {
  createCardIdDump,
  getLatestCardIdDump,
};
