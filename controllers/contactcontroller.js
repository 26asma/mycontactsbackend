const asynchandler =require("express-async-handler");
const Contact=require("../models/contactmodel");
const contactmodel = require("../models/contactmodel");
//@desc get all contact
//@route GET /api/contacts
//@acess private
const getcontacts=asynchandler(async(req, res) => {
    const contacts=await Contact.find({user_id:req.user.id});
    res.status(200).json(contacts);
});

//@desc create contact
//@route post /api/contacts
//@acess private
const createcontact=asynchandler(async(req, res) => {
    const {name,email,phone}=req.body;
    if(!name ||!email || !phone){
        res.status(400);
        throw new Error("all fields are required")
    }
    const contact = await Contact.create({ 
      name,
      email,
      phone, 
      user_id:req.user.id 
    })
    
    res.status(201).json({contact})
});


//@descget a individual contact
//@route get /api/contacts/id
//@acess private
const getcontact=asynchandler(async(req, res) => {
    const contact= await Contact.findById(req.params.id);
    if(!contact){
      res.status(404)  ;
      throw new Error("contact not found");
    }
 

    res.status(201).json(contact)
});
//@desc update contact
//@route put /api/contacts/id
//@acess private
const updatecontact=asynchandler(async(req, res) => {
    const contact= await Contact.findById(req.params.id);
    if(!contact){
      res.status(404)  ;
      throw new Error("contact not found");
    }
    if(contact.user_id.toString()!== req.user.id){
        res.status(403);
        throw new Error("you cant change contact of diffrent user")
    }
    const updatedcontact= await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,{
            new:true
        }
    )

    res.status(201).json(updatedcontact)
});
 
//@desc delete contact
//@routedelete /api/contacts/id
//@acess  private
const deletecontact=asynchandler(async(req, res) => {
    const contact= await Contact.findById(req.params.id);
    if(!contact){
        res.status(404)  ;
        throw new Error("contact not found");
      }
      if(contact.user_id.toString()!== req.user.id){
        res.status(403);
        throw new Error("you cant del contact of diffrent user")
    }
    await Contact.deleteOne({ _id: req.params.id });
    res.status(204).json(contact)
});
module.exports={getcontacts,getcontact, createcontact,updatecontact,deletecontact}