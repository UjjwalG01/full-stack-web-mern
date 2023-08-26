const axios = require("axios");
require("dotenv").config();

exports.payment = async (req, res) => {
  const payload = req.body;
  const khaltiResponse = await axios.post(
    "https://a.khalti.com/api/v2/epayment/initiate/",
    payload,
    {
      headers: {
        Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
      },
    }
  );
  if (khaltiResponse) {
    res.json({
      status: "success",
      data: khaltiResponse?.data,
    });
  } else {
    res.json({ status: "error", message: "Error occured" });
  }
};
