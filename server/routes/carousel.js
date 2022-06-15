var express = require("express");
var router = express.Router();

let slideSchema = require("../models/Slide.model");

/* GET carousels listing. */
router.get("/", function (req, res, next) {
  let no_of_slides = req.query.slides;
  console.log({ no_of_slides });
  slideSchema
    .find((error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
      }
    })
    .limit(no_of_slides);
});

router.route("/").post((req, res, next) => {
  slideSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data);
      res.json(data);
    }
  });
});

router.route("/:id").get((req, res, next) => {
  slideSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

router.route("/:id").put((req, res, next) => {
  slideSchema.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
        console.log("Todo updated");
      }
    }
  );
});

router.route("/:id").delete((req, res, next) => {
  slideSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});

module.exports = router;
