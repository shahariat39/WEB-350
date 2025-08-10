import imagekit from "../configs/imagekit.js";
import Booking from "../models/Booking.js";
import Car from "../models/Car.js";
import User from "../models/User.js";
import fs from "fs"

// API to Change Role of User
export const changeRoleToOwner = async (req, res)=>{
    try {
        const {_id} = req.user;
        await User.findByIdAndUpdate(_id, {role: "owner"})
        res.json({success: true, message: "Now you can list cars"})
    } catch (error) {
         console.log(error.message);
         res.json({success: false, message: error.message})
    }
}

// API to List Car

export const addCar = async (req, res)=>{
    try {
        const {_id} = req.user;
        let car = JSON.parse(req.body.carData);
        const imageFile = req.file;

        const fileBuffer = fs.readFileSync(imageFile.path)

        const response = await imagekit.upload({
            file: fileBuffer,
            fileName:imageFile.originalname ,
            folder: "/cars"
        })

        var optimizedImageURL = imagekit.url({
        path : response.filePath,
        transformation : [
            {
                width : "1280"
            },
            {
                 format: 'webp'
            },
            {
                quality: 'auto'
            }
        ]
        });
        const image = optimizedImageURL;
        await Car.create({...car , image, })

        res.json({success:true , message: "Car Added"})

    } catch (error) {
        console.log(error.message);
         res.json({success: false, owner:_id, message: error.message})
    }
}

//API to list owner cars

export const getOwnerCars = async (req, res)=>{
    try {
        const {_id} = req.user;
        const cars = await Car.find({owner:_id})
        res.json({success: true,cars})
    } catch (error) {
         console.log(error.message);
         res.json({success: false, message: error.message})
    }
}

//API to toggle car availability

export const toggleCarAvailability = async (req, res)=>{
    try {
        const {_id} = req.user;
        const {carId}= req.body;
        const car = await Car.findById(carId)
        if(car.owner.toString() != _id.toString()){
             res.json({success: false, message: "unauthorized"})
        }
        car.isAvailable = ! car.isAvailable;
        await car.save();
        res.json({success: true,message:"Availability toggled"})

    } catch (error) {
         console.log(error.message);
         res.json({success: false, message: error.message})
    }
}

//API to delete a owner car

export const deleteCar = async (req, res)=>{
    try {
        const {_id} = req.user;
        const {carId}= req.body;
        const cars = await Car.find({owner:_id})
        //owner check
        const car = await Car.findById(carId)
        if(car.owner.toString() != _id.toString()){
            res.json({success: false, message: "unauthorized"})
        }

        car.owner = null;
        car.isAvailable = false;
        await car.save();
        res.json({success: true,message:"Car removed"})

    } catch (error) {
         console.log(error.message);
         res.json({success: false, message: error.message})
    }
}

//API to get Dashboard data

export const getDashboardData = async (req, res)=>{
    try {
        const {_id, role} = req.user;

        if (role !== 'owner'){
            res.json({success: false, message: "unauthorized"})
        }
        const cars = await Car.find({owner:_id})
        const bookings = await Booking.find({owner: _id}).populate("car").sort({createdAt:-1})

        const pendingBookings = await Booking.find({owner: _id , status: "pending"})
        const completedBookings = await Booking.find({owner: _id , status: "confirmed"})

        //Calculate monthly revenue from booking where status is confirmed

        const monthlyRevenue = bookings.slice().filter(booking => booking.status ==='confirmed').reduce((acc,booking)=> acc + booking.price , 0)

        const dashboardData = {
            totalCars: cars.length,
            totalBookings: bookings.length,
            pendingBookings: pendingBookings.length,
            completedBookings: completedBookings.length,
            recentBookings: bookings.slice(0,3),
            monthlyRevenue
        }
        res.json({success:true, dashboardData})

    } catch (error) {
         console.log(error.message);
         res.json({success: false, message: error.message})
    }
}
