import databaseStart from "./database.js"
import dotenv from 'dotenv'

dotenv.config();

const url = process.env.MONGO_URL;

export default async () => databaseStart(url || "");