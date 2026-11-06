
const mongoose = require("mongoose")
const connectDB = () => {
    mongoose.connect("mongodb+srv://awaisdeveloper22_db_user:bne30acTl5nNErFl@cluster0.k4f4wml.mongodb.net/?appName=Cluster0")
        .then(() => {
            console.log("MongoDB is connected")
        })
        .catch((error) => {
            console.error(error);
            console.log("MongoDB is not connected")
        })
}
module.exports = { connectDB }
