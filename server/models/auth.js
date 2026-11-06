const mongoose = require("mongoose")

const { Schema } = mongoose

const schema = new Schema({
    uid: { type: String, required: true, unique: true, trim: true },
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, trim: true },
    avatar: { type: String, default: '' },      // base64 profile picture
    bio: { type: String, default: '', trim: true }  // short bio / about
}, { timestamps: true })

const Users = mongoose.model("users", schema)

module.exports = Users

// password
// bne30acTl5nNErFl
// name
// awaisdeveloper22_db_user