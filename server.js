const express = require("express");
const connectdb = require("./config/db");
const passport = require("passport");
const app = express();
// Middleware
// body & header parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// passport
app.use(passport.initialize());
require("./middleware/passport")(passport);
//connect db
connectdb();
//Route Api
app.use("/user", require("./routes/users"));
//Run server
const PORT = process.env.PORT || 5000;
app.listen(PORT, err =>
  console.log(err ? "error server" : `server is running on port ${PORT}`)
);
