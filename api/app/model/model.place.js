const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  photo: {
    type: [String],
  },
  perks: {
    type: [String],
  },
  extraInfo: {
    type: String,
  },
  checkIn: {
    type: Number,
  },
  checkOut: {
    type: Number,
  },
  maxGuests: {
    type: Number,
  },
  booked: {
    type: Boolean,
  },
  category: {
    type: String,
    required: [true, "Category is required"],
    enum: ["normal", "premium"],
  },
});

module.exports = mongoose.model("Place", placeSchema);
