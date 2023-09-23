const uuid = require("uuid").v4;
const Place = require("../model/model.place");
const multer = require("multer");
const path = require("path");

exports.index = async (req, res) => {
  try {
    // const places = await Place.find();

    let places = Place.find();

    if (req.query?.q) {
      places = places.where("title", new RegExp(req.query.q, "i"));
    }

    places = await places.populate();

    res.status(200).json({
      status: "success",
      data: places,
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.place = async (req, res) => {
  try {
    const places = await Place.find({ id: req.params.id });
    res.status(200).json({
      status: "success",
      data: places,
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.show = async (req, res) => {
  try {
    // must be authorized to see this page
    const userId = req.params.id;
    // console.log(userId);
    const places = await Place.find({ owner: userId });
    res.status(200).json({
      status: "success",
      data: places,
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.uploadImage = async (req, res) => {
  try {
    const images = req.files.images;
    let imgArray = [];
    if (images.length > 0) {
      for (const img of images) {
        const path = `/uploads/img${uuid()}.jpg`;
        imgArray.push(path);
      }
      await Promise.all(
        images.map(async (image, index) => {
          image.mv(`public${imgArray[index]}`);
        })
      );
    } else {
      const path = `/uploads/img${uuid()}.jpg`;
      imgArray.push(path);
      images.mv(`public${path}`);
    }
    res.status(200).json({
      status: "success",
      data: imgArray,
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.createPlace = async (req, res) => {
  try {
    const {
      owner,
      title,
      address,
      description,
      price,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      booked,
      category,
      images,
      perks,
    } = req.body;

    const newPlace = await Place.create({
      owner,
      title,
      address,
      description,
      price,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      booked,
      category,
      photo: images,
      perks,
    });
    await newPlace.save();
    res.status(201).json({
      status: "success",
      data: newPlace,
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.updatePlace = async (req, res) => {
  try {
    // const found = await Place.findById(req.params.id);
    // console.log(found);
    // console.log(req.body.owner);
    const {
      owner,
      title,
      address,
      description,
      price,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      booked,
      category,
      images,
      perks,
    } = req.body;

    const place = await Place.findByIdAndUpdate(req.params.id, {
      owner,
      title,
      address,
      description,
      price,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      booked,
      category,
      photo: images,
      perks,
    });
    await place.save();

    res.status(200).json({
      status: "success",
      data: place,
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.check = async (req, res) => {
  try {
    const booked = await Place.findById(req.params.id);
    await booked.save();
    res.status(200).json({
      status: "success",
      data: booked,
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.book = async (req, res) => {
  try {
    const booked = await Place.findById(req.params.id);
    booked.booked = true;
    await booked.save();
    res.status(200).json({
      status: "success",
      data: booked,
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.nonBook = async (req, res) => {
  try {
    const booked = await Place.findById(req.params.id);
    booked.booked = false;
    await booked.save();
    res.status(200).json({
      status: "success",
      data: booked,
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.deletePlace = async (req, res) => {
  try {
    const deletedItem = await Place.findByIdAndDelete(req.params.id);
    // console.log("Item deleted", deletedItem);
    res.status(200).json({
      status: "success",
      data: deletedItem,
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.getPlace = async (req, res) => {
  try {
    // if (!req.user) return res.status(400).json({ status: "error" });
    const place = await Place.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: place,
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
};
