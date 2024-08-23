const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
    res.render('home')
})

router.get("/about", (req, res) => {
    res.render('about')
})

router.get("/contact", (req, res) => {
    res.render('contact')
})

router.get("/resume", (req, res) => {
    res.render('resume')
})
module.exports = router