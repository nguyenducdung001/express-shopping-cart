var express = require("express");
const { validationResult, check } = require("express-validator");
var router = express.Router();

// load page model
const Page = require("../models/page");


/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("admin/pages", { title: "ADMIN AREA" });
});

// route: localhost:3000/admin-pages/add-page
// method: GET
// Hiện thị trang addPage
router.get("/add-page", function (req, res, next) {
  var title = "";
  var slug = "";
  var content = "";

  res.render("admin/addPage", { title, slug, content }); //destructuring es6
});




// route: localhost:3000/admin-pages/add-page
// method: POST
// Thực hiện thêm mới trang
router.post("/add-page",

async  (req, res, next) =>{
 console.info(`checking request body: ${JSON.stringify(req.body)}`);

    // middleware: express validator
 await check('title',"Title must have value",).notEmpty().run(req);
 await check('content',"Content must have value").notEmpty().trim().run(req);




  const errors = validationResult(req);



  console.info(`validation results: ${JSON.stringify(errors)}, is empty? $ ${errors.isEmpty()}`);
  // // middleware: body-parser
  var {title} = req.body;
  var content = req.body.content.replace("\r\n","");
  var slug = req.body.slug.replace(/\s+/g, '-').toLowerCase();
  if(slug == "")  slug = title.replace(/\s+/g, '-').toLowerCase();
 



if(errors.isEmpty() ){
  console.log("Success");
  res.render("admin/addPage", { title, slug, content});
  Page.findOne({slug: slug},(err,page)=>{
    if(page){
      req.flash('danger', "Page slug exists, choose another one");
      res.render("admin/addPage", {
        title, slug, content
      });
    }else{
     var newPage = new Page({
      title, slug, content
     })
     newPage.save(err => {
      if (err) return console.log(err);
      req.flash('success','Page-added');
      res.redirect("/admin-pages");
     })
    }
  })
 

}else{
  console.log("Failure");
  res.send(`checking done, error: ${JSON.stringify(errors.array())}`);
 
};


});

module.exports = router;
