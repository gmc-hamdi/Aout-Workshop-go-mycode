const mongoose = require("mongoose");
const config = require("config");

const connectdb = async () => {
  try {
    await mongoose.connect(config.get("MOGOURI"), {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex:true
    });
    console.log("db connected ...");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  // .then(()=>console.log('db connected ...'))
  // .catch(err=>console.error(err))
};
module.exports = connectdb;
