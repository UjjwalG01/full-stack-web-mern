const uuid = require("uuid").v4;
const Place = require("../model/model.place");

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
      perks,
      booked,
    } = req.body;
    const photos = req.files?.photo;
    // console.log(req.files);

    let images = [];
    if (photos.length > 0) {
      for (const photo of photos) {
        // const ext = await photo.name.split(".")[1];
        const path = `/uploads/img${uuid()}.jpg}`;
        images.push(path);
      }
      await Promise.all(
        photos.map(async (photo, index) => {
          photo.mv(`public${images[index]}`);
        })
      );
    } else {
      // const ext = await photos.name.split(".")[1];
      const path = `/uploads/img${uuid()}.jpg`;
      images.push(path);
      photos.mv(`public/${path}`);
    }

    const newPlace = await Place.create({
      owner,
      title,
      address,
      description,
      price,
      extraInfo,
      checkIn,
      checkOut,
      photo: images,
      maxGuests,
      perks,
      booked,
    });

    // console.log(newPlace);

    await newPlace.save();
    res.status(200).json({
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
    const newData = await Place.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      status: "success",
      data: newData,
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
