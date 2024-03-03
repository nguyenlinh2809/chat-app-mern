import UserModel from '../models/user.model.js';

export const getAllUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const users = await UserModel.find({ _id: { $ne: userId } }).select(
      '-password'
    );
    if (!users) {
      return res.status(404).json({ message: 'User not found!' });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error!' });
  }
};
