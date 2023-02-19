var express = require("express");
const { check } = require("express-validator/check");
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
check('title', 'Title must have value').notEmpty(),
check('content', 'Content must have value').notEmpty(),
function (req, res, next) 
{
  // express-validator
  // req.checkBody('title', 'Title must have value').notEmpty();
  // req.checkBody('content', 'Content must have value').notEmpty();
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
