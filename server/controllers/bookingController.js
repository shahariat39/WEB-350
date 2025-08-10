import Booking from "../models/Booking.js"
import Car from "../models/Car.js";


// function to check Availability of car for a given date

const checkAvailability= async(car, pickupDate, returnDate)=>{
    const booking = await Booking.find({
        car,
        pickupDate: {$lte: returnDate},
        returnDate: {$gte: pickupDate},
})
return booking.length === 0 ;
}

//API to check Availability of cars for the given date and location

export const checkAvailabilityOfCar =async(req,res)=>{
    try {
        const {location , pickupDate , returnDate } = req.body
        //fetch all available car for the given location
        const cars = await Car.find({location, isAvailable: true});

        //check car availability for the given date range using promise

        const availableCarsPromises = cars.map( async(car) =>{

            const isAvailable = await checkAvailability(car._id, pickupDate, returnDate)
            return {...car._doc , isAvailable: isAvailable}
        })
        
        let availableCars = await Promise.all(availableCarsPromises);
        availableCars = availableCars.filter(car => car.isAvailable === true)

        res.json({ success:true, availableCars});
        
    } catch (error) {
        console.log(error.message);
        res.json({success:false, message:error.message })
    }
}



//API to create booking

export const createBooking = async(req, res )=>{
    try {
        const {_id} = req.body
        const {car , pickupDate , returnDate} = req.body

        const isAvailable = await checkAvailability(car , pickupDate , returnDate )
        if(!isAvailable){
            es.json({success:false, message:"Car is not avaiable" })
        }

        const carData = await Car.findById(car)
        //calculate price based on pickip and return date

        const picked = new Date(pickupDate);
        const returned = new Date(returnDate);
        const noOfDays = Math.ceil((returned-picked)/(24*60*60*1000))
        const price = carData.pricePerDay * noOfDays;

        await Booking.create({car, owner:carData.owner, user:_id, pickupDate, returnDate, price})
        res.json({success:true, message:"Booking created" })
    } catch (error) {
        console.log(error.message);
        res.json({success:false, message:error.message })
    }
}


// API to list user Bookings
export const getUserBookings = async (req ,res) =>{
    try {
        const {_id} = req.user;
        const bookings = await Booking.find({user:_id}).populate("car").sort({createdAt: -1})
         res.json({success:true, bookings})
    } catch (error) {
        console.log(error.message);
        res.json({success:false, message:error.message })
    }
}

// API to get Owner Bookings

export const getOwnerBookings = async (req ,res) =>{
    try {
        if(req.user.role != 'owner'){
            return res.json({success:false , message:"Unauthorized"})
        }

        const bookings = await Booking.find({owner:req.user._id}).populate("car user").select("-user.password").sort({createdAt:-1})
         res.json({success:true, bookings})
    } catch (error) {
        console.log(error.message);
        res.json({success:false, message:error.message })
    }
}

//API to change booking status
export const changeBookingsStatus = async (req ,res) =>{
    try {
        const {_id} = req.user
        const {bookingId, status} = req.body

        const booking = await Booking.findById(bookingId)

        if(booking.owner.toString() != _id.toString()){
            return res.json({success:false, message:"Unauthorized"})
        }

        booking.status = status;
        await booking.save();
         res.json({success:true, message:"Status Updated"})
         
    } catch (error) {
        console.log(error.message);
        res.json({success:false, message:error.message })
    }
}