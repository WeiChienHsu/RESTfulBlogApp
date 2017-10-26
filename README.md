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

* Add Edit ROUTE & FORM -- used value to get the contents and chagned
```
app.get("/blogs/:id/edit", function(req, res){
    Blog.findById(req.params.id, function(err,foundBlog){
        if(err) {
            res.redirect("/blogs");
        } else {
            res.render("edit", {blog:foundBlog});
        }
    })
});
```
* Use "npm method-override" to change the method from POST to PUT (since the HTML5 couldn't send the PUT request directily)
```
 <form class="ui form"action="/blogs/<%= blog._id %>?_method=PUT" method="POST">
```
* Change the placeholder attribute to "value"
```
        <div class="field">
            <label>Title</label>
            <input type="text" name="blog[title]" value ="<%= blog.title %>">
        </div>
        <div class="field">
            <label>Image</label>
            <input type="text" name="blog[image]" value="<%= blog.image %>">
        </div>
```

* Add Update ROUTE & FORM -- Send the new contents to the right place
```
app.put("/blogs/:id", function(req, res){
    // find exist page and update the data
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){
            res.redirect("/blogs");
        } else{
            res.redirect("/blogs/"+req.params.id);
        }
    })
});
```

* Add Method-Override // in Node.js
```
app.use(methodOverride("_method"));
```

## DESTORY
* Add Delete button in the Show and Index page
```
<form action="/blogs/<%= blog._id%>?_method=DELETE" method="PSOT" >
    <button class="ui orange basic button"> Delete </button>
</form>
```
* Add Destory Route
```
app.delete("/blogs/:id", function(req, res){
    Blog.findByIdAndRemove(req.params.id, function(err){
        if(err) {
            res.redirect("/blogs");
            } else {
                res.redirect("/blogs");
            }
    });
});
```
* Add an Endit Button (form not default into inline display, we need to change it in CSS file)
```
 <a  class="ui blue basic button" href="/blogs/<%= blog.id %>/edit">Edit</a>
```

## Final Updates
* Sanitize blog body (npm express-sanitizer)
```
req.body.blog.body = req.sanitize(req.body.blog.body);

```

* Style Index
```
<div class="ui main text container">
  <div class="ui huge header">RESTful Blog App</div>
  <div class ="ui top attached segment">
    <div class="ui divided items">
        <% blogs.forEach(function(blog){ %>
            <div class="item">
                <div class="image">
                    <img src="<%= blog.image%>">  
                </div>
                <div class="content">
                    <a class="header" href="/blogs/<%= blog._id %>"><%=blog.title%></a>
                    <div class="meta">
                        <span><%= blog.created.toDateString()%></span>
                    </div>
                    <div class="description">
                        <p><%- blog.body.substring(0,80)%> ... </p> 
                    </div>
                    <div class="exrea">
                        <a class="ui floated basic violet button" href="/blogs/<%= blog._id %> ">
                        Read More <i class="right chevron icon"></i></a> 
                    </div>
                </div>
            </div>
        <% }) %>
     </div>
   </div>
</div>

```

* Update REST Table