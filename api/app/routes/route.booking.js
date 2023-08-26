const router = require("express").Router();
const myBookings = require("../controller/controller.booking");

router.get("/all", myBookings.allBookings);

router.get("/booked/:id", myBookings.booked);

router.get("/:id", myBookings.getBookings);

router.post("/", myBookings.book);

router.delete("/:id", myBookings.delete);

module.exports = router;
