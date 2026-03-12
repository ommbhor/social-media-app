const express = require('express');
const app = express();
const multer = require('multer');
app.use(express.json())
const upload = multer({ storage: multer.memoryStorage() })
const uploadFile = require("./servies/storage.service")
const postModel = require('./models/post.model')
const cors = require('cors')
app.use(cors())


app.post("/create_post", upload.single("image"), async (req, res) => {
    console.log(req.body)
    console.log(req.file)
    const result = await uploadFile(req.file.buffer)
    const post = await postModel.create({
        image: result.url,
        caption: req.body.caption
    })

    return res.status(201).json({
        message: "Post Created Successfully.",
        post
    })
})


app.get("/posts", async (req, res) => {
    const posts = await postModel.find()

    return res.status(200).json({
        message: "Post fetched Successfully.",
        posts
    })
})



module.exports = app