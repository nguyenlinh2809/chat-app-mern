import jsonwebtoken from 'jsonwebtoken';

const generateTokenAndSetCookie = (userId, res) => {
  const jwt = jsonwebtoken.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '15d',
  });

  res.cookie('jwt', jwt, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true, //XSS attack
    sameSite: 'strict', //CSRF attack
    secure: process.env.NODE_ENV !== 'development',
  });
};

export default generateTokenAndSetCookie;
