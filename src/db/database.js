import mongoose from "mongoose";
import dotenv from "dotenv";

// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

const mongoDB = process.env.MONGO_URL;

mongoose.connect(mongoDB).then(() => {
    console.log("Connected to MongoDB");
}).catch(err => console.error(err));