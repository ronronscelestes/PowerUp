require('dotenv').config()
const mongoose = require("mongoose");


mongoose.connect(process.env.MONGO_URL, { // use MONGO_URI from .env
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () =>
  console.log("yay mongodb connected :)")
);

mongoose.connection.on("error", () =>
  console.log("nay db connection error :(")
);
