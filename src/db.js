import { config } from "dotenv" 
import { MongoClient } from "mongodb"
config()

let url=process.env.COMPASS_URL
let url_atlas=process.env.ATLAS_URL
let mongoclient= new MongoClient(url_atlas)

async function connectDB(ur){
    try {
        let mongoclient= new MongoClient(ur)
         await mongoclient.connect()
         console.log("connected to mongodb")
         return mongoclient
    }catch{
        console.log("failled to connect")
    }
}
export async function getallData(){
    try {
        let mongoC=await connectDB(url);
        const db=mongoC.db("university");
        const student_collection=db.collection("teachers")
        let result=await student_collection.find({}).toArray();
        return result

    }finally{
       await mongoclient.close()
    } 
}
export async function addNewStudent(name){
    try {
        let mongoC=await connectDB(url_atlas);
        const db=mongoC.db("university");
        const student_collection=db.collection("teachers")
        await student_collection.insertOne(name)

    }finally{
       await mongoclient.close()
    } 
}
export async function findStudent(navn){
    try {
        let mongoC=await connectDB(url);
        const db=mongoC.db("university");
        const student_collection=db.collection("teachers")
        let finding=await student_collection.find({name:{$eq:navn}}).toArray()
        return finding
    }finally{
       await mongoclient.close()
    } 
}
export async function removeStudent(nam){
    try {
        let mongoC=await connectDB(url);
        const db=mongoC.db("university");
        const student_collection=db.collection("teachers")
        await student_collection.deleteOne({name:{$eq:nam}})
    }finally{
       await mongoclient.close()
    } 
}
