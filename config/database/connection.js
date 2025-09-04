import mongoose from "mongoose";

console.log(`\n MongoDB connected !! DB HOST: ${process.env.MONGODB_URI}`);
const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);

        // Return the MongoDB client (connectionInstance) so it can be used in controllers
        return  connectionInstance.connection;
    } catch (error) {
        console.log("MONGODB connection error", error);
        //
        process.exit(1);
    }
};



export default connectDB;