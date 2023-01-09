const mongoose = require("mongoose");
const CONFIG = require("../config/config");

function connectToDB() {
  mongoose.connect(CONFIG.MONGODB_URL);

  mongoose.connection.on("connected", () => {
    console.log("App is live on Mongoose Database...");
  });

  mongoose.connection.on("error", (err) => {
    console.log("An error occurred while connecting to the Database");
    console.log(err);
  });
}
mongoose.set("strictQuery", false);

module.exports = connectToDB;
