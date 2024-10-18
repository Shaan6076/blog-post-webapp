const express = require("express");
const app = express();
const ejs = require("ejs");
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override");


app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride("_method"));

app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname , "views"));

app.use(express.static(path.join(__dirname , "public")));



let posts = [
    {
        id: uuidv4(),
        username : "daniel456",
        content : "Hello everyone, my name is Daniel, and I am a software engineer. With a strong passion for technology, I have dedicated myself to mastering the art of software development. Over the years, I have honed my skills in various programming languages and tools, continuously learning and adapting to new advancements in the field. My journey in this dynamic and ever-evolving industry has been both challenging and rewarding, allowing me to contribute to innovative projects while constantly improving my expertise. "
    },
    {
        id: uuidv4(),
        username : "mike2090",
        content : "Hello everyone, my name is Mike, and I am a data scientist. I specialize in analyzing complex data sets to uncover valuable insights and drive informed decision-making. With a deep understanding of statistical methods, machine learning, and data visualization, I have developed expertise in turning raw data into meaningful information that supports business strategies. My passion for data science keeps me motivated to stay at the forefront of new technologies and tools in the field, constantly refining my skills and expanding my knowledge."
    },
    {
        id:uuidv4(),
        username : "trace2309",
        content: "Hello everyone, my name is Trace, and I am a Division 1 (D1) athlete. Competing at the highest level of collegiate sports has taught me the importance of discipline, perseverance, and hard work. My journey as a D1 athlete has pushed me to constantly improve my skills, both physically and mentally, while balancing the demands of academics and athletics. I am passionate about my sport, and the experience has shaped me into a dedicated and goal-driven individual, always striving to perform at my best and succeed both on and off the field."
    }
];

app.get("/posts" ,(req, res) => {
    res.render("index.ejs", {posts});
});

app.get("/posts/new",(req,res)=> {
    res.render("new.ejs");
});

app.post("/posts",(req,res) => {
    const {username, content} = req.body;
    let id = uuidv4();
    posts.push({id , username, content});
    res.redirect(`/posts`);
});

app.get("/posts/:id", (req,res) =>{
    let id = req.params.id;
    const post = posts.find((p) => p.id === id);
    res.render("show.ejs",{post});
})

app.patch("/posts/:id" , (req , res) => {
    let id = req.params.id;
    let newContent = req.body.content;
    let post = posts.find((p) => p.id === id);
    post.content = newContent;
    res.redirect(`/posts`);
})

app.get("/posts/:id/edit" , (req , res)=>{
    let id = req.params.id;
    let post = posts.find((p) => p.id == id);
    res.render("edit.ejs",{post});
})

app.delete("/posts/:id", (req,res)=>{
    let id = req.params.id;
    posts = posts.filter((p) => id !== p.id);
    res.redirect(`/posts`);

})

app.listen(port , (err) => {
   if(err) {
    console.log(`Error in starting the server ${err}`);
   } else {
    console.log("server is running", port);
   }
})