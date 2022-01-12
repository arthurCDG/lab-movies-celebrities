// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const app = require("../app");
const CelebrityModel = require("../models/Celebrity.model");

// all your routes here

router.get("/", (req, res, next) => {
  CelebrityModel.find()
    .then((allCelebrities) =>
      res.render("celebrities/celebrities.hbs", { celebrities: allCelebrities })
    )
    .catch((err) => console.error(err));
});

router.get("/create", (req, res, next) =>
  res.render("celebrities/new-celebrity.hbs")
);

router.post("/create", (req, res, next) => {
  CelebrityModel.create(req.body)
    .then(res.redirect("/celebrities"))
    .catch((error) => {
      console.error(error);
      res.redirect("/celebrities/create");
    });
});

module.exports = router;
