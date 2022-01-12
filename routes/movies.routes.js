// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const { reset } = require("nodemon");
const MovieModel = require("../models/Movie.model");
const CelebrityModel = require("../models/Celebrity.model");

// all your routes here
router.get("/", (req, res, next) => {
  MovieModel.find()
    .then((allMoviesFetched) =>
      res.render("movies/movies.hbs", { movies: allMoviesFetched })
    )
    .catch((err) => next(err));
});

router.get("/create", async (req, res, next) => {
  try {
    const celebrities = await CelebrityModel.find();
    await res.render("movies/new-movie", { celebrities });
  } catch (err) {
    next(err);
  }
});

router.post("/create", async (req, res, next) => {
  try {
    await MovieModel.create(req.body);
    await res.redirect("/movies");
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const movieFetched = await MovieModel.findById(id).populate("cast");
    res.render("movies/movie-details", { movie: movieFetched });
  } catch (error) {
    next(error);
  }
});

router.get("/:id/edit", async (req, res, next) => {
  try {
    const id = req.params.id;
    const movie = await MovieModel.findById(id).populate("cast");
    const celebrities = await CelebrityModel.find();
    res.render("movies/edit-movie", { movie, celebrities });
  } catch (err) {
    next(err);
  }
});

router.post("/:id/edit", async (req, res, next) => {
  try {
    const id = req.params.id;
    const movie = await MovieModel.findByIdAndUpdate(id, req.body);
    res.redirect("/movies");
  } catch (err) {
    next(err);
  }
});

router.post("/:id/delete", (req, res, next) => {
  const id = req.params.id;
  MovieModel.findByIdAndDelete(id)
    .then(res.redirect("/movies/:id"))
    .catch((err) => console.error(err));
});

module.exports = router;
