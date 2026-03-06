const express = require("express")
const router = express.Router()

const {protect} = require("../middleware/authMiddleware")

const {
    createBooking,
    cancelBooking,
    getBookings
} = require("../controllers/bookingController")

router.use(protect)

router.post("/",createBooking)
router.put("/cancel/:id",cancelBooking)
router.get("/",getBookings)
