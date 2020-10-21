import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import AsyncHandler from 'express-async-handler';

const protection = AsyncHandler(async (request, response, next) => {
  let token;
    //check for token and that starts with bearer
  if (
    request.headers.authorization &&
    request.headers.authorization.startsWith("Bearer")
  ) {
      try {
          //get token and remove bearer
          token = request.headers.authorization.split(' ')[1]
          //verify token
          const decoded = jwt.verify(token, process.env.JWT_SECRET)
          //fetch user
          request.user = await User.findById(decoded.id).select('-password')

          next()
      } catch (error) {
          console.error(error)
          response.status(401)
          throw new Error('Not authorized, token rejected')
      }
  }

  if (!token) {
    response.status(401)
    throw new Error('not authorized no token provided')
  }
})

export { protection };
