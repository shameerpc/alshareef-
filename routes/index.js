const express = require('express');
const postdata = require("./signup.routes");
const postData = require("./signin.routes");
const careersData = require("./careers.routes")
const roleData= require("./roles.routes.js")
const contactusdata = require('./contactus.routes')
// const ourprojects  = require("./ourprojects.routes")
const contactusformdata= require("./contactusform.routes")
const careersformdata=require("./careersform.routes")
const userData=require("./user.routes")
const resetpassworddata=require('./resetpassword.routes')
const forgetpasswordData=require("./forgetpassword.routes")

const router = express.Router();
router.get('/', (req, res) => {
  res.send('TODO API Version 1');
});

// router.use('/todo', require('./todo.routes'));
router.use("/signup",postdata)
router.use("/roles",roleData)
router.use("/signin", postData);
router.use("/profile",require('./profile.routes'))
// router.use("/service",require('./servicemanagment.routes'))
router.use("/pages",require('./pages.routes.js'))
router.use("/gallery",require('./gallery.routes.js'))
router.use("/banner",require('./banner.routes.js'))
router.use("/logo",require('./logo.routes.js'))
router.use("/division",require('./division.routes.js'))
router.use("/navmenu",require('./navmenu.routes.js'))
router.use("/footer",require('./footer.routes.js'))
// router.use("/ourprojects",ourprojects)
router.use("/forgetpassword", forgetpasswordData);
router.use("/resetpassword",resetpassworddata)
router.use("/career",careersData)
router.use("/user",userData)
router.use("/contactus",contactusdata)
router.use("/contactusform",contactusformdata)
router.use("/careersform",careersformdata)
router.use("/aboutus",require('./aboutus.routes.js'))
router.use("/sidenav",require('./sidenav.routes.js'))
router.use("/ourteam",require('./ourteam.routes'))
router.use("/leadershipteam",require('./leadershipteam.routes'))
router.use("/newsandblogs",require('./newsandblogs.routes'))
router.use("/emailsubscription",require('./emailsubscription.routes'))
router.use("/messegesfromexecutives",require('./messegesfromexecutives.routes'))
router.use("/footer",require('./footer.routes'))


router.use((err, req, res) => {
  if (err)
    res.status(500).json({
      status: false,
      error: 'Something went wrong',
    });
});
module.exports = router;
