import mongoose from "mongoose";

async function databaseStart(url) {
    await mongoose.connect(url, {
        authSource: "admin",
    })
}

export default databaseStart