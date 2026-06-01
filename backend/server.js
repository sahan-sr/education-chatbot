require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const chatRoutes = require("./routes/chatRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/chat", chatRoutes);


console.log("Trying MongoDB connection...");


mongoose.connect(process.env.MONGO_URI)
.then(() => {

    console.log("MongoDB connected!");
console.log(
  "Connected database:",
  mongoose.connection.name
);

    app.listen(process.env.PORT, () => {
        console.log(
            `Server running on port ${process.env.PORT}`
        );
    });

})
.catch((error) => {
    console.error("Mongo error:");
    console.error(error);
});