const { model, Schema } = require("mongoose");

const CelebrityModel = new Schema({
  name: String,
  occupation: String,
  catchPhrase: String,
});

module.exports = model("celebrities", CelebrityModel);
