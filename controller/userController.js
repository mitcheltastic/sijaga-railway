const { getUserDetailsService, updateUserProfileService, changePasswordService, deleteUserService } = require("../service/userService");

// Get user details (Who am I API)
const whoamiController = async (req, res) => {
  try {
    // The user ID is already decoded in the request via the authentication middleware
    const userId = req.user.id;
    const user = await getUserDetailsService(userId);
    
    return res.json({
      success: true,
      message: "User details retrieved successfully.",
      user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get user details by ID (for admin or profile-related updates)
const getUserDetailsController = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await getUserDetailsService(userId);
    return res.json({
      success: true,
      message: "User details retrieved successfully.",
      user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Update user profile
const updateUserProfileController = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming userId comes from the authenticated user
    const { name, email, cardId } = req.body; // Destructuring from the request body
    
    // Pass individual parameters to the service function
    const updatedUser = await updateUserProfileService(userId, name, email, cardId);
    
    return res.json({
      success: true,
      message: "Profile updated successfully.",
      user: updatedUser,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Change password
const changePasswordController = async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;
    const updatedUser = await changePasswordService(userId, currentPassword, newPassword);

    return res.json({
      success: true,
      message: "Password updated successfully.",
      user: updatedUser,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteUserController = async (req, res) => {
  try {
    const userId = req.user.id;  // Assuming userId comes from the authenticated user
    const result = await deleteUserService(userId);

    return res.json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports = {
  whoamiController,
  getUserDetailsController,
  updateUserProfileController,
  changePasswordController,
  deleteUserController
};
