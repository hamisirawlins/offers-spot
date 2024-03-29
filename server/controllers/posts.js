import PostMessage from "../models/postMessage.js";
import mongoose from 'mongoose';


export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPostsBySearch = async (req,res)=>{
  const {searchQuery, tags} = req.query
  try {
    const title = new RegExp(searchQuery,'i');

    const posts = await PostMessage.find({$or:[{title},{tags:{$in:tags.split(',')}}]});

    res.json({data:posts});
  } catch (error) {
    res.status(404).json({message:error.message})
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage({...post,creator:req.userId,createdAt:new Date().toISOString()});
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No Post with that ID");
  const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, {
    new: true,
  });
  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No Post with that ID");

  await PostMessage.findByIdAndRemove(id);
  res.json({ message: 'Post deleted successfully' });
}

export const likePost = async (req, res) => {
  const { id } = req.params;

  //Check User Authentication Before Like
  if (!req.userId) return res.json({message:"Unauthenticated"});

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No Post with that ID");

  const post = await PostMessage.findById(id);

  //Check if User Already Liked 
  const index = post.likes.findIndex((id)=>id ===String(req.userId));


  if (index=== -1) {
    //Like the Post
    post.likes.push(req.userId); 
  } else {
    //Dislike the Post
    post.likes= post.likes.filter((id)=>id!==String(req.userId));
  }
  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true })
  res.status(200).json(updatedPost);
}
