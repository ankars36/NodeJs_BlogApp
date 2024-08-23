const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const passport = require("passport")
const localStrategy = require("passport-local")
const expressSession = require("express-session")
const user = require("./models/userModel")


const indexRoutes = require("./routes/indexRoutes")
const adminRoutes = require("./routes/adminRoutes")
const blogRoutes = require("./routes/blogRoutes")


app = express()

//App Config
mongoose.connect("mongodb://localhost/BlogApp")
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended: true
}))

//Passport Config
app.use(require("express-session")({
    secret: "Security sentence",
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
passport.use(new localStrategy(user.authenticate()))
passport.serializeUser(user.serializeUser())
passport.deserializeUser(user.deserializeUser())

//Share current user info
app.use((req, res, next) => {
    res.locals.currentUser = req.user
    next()
})

//Routes
app.use(indexRoutes)
app.use(adminRoutes)
app.use(blogRoutes)

const server = app.listen(3000, (err) => {
    if (err)
        console.log(err)
    console.log('App started. Port number: %d', server.address().port)
})
