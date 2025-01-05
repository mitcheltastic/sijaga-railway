const { createAvailability, getLatestAvailability, emitAvailabilityUpdate } = require("../repository/availabilityRepository");

const postAvailability = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        status: false,
        message: "Status is required",
      });
    }

    // Create new availability using the repository function
    const newAvailability = await createAvailability(status);

    // Emit the real-time update via Socket.IO
    emitAvailabilityUpdate(newAvailability);

    res.status(201).json({
      status: true,
      message: "Availability status created successfully",
      data: newAvailability,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

const getAvailLatest = async (req, res) => {
  try {
    const latestAvailability = await getLatestAvailability(); // This is directly from the repository
    return res.status(200).json({
      status: true,
      message: "Latest availability fetched successfully",
      data: latestAvailability,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = {
  postAvailability,
  getAvailLatest, // No duplicates, directly using the imported function
};
