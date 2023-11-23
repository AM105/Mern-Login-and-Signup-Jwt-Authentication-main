const mongoose=require("mongoose")
mongoose.connect("mongodb://0.0.0.0:27017/adil",
 { useNewUrlParser: true,
     useUnifiedTopology: true })
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log('failed');
})


const newSchema=new mongoose.Schema({

    name:{
        type:String,   
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    created_at: { type: Date,
         required: true,
          default: Date.now 
        }
})

const collection = mongoose.model("collection",newSchema)

module.exports=collection
