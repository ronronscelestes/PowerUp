const mongoose = require("mongoose");


mongoose.connect("mongodb://localhost/games-collection", { // use MONGO_URI from .env
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
