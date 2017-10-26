# RESTful Blog App
## Blog INDEX (NEW)
* Setup the Blog App
```
var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose")

mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

```
* Create the blog model
```
var blogSchema = new mongoose.Schema({
    title:String,
    image:String,
    body:String,
    created:{type: Date, default: Date.now}
});
```
* Add INDEX route and template
```
app.get("/",function(req, res){
    res.redirect("/blogs");
})

app.get("/blogs", function(req, res){
    Blog.find({},function(err, blogs){
        if(err){
            console.log(err);
        } else {
            res.render("index",{blogs:blogs});
        }
    })
})
```
* In the index.ejs use the data from above ROUTE

## Basic Layout
