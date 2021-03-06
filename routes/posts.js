const router = require ("express").Router();
const Post = require("../models/Post");

//create a post
router.post("/", async (req, res)=>{
    const newPost = new Post(req.body)
    try{
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    }catch(err){
        res.status(500).json(err);
    }
});

//update a post
router.put("/:id", async (req, res) => {
   try{

    const post = await Post.findById(req.params.id);
    if(post.userId === req.body.userId) {
        await post.updateOne({$set:req.body});
        res.status(200).json("the post has been update")
    } else{
        res.status(403).json("you can update only your post");
    }
   } catch(err){
       res.status(500).json(err);
   }
});

//delete post
router.delete("/:id", async (req, res) => {
    try{
 
     const post = await Post.findById(req.params.id);
     if(post.userId === req.body.userId) {
         await post.deleteOne();
         res.status(200).json("the post has been delete")
     } else{
         res.status(403).json("you can delete only your post");
     }
    } catch(err){
        res.status(500).json(err);
    }
 });

module.exports = router;