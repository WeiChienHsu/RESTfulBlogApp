var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose")

mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

//MongoDB MODEL CONFIG

var blogSchema = new mongoose.Schema({
    title:String,
    image:String,
    body:String,
    created:{type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog",blogSchema);

// Blog.create({
//     title:"First POST",
//     image:"https://images.unsplash.com/photo-1496963729609-7d408fa580b5?w=1951&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
//     body:"Hello this is a blog post!"
// })

//RESTful ROUTES
app.get("/",function(req, res){
    res.redirect("/blogs");
})

//Retrieve
app.get("/blogs", function(req, res){
    Blog.find({},function(err, blogs){
        if(err){
            console.log(err);
        } else {
            res.render("index",{blogs:blogs});
            // passing the data back
        }
    })
})


app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Server is connecting!");
})