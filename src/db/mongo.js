import mongoose from "mongoose";

async function databaseStart(url) {
    await mongoose.connect(url, {
        authSource: "admin",
    })
}

console.log("conectado com mongo");


export default databaseStart