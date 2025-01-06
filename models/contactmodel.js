const mongoose= require("mongoose")

const contactschema=mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    },
    name:{
        type:String,
        required: [true,"please add the contact name"],
    },
   email:{
        type:String,
        required: [true,"please add contact email"],
    },
    phone:{
        type:String,
        required: [true,"please add contact number"],
    },
},
{
    timestamps:true
});
module.exports=mongoose.model("contact",contactschema);