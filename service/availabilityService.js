const { createAvailability, getLatestAvailability, emitAvailabilityUpdate } = require("../repository/availabilityRepository");

const addAvailability = async (status) => {
  if (!status) {
    throw new Error("Status is required");
  }

  // Create the new availability
  const newAvailability = await createAvailability(status);

  // Emit the real-time update via Socket.IO directly from the repository
  emitAvailabilityUpdate(newAvailability);

  return newAvailability;
};

const fetchLatestAvailability = async () => {
  const latestAvailability = await getLatestAvailability();
  if (!latestAvailability) {
    throw new Error("No availability records found");
  }
  return latestAvailability;
};

module.exports = {
  addAvailability,
  fetchLatestAvailability,
};
