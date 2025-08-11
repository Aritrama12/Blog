import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
//token creation
const createTokenAndSaveCookies = async (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRATE_KEY, {
    expiresIn: "30d",
  });
  res.cookie("jwt", token, {
    httpOnly: false, // Temporarily set to false for testing
    secure: true,
    sameSite: "none",
     // Ensure the cookie is available throughout the site
  });

  await User.findByIdAndUpdate(userId, { token });
  return token;
};

export default createTokenAndSaveCookies;
