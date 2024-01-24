import mongoose from "mongoose";
import { use } from "react";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"]
    },
    email: {
        type: String,
        required: [true,"Please enter a email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please provide a password"]
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date
})

const User = mongoose.models.users || mongoose.model("users",userSchema)
/*Lo que hace es que si por 1ra vez se registra un usuario
entonces la función "mongoose.model ("users",userSchema)" se ejecutará para crear
el SCHEMA
pero si ya se ingresan usuarios por 2da vez, entonces se ejecutará la función
"mongoose.models.users", PORQUE YA HAY UN SCHEMA CREADO.
*/

export default User;