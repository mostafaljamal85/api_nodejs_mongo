 import  express  from "express";
 import { config } from "dotenv";
import cors from "cors"
 import {getallData,addNewStudent,findStudent,removeStudent}  from './db.js';
 config()
const app=express()
app.use(cors())
app.use(express.json())

app.get('/get/allStudents',async (req,res)=>{
    let findings=await getallData();
    res.send(findings)
})
app.post('/post/addStudent',async (req,res)=>{
    // let nameBody=req.body.name
    // let yearSt=req.body.year
    let yearSt=req.body
    await addNewStudent(yearSt);
    res.send("new student added successfully")
})
app.get('/get/findStudent',async (req,res)=>{
    let nameBody=req.query.name
    let find=await findStudent(nameBody);
    res.send(find)
})
app.delete('/delete/removeStudent',async (req,res)=>{
    let paramsName=req.query.name
    await removeStudent(paramsName);
    res.send("student removed")
})
let PORT=process.env._port
app.listen(PORT,()=>{
    console.log("connected sucessfully on port "+PORT)
})

