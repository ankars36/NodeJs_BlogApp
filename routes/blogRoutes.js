const express = require("express")
const blogModel = require("../models/blogModel")
const router = express.Router()

router.get("/addnewblog", (req, res) => {
    res.render('admin/blog/newBlog')
})


router.post("/addnewblog", (req, res) => {
    let newBlog = {
        title: req.body.data.title,
        comSentence: req.body.data.comSentence,
        comImage: req.body.data.comImage,
        blog: req.body.data.blog
    }
console.log(newBlog);

    blogModel.create(newBlog)
        .then((newBlog) => {
            res.status(201).json(newBlog)
        })
        .catch((err) => {
            console.log("Add New Blog Error: " + err)
            res.send(err)
        })
})
module.exports = router