import Burger from "../models/burger.js";
import asyncErrorHandler from "../util/asyncErrorHandler.js";

const addBurger = asyncErrorHandler(async (req, res, next) => {
  const image = req.body.image || "default-image-url";
  console.log(req.body);
  const burger = new Burger({
    name: req.body.name,
    image: image,
    price: JSON.parse(req.body.price),
    featured: JSON.parse(req.body.featured),
    offered: JSON.parse(req.body.offered),
  });
  await burger.save().then((burger) => {
    res.status(200).json({ burger });
  });
});

const updateBurger = asyncErrorHandler(async (req, res, next) => {
  const image = req.body.image || "default-image-url";
  console.log(req.body);
  const updateObject = {
    name: req.body.name,
    image: image,
    price: JSON.parse(req.body.price),
    featured: JSON.parse(req.body.featured),
    offered: JSON.parse(req.body.offered),
  };

  Burger.updateOne({ _id: req.params.id }, { $set: updateObject })
    .then((burger) => {
      res.status(200).json({ burger });
    })
    .catch((err) => {
      console.log(err);
      next(new CustomError("Burger not found", 404));
    });
});

const updateBurgerImage = asyncErrorHandler(async (req, res, next) => {
  Burger.updateOne(
    { _id: req.params.id },
    {
      $set: {
        image: req.image,
      },
    }
  ).then((burger) => {
    res.status(200).json({ burger });
  });
});

const deleteBurger = asyncErrorHandler(async (req, res, next) => {
  Burger.deleteOne({ _id: req.params.id }).then((burger) => {
    if (!burger) {
      return next(new CustomError("Burger not found", 404));
    }
    res.status(200).json({ burger });
  });
});

const getBurgers = asyncErrorHandler(async (req, res, next) => {
  const { featured, offered, price, sort } = req.query;
  const queryObj = {};

  if (featured) {
    queryObj.featured = featured === "true" ? true : false;
  }

  if (offered) {
    queryObj.offered = offered;
  }

  if (price) {
    queryObj.price = { $gte: Number(price) };
  }
  let burgerList = Burger.find(queryObj);

  if (sort) {
    const sortList = sort.split(",").join(" ");
    burgerList = burgerList.sort(sortList);
  } else {
    burgerList = burgerList.sort("price");
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 4;
  const skip = (page - 1) * limit;

  burgerList = burgerList.skip(skip).limit(limit);

  const result = await burgerList;
  res.status(200).json({ result, count: result.length });
});

const getBurger = asyncErrorHandler(async (req, res, next) => {
  const burger = await Burger.findById(req.params.id);
  if (!burger) {
    return next(new CustomError("Burger not found", 404));
  }
  res.status(200).json({ burger });
});

export {
  addBurger,
  updateBurger,
  updateBurgerImage,
  deleteBurger,
  getBurgers,
  getBurger,
};
