const generateCaption = require("../services/ai.service")
const uploadImage = require('../services/storage.service')
const { v4: uuidv4 } = require('uuid');
const postModel = require("../models/post.model")

async function createPostController(req,res){
    const file = req.file
    // console.log(file);

    //converting the image file into base64 format

    const base64ImageFile = new Buffer.from(file.buffer).toString('base64')
    const caption = await generateCaption(base64ImageFile) //generating caption
    const uploadedImage = await uploadImage(file.buffer,uuidv4()) //uploading image to the imagekit

    //creating a post in the database

    const post = await postModel.create({
        image:uploadedImage.url,
        caption:caption,
        user:req.user._id
    })

    res.json({
        post
    })

}

async function searchPostController(req,res){

    const {searchQuery} = req.body
    const post = await postModel.find({
        user:req.user._id,
         caption: { $regex: searchQuery, $options: "i" }
    })

    res.json({
        post
    })


}

module.exports = {createPostController,searchPostController}