const express = require('express'); // import express
const PORT = 8899; //define port
const app = express(); // create object of express

//custom global middleware

let myData=(req,res,next)=>{
    req.myTitle="Neosoft Technology";
    next();
}
app.use(myData);
app.use(express.json());
app.use(express.urlencoded({extended:false}))

//define the routes
app.get("/",(req,res)=>{
    // res.send('<html><body><h1> Home Page </h1></body></html>');
    res.sendFile('form.html', {root:'.'})
})
app.post("/submit-data",(req,res)=>{
    res.send(`Name: ${req.body.fname} and age: ${req.body.age}`);
})
app.get("/category/:cname([a-z]+)",(req,res)=>{
    //read param value
    let cn=req.params.cname;
    res.send(`The category is ${cn}`)
})
app.get("/categorydata/:cname/:scat?",(req,res)=>{
    //read params value
    let cn=req.params.cname;
    let scn=req.params.scat;
    if(scn!=undefined){
        res.send(`The category is ${cn} and subcat is ${scn}`)
    }
    else{
        res.send(`The category is ${cn} ${req.myTitle}`)
    }
})
app.get('*',(req,res)=>{
    res.send('Invalid url');
})
//define app in the port
app.listen(PORT,(err)=>{
    if(err) throw err;
    console.log(`work on ${PORT}`);
})

