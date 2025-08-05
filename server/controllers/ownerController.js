import imagekit from "../configs/imagekit.js";
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