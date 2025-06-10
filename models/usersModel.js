// import { required } from "joi";
import mongoose, { models } from "mongoose";
// import { unique } from "next/dist/build/utils";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required:true,
        unique: true
    },
    name: {
        type: String,
        required:true,
        trim: true
    },
    image: {
        type: String,
        required:true,
    },
    role: {
        type: String,
        required:true,
        default: "user",
        enum: {
            values: ["user", "admin", "superAdmin"],
            message: '(value) is not supported'
        }

    }
}, {
    timestamps:true
})

const User = models.User || mongoose.model('User', userSchema)

export default User