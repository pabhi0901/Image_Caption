const express = require("express")
const router = express.Router()
const authMiddleware = require("../middlewares/auth.middleware")
const {createPostController,searchPostController} = require("../controller/post.controller")
const multer = require('multer')
const upload  = multer({storage:multer.memoryStorage()})

router.post("/",
    authMiddleware,
    upload.single("image"), //ye fieldname hai image, filename kuchh v ho skta hai 
    createPostController)

router.get("/search",authMiddleware,searchPostController)

module.exports = router