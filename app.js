var express=require("express");
var port =process.env.PORT ||3000
var path = require("path");
var mongoose=require("mongoose");
const { appendFile } = require("fs");
const { urlencoded } = require("body-parser");
mongoose.connect("mongodb://localhost:27017/gfg");
var db = mongoose.connection;

var userSchema = mongoose.Schema({
    name : String,
    email : String,
    password : String,
    phone : Number 
});

var productSchema = mongoose.Schema({
    name : String,
    description : String,
    price : Number,
    picture:String
});

var Product = mongoose.model("Products", productSchema);
var User = mongoose.model("Users", userSchema);

 var app=express();
 app.use (express.json());
 app.use (express.Router());
 app.use (express.urlencoded({extended:false}));


 //setting the view engine to pug 
app.engine("html", require('ejs').renderFile);   // achievement 1 (render
app.set ("view engine", "html");





// app.get("/", function(req, res)
// {
//     var data = db.collection("details").find();
//     console.log(data);
// })
app.get("/signup", function(req,res){
    //console.log(path.join(__dirname + "/signup.pug"));
    //res.sendFile(path.join(__dirname + "/signup.html"));   // works normal for the html files but with the view engine files it makes the  browser download the files or acts as serving the files to be downloaded ...
    // res.render(path.join(__dirname + "/signup.pug"));
    res.sendFile(path.join(__dirname + "/signup.html"));
});
// app.get("/addproduct", function(req,res){
//     res.sendFile(path.join(__dirname + "/product.html"));
// });
app.get("/login",function(req,res){
    res.sendFile(path.join(__dirname + "/login.html"));
    // User.find({}, function(err, users) {
    //     res.send({users: users});
    //  });
    // User.findOne({name : req.body.name}, function(err, user)
    // {
    //     if(err) throw err;
    //     else 
    //     {
    //         console.log(user);
    //     }
    // });
    
});

app.post("/login", function(req, res){

    //console.log(req.body);

    User.findOne({email : req.body.email}, function(err, data)
    {
        if(err) throw err;
        else 
        {
            // console.log(data);
            if(data.email == req.body.email && data.password == req.body.password)
            {
                res.send("sign up sucessfull")
            }
            else 
            {
                res.send("i am struggling !!");
            }
        }
    });
});

app.get("/dashboard", function(req,res) {
    var userCount = User.count({}, function( err, count){
        console.log( "Number of users:", count );
    });
    var productCount = Product.count({}, function( err, count){
        console.log( "Number of Products:", count );
    });
    res.render(path.join(__dirname + "/dashboard"), {userCount : userCount, productCount : productCount});
});

app.get("/addproduct",function(req,res){
    res.sendFile(path.join(__dirname + "/addproduct.html"));
});

app.get("/cart",function(req,res){
    res.sendFile(path.join(__dirname + "/cart")); 
});

app.post('/signup', function(req,res){

   // console.log(req.body);
    
    var name = req.body.name;
    var email =req.body.email;
    var pass = req.body.password;
    var phone =req.body.phone;
      
         var data = new User({
            name : name,
            email :email,
            password : pass,
            phone :phone
        });
    

    data.save(function(err, data)
    {
        if(err)
        {
            throw err;
        }
        else 
        {
            return res.render(path.join(__dirname + "/signup.html"));
            console.log("data inserted");
        }
    })


    
});

app.post('/addproduct', function(req,res){
     
     var name = req.body.name;
     var description =req.body.description;
     var price = req.body.price;
     var picture =req.body.picture;
       
          var data = new Product({
             name : name,
             description :description,
             price : price,
             picture :picture
         });
     
 
     data.save(function(err, data)
     {
         if(err)
         {
             throw err;
         }
         else 
         {
           
             //return res.render(path.join(__dirname + "/addproduct.html"),{message : ""});
             console.log("data inserted");
             res.send("data saved . Wohooo!");
         }
     })
 
 
     
 });



app.listen(port , () => {
console.log(`server is listening at port ${port}`) 
})
