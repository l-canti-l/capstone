import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    timestamps: true
})

userSchema.methods.authenticatePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}
//encrypt password when submitted
userSchema.pre('save', async function (next) {
    //only if passsword field is sent or modified
    if(!this.isModified('password')) {
        next()
    }
    //if modified
    const salt = await bcrypt.genSalt(10);
    //reset password to be hashed
    this.password = await bcrypt.hash(this.password, salt);

})

const User = mongoose.model('User', userSchema)

export default User;