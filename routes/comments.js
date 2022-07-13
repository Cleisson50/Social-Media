const router = require ("express").Router();
const Comment = require("../models/Comment");

//create a comment
router.post("/", async (req, res)=>{
    const newComment = new Comment(req.body)
    try{
        const savedComment = await newComment.save();
        res.status(200).json(savedComment);
    }catch(err){
        res.status(500).json(err);
    }
});

//update a comment
router.put("/:id", async (req, res) => {
   try{

    const comment = await Comment.findById(req.params.id);
    if(comment.userId === req.body.userId) {
        await comment.updateOne({$set:req.body});
        res.status(200).json("the comment has been update")
    } else{
        res.status(403).json("you can update only your comment");
    }
   } catch(err){
       res.status(500).json(err);
   }
});

//delete comment
router.delete("/:id", async (req, res) => {
    try{
 
     const comment = await Comment.findById(req.params.id);
     if(comment.userId === req.body.userId) {
         await comment.deleteOne();
         res.status(200).json("the comment has been delete")
     } else{
         res.status(403).json("you can delete only your comment");
     }
    } catch(err){
        res.status(500).json(err);
    }
 });

module.exports = router;