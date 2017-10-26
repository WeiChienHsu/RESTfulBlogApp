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

* Use Semantic UI to add a navbar
```
	<div class="ui fixed inverted menu">
	  <div class="ui container">
		<div class="header item"><i class="paint brush icon"></i>Blog Site</div>
		<a href="/" class="item">Home</a>
		<a href="/blogs/new" class="item">New Post</a>
	  </div>
	</div>
```
* styling the form
```
<div class="ui main text container segment">  
    <div class="ui huge header">New Blog</div>
    <form class="ui form"action="/blogs" method="POST">
        <div class="field">
            <label>Title</label>
            <input type="text" name="blog[title]" placeholder="title">
        </div>
        <div class="field">
            <label>Image</label>
            <input type="text" name="blog[image]" placeholder="image url">
        </div>
        <div class="field">
            <label>Blog Content</label>
            <textarea name="blog[body]"></textarea>
        </div>
        <input class="ui violet basic button" type="submit"> </button>
    </form>
</div>
```

## Puting the C in CRUD - create

* Add NEW ROUTE
* Add NEW template
```
app.get("/blogs/new",function(req, res){
    res.render("new");
})
```
* Add CREATE ROUTE
* Add CREATE template
```
app.post("/blogs",function(req, res){
    Blog.create(req.body.blog,function(err, newBlog){
        if(err){
            res.render("new");
        } else{
            res.redirect("/blogs");
        }
    });
});
```

## SHOW time - findById

* Add SHOW Route
* Add SHOW template

```
app.get("/blogs/:id", function(req, res){
     Blog.findById(req.params.id,function(err, foundBlog){
        if(err) {
            res.redirect("/blogs");
        } else {
            res.render("show",{blog:foundBlog});  
        }
    });
})
```
* Style the SHOW page
```
    <div class="ui main text container segment">  
        <div class="ui huge header"><%= blog.title %></div>
        <div class="ui top attached">
            <div class="item">
                <img class="ui centered rounded image" src="<%= blog.image%>">
                <div class="content">
                    <span><%= blog.created.toDateString()%></span> 
                </div>
                <div class="description">
                    <p><%- blog.body%></p>
                    ////// - will run the tag codes
                </div>
            </div>
        </div>
    </div>
```

* Limit the strings in INDEX page
```
<p><%= blog.body.substring(0,80)%> ... </p>
```

## Edit / Update

* Add Edit ROUTE & FORM
* Add Update ROUTE & FORM
* Add Method-Override
