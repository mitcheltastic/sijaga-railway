const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { getIO } = require("../socket");

const createAvailability = async (status) => {
  return await prisma.availability.create({
    data: {
      status,
    },
  });
};

const getLatestAvailability = async () => {
  return await prisma.availability.findFirst({
    orderBy: {
      Timestamp: "desc",
    },
  });
};

const emitAvailabilityUpdate = (availability) => {
  const io = getIO();
  io.emit("availability_update", availability); // Broadcast the updated availability status
};

module.exports = {
  createAvailability,
  getLatestAvailability,
  emitAvailabilityUpdate
};
