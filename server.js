import connectDB from "./db/connectionDB.js";
import app from "./app.js";

const startServer = async () => {
  await connectDB();

  app.listen(3000, (error) => {
    if (error) {
      console.log(error);
      return;
    }
    console.log("Server is running. Use our API on port: 3000");
  });
};

startServer();
