const Booking = require("../model/model.booking");

exports.book = async (req, res) => {
  try {
    const {
      place,
      checkIn,
      checkOut,
      numberOfGuests,
      user,
      name,
      phone,
      price,
      payment,
    } = req.body;

    const booking = await Booking.create({
      place,
      user,
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      phone,
      price,
      payment,
    });
    await booking.save();
    res.status(200).json({
      status: "success",
      data: booking,
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.allBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json({
      status: "success",
      data: bookings,
    });
  } catch (err) {
    console.log(err.message);
  }
};

exports.booked = async (req, res) => {
  try {
    const bookings = await Booking.find({ place: req.params.id });
    res.status(200).json({
      status: "success",
      data: bookings,
    });
  } catch (err) {
    console.log(err.message);
  }
};

exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.params.id }).populate(
      "place"
    );
    res.json({
      data: bookings,
    });
  } catch (err) {
    console.log(err.message);
  }
};

exports.delete = async (req, res) => {
  try {
    const deletedBooking = await Booking.deleteOne({
      place: req.params.id,
    });
    // console.log(req.params.id);
    res.status(200).json({
      status: "success",
      data: deletedBooking,
    });
  } catch (err) {
    console.log(err.message);
  }
};
