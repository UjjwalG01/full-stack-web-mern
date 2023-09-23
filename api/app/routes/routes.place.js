const router = require("express").Router();

const allPlaces = require("../controller/controller.place");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     console.log(file);
//     cb(null, "new" + Date.now() + path.extname(file.originalname));
//   },
// });
// const uploads = multer({ dest: storage });

router.get("/", allPlaces.index);

router.get("/single-place/:id", allPlaces.place);

router.get("/user-place/:id", allPlaces.show);

router.post("/upload", allPlaces.uploadImage);

router.post("/create", allPlaces.createPlace);

router.get("/booked/:id/check", allPlaces.check);

router.get("/booked/:id", allPlaces.book);

router.get("/non-booked/:id", allPlaces.nonBook);

router.put("/:id", allPlaces.updatePlace);

router.delete("/:id", allPlaces.deletePlace);

router.get("/:id", allPlaces.getPlace);

module.exports = router;
