const { model, Schema } = require("mongoose");

const MovieModel = new Schema({
  title: String,
  genre: String,
  plot: String,
  cast: {
    type: [Schema.Types.ObjectId],
    ref: "celebrities",
  },
});

module.exports = model("movies", MovieModel);
