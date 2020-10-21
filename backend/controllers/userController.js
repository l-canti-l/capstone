import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

//authorize user and get token, POST to api/users/login
const authorizeUser = asyncHandler(async (request, response) => {
   const { email, password } = request.body
    //find user by email
   const user = await User.findOne({ email: email })
   //check if user exists
   if(user && (await user.validatePassword(password))) {
        response.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: null
        })
   } else {
       response.status(401)
       throw new Error('Invalid email address or password')
   }
})

export { authorizeUser }