const express = require("express");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const fileUpload = require("express-fileupload");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;
const connect = require("./app/config/config.db");
const auth = require("./app/middleware/authMiddleware");

connect();

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(fileUpload());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use("/api/user", require("./app/routes/routes.user"));
// app.use(auth);
app.use("/api/admin", require("./app/routes/route.admin"));
app.use("/api/place", require("./app/routes/routes.place"));
app.use("/api/place/bookings", require("./app/routes/route.booking"));
// Payment Routes
app.use("/api/payment", require("./app/routes/route.payment"));

app.listen(port, () => {
  console.log("Server listening at " + port);
});
