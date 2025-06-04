import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const conectarDB = async () => {
    try {
        const connectionDB = await mongoose.connect(process.env.MONGO_URI);
        const url = `CONECTADO A MONGODB EN SERVER (HOST): ${connectionDB.connection.host} - EN PUERTO ${connectionDB.connection.port}`;
        console.log(url);
    } catch (error) {
        console.log(`${error.message}`);
        process.exit(1);
    }
}

export default conectarDB;