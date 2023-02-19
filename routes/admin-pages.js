var express = require("express");
const { check, oneOf } = require("express-validator/check");
var router = express.Router();


/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("admin/pages", { title: "ADMIN AREA" });
});

router.get("/add-page", function (req, res, next) 
{
  var title= "";
  var slug = "";
  var content = "";
  res.render("admin/addPage", { title, slug, content });
});


// route

router.post("/add-page",
oneOf([check('title', 'Title must have value').isEmpty(),
check('content', 'Content must have value').isEmpty(),]),

function (req, res, next) 
{
  console.log("req", req.body)
  // express-validator

// body-parser
  var title= req.body.title;
  var slug = req.body.slug.replace(/\s+/g,'-').toLowerCase();
  if(slug === "") slug = title.replace(/\s+/g,'-').toLowerCase();
  var content = req.body.content;


  var errors = req.validationErrors();

  if(errors){
    console.log('Fail');
    res.render("admin/addPage", {errors, title, slug, content });
  }else{
    console.log('Success')
  }


});



module.exports = router;
