var app=require('express')(),
    mongoose=require('mongoose'),
    bP= require('body-parser');
app.use(bP.urlencoded({extended: true}))
mongoose.connect("mongodb://localhost/todo");
var todoSchema= new mongoose.Schema({
    text: String
})
var ToDo= mongoose.model("Todo", todoSchema);
app.get("/show", (req,res)=>{
    ToDo.find({}, (err,todos)=>{
        res.json(todos);
    })
})
app.post("/add", (req,res)=>{
    ToDo.create(req.body, (err,todo)=>{
      res.send(todo);
    })
})
app.put("/edit", (req,res)=>{
    ToDo.findByIdAndUpdate(req.body.comm_id,  {text: req.body.text}, {new: true},(err,todo)=>{
        res.send(todo);
    })
})

app.get("/", (req,res)=>{
    res.sendFile(__dirname + "/landing.html");
})
app.listen(9000, ()=>{
    console.log("Started the server!!");
})