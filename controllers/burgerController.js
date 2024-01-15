import Burger from "../models/burger.js";
import asyncErrorHandler from "../util/asyncErrorHandler.js";

const addBurger = asyncErrorHandler(async (req, res, next) => {
  console.log(req.body);
  const burger = new Burger({
    name: req.body.name,
    image: "http://localhost:3000/" + req.file.path,
    price: req.body.price,
    featured: req.body.featured,
    description: req.body.description,
    category: req.body.category,
  });
  await burger.save().then((burger) => {
    res.status(200).json({ burger });
  });
});

const updateBurger = asyncErrorHandler(async (req, res, next) => {
  Burger.updateOne(
    { _id: req.params.id },
    {
      $set: {
        name: req.body.name,
        image: "http://localhost:3000/" + req.file.path,
        price: req.body.price,
        featured: req.body.featured,
        description: req.body.description,
        category: req.body.category,
      },
    }
  ).then((burger) => {
    res.status(200).json({ burger });
  });
});

const updateBurgerImage = asyncErrorHandler(async (req, res, next) => {
  Burger.updateOne(
    { _id: req.params.id },
    {
      $set: {
        image: "http://localhost:3000/" + req.file.path,
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
  const { featured, category, price, sort } = req.query;
  const queryObj = {};

  if (featured) {
    queryObj.featured = featured === "true" ? true : false;
  }

  if (category) {
    queryObj.category = category;
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
  console.log(req.params.id);
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
