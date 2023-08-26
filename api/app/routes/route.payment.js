const router = require("express").Router();
const paymentController = require("../controller/controller.payment");

router.post("/khalti-pay", paymentController.payment);

module.exports = router;
