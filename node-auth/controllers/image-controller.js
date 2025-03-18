const Image = require('../models/image')
const {uploadToCloudinary} = require('../helpers/cloudnary')
const fs = require('fs')
const cloudinary = require('../config/cloudnary')

const uploadImageController = async(req,res)=>{
    try {
        // Check if req object has file or not
        if(!req.file){
            return res.status(400).json({
                success: false,
                messgae : "File is required. Please upload an image"
            })
        }
        // Upload to Cloudinary
        const {url , publicId} = await uploadToCloudinary(req.filePath)

        // Store the publicId , url id and with the userId in database
        const newlyUploadedImage = new Image({
            url,
            publicId,
            uploadedBy : req.userInfo.userId
        })

        await newlyUploadedImage.save()

        // delete the file from local Storage
        fs.unlinkSync(req.file.path)

        res.status(201).json({
            success : true,
            message : "Image Uploaded SuccessFully!",
            image : newlyUploadedImage
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
        success: false,
        message: "Something went wrong! Please try again",
    });
    }
}

const fetchImageController = async(req,res)=>{
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 2
        const skip = (page - 1) * limit

        const sortBy = req.query.sortBy || "createdAt"
        const sortOrder = req.query.sortorder === "aesc" ? 1 : -1

        const totalImages = await Image.countDocuments()
        const totalpages =  Math.ceil(totalImages/limit)

        // fetch Images
        const images = await Image.find()
        .sort({ [sortBy]: sortOrder })
        .skip(skip)
        .limit(limit)

        res.status(200).json({
            success: true,
            currentPage: page,
            totalpages,
            totalImages,
            data: images,
          });

    } catch (error) {
      console.error(error);
      res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again",
    });
    }
}

const deleteImageController = async(req,res)=>{
    try {
        const getCurrentIdOfImageToBeDeleted = req.params.id
        const userId = req.userInfo.userId

        const image = await Image.findById(getCurrentIdOfImageToBeDeleted)

        if (!image) {
            return res.status(404).json({
              success: false,
              message: "Image not found",
            });
          }
        
        if(image.uploadedBy.toString() !== userId){
            return res.status(404).json({
                success : false,
                message: `You are not authorized to delete this image because you haven't uploaded it`,
            })
        }

        // delete from cloudinary
        await cloudinary.uploader.destroy(image.publicId)

        // delete from database
        await Image.findByIdAndDelete(getCurrentIdOfImageToBeDeleted)

        res.status(200).json({
            success: true,
            message: "Image deleted successfully",
          });

    } catch (error) {
        console.log(error);
        res.status(500).json({
        success: false,
        message: "Something went wrong! Please try again",
    });
    }
}

module.exports = {uploadImageController , fetchImageController , deleteImageController}
