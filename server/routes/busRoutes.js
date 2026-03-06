const express = require("express")
const router = express.Router()

const{
    createBus,
    getAllBuses,
    getBusById,
    deleteBus,
    updateBusLocation
} = require("../controllers/busController")

const protect = require("../middleware/authMiddleware")
const adminOnly = require("../middleware/adminMiddleware")
const driverOnly = require("../middleware/driverMiddleware")


router.post("/",protect,adminOnly,createBus)
router.get("/",protect,getAllBuses)
router.get("/:id",protect,getBusById)
router.delete("/:id",protect,adminOnly,deleteBus)
router.put("/:id/location",protect,driverOnly,updateBusLocation)
module.exports = router;

