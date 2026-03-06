const Booking = require("../models/Booking")
const Bus = require("../models/Bus")


//Book a seat
exports.createBooking = async(req,res) => {
    try{
        const {busId, seatNumber} = req.body;
        const passengerId = req.user._id

        const existing = await Booking.findOne({busId,seatNumber,status:"booked"});
        if(existing){
            return res.status(400).json({message:"Seat already booked"})
        }

        const booking = await Booking.create({busId , passengerId,seatNumber})
        res.status(201).json({message:"Seat booked successfully",booking});
    }catch(error){
        res.status(500).json({message:"Booking failed",error:error.message})
    }
}


//Cancel a booking
exports.cancelBooking = async (req,res) => {
    try{
        const booking = await Booking.findById(req.params.id);

        if(!booking){
            return res.status(404).json({
                message:"Booking not found"
            })
        }

        if(!req.user._id.equals(booking.passengerId) && req.user.role !== "admin" || req.user.role !== "passenger"){
            return res.status(403).json({
                message : "Not authorized to cancel"
            })
        }

        booking.status = "cancelled";
        await booking.save();

        res.json({
            message : "Booking cancelled successfully",booking
        })
    }catch(error){
        res.status(500).json({message:"Cancel Failed",
            error:error.message
        })
    }
}


//View booking 
exports.getBookings = async(req,res) =>{
    try{
        let bookings;
        if(req.user.role === "admin"){
            bookings = await Booking.find().populate("busId passengerId")
        }
        else{
            bookings = await Booking.find({
                passengerId : req.user._id
            }).populate("busId")
        }
        res.json(bookings)
    }catch(error){
        res.status(500).json({
            message : "Fetching bookings failed",
            error : error.message
        })
    }
}

