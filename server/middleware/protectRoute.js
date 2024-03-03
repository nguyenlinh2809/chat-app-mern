import UserModel from '../models/user.model.js';
import jsonwebtoken from 'jsonwebtoken';

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    console.log(token);
    if (!token) {
      return res.status(401).json({ error: 'Unauthorize! No Token provided!' });
    }
    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ error: 'Unauthorize! Token is invalid!' });
    }

    const user = await UserModel.findById(decoded.userId).select('-password');
    if (!user) {
      return res.status(401).json({ error: 'User not found!' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ error: 'Internal server error!' });
  }
};

export default protectRoute;
