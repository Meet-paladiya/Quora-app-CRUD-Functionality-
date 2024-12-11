const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
var methodOverride = require('method-override')
app.use(methodOverride('_method'))


app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id : uuidv4(),
        username : "meet",
        content : "student1",
    },
    {
        id : uuidv4(),
        username : "pinal",
        content : "student2",
    },
    {
        id : uuidv4(),
        username : "hinal",
        content : "student3",
    },
];


app.get("/posts",(req,res) => { //all post valo path
    res.render("index.ejs", {posts});
});

app.get("/posts/new",(req,res) =>{ //form valo path
    res.render("new.ejs");
});

app.post("/posts" ,(req,res) =>{ // new.ejs ma thi req aavshe new post banavvani //submission valo path
    let {username,content } = req.body;
    let id = uuidv4();
    posts.push({id,username,content})
    res.redirect("/posts")
});

app.get("/posts/:id", (req, res) => {
    let { id } = req.params; // Extract id from the URL
    let post = posts.find((p) => id === p.id); // Find the post with matching id
        res.render("show.ejs", {post});
});

app.patch("/posts/:id" ,(req,res) => {
    let { id } = req.params; // Extract id from the URL
    let newcontent =req.body.content;
    let post = posts.find((p) => id === p.id); // Find the post with matching id
    post.content = newcontent;
    console.log(post);
    res.redirect("/posts");
});

app.get("/posts/:id/edit",(req,res) => {
    let { id } = req.params; // Extract id from the URL
    let post = posts.find((p) => id === p.id); // Find the post with matching id
    res.render("edit.ejs",{post})
})

app.delete("/posts/:id" , (req,res) => {
    let { id } = req.params; // Extract id from the URL
    posts = posts.filter((p) => id != p.id); // Find the post with matching id
   res.redirect("/posts");
})

// Start the server
app.listen(port, () => {
    console.log("listening to port: 8080");
});


