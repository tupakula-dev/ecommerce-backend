const express = require("express");
const productrouter = express.Router();
const Product = require("../models/Product");
productrouter.post("/newproduct",async(req,res)=>{
    try{
        const product=await Product.insertMany(req.body);
        //await product.save();
        res.status(201).json(product)

    }catch(err){
        res.status(400).json({error:err.message});


    }
});
productrouter.get("/getall",async(req,res)=>{
    try{
        const products=await Product.find();
        res.json(products);

    }catch(err){
        res.status(400).json({error:err.message});

    }
});
productrouter.get("/product/:id",async(req,res)=>{
    try{
        const product=await Product.findById(req.params.id);
        res.json(product);

    }catch(err){
        res.status(400).json({error:err.message});
    }
});
productrouter.put("/product/update/:id",async(req,res)=>{
    try{
        const product=await Product.findByIdAndUpdate( req.params.id,req.body,{ new: true } );
        res.json(product);

    }catch(err){
        res.status(400).json({error:err.message});
    }
});
productrouter.delete("/product/update/:id",async(req,res)=>{
    try{
        await Product.findByIdAndDelete( req.params.id );
        res.json({message:"Product Deleted SUccesfully"});

    }catch(err){
        res.status(400).json({error:err.message});
    }
});
productrouter.get("/search",async(req,res)=>{
    const query=req.query.q;
    try{
        const product=await Product.find({
            $or: [
                { name: { $regex: query, $options: "i" } },
                { category: { $regex: query, $options: "i" } },
                { description: { $regex: query, $options: "i" } }
              ]
        });
        res.json(product);


    }catch(err){
        res.status(400).json({error:err.message});

    }
})
module.exports=productrouter;

