import { mongoose } from "mongoose";
import PostMessage from "../models/postMessage.js"

export const getPost = async (req, res) => {
    try {
        const postMessage = await PostMessage.find();
        res.status(200).json(postMessage);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


export const createPost = async (req, res) => {
    const post = req.body
    const options = { timeZone: 'Asia/Kolkata' };
    const currentISTDateTime = new Date().toLocaleString('en-US', options);
    console.log(post)
    const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: currentISTDateTime });

    try {
        await newPost.save();
        res.status(200).json(newPost)
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const { id: _id } = req.params
    const post = req.body
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send({ message: 'Invalid post id' });
    } else {
        // new : true return the doc after update and if false then return the doc before update
        const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, { new: true })
        return res.json(updatedPost)
    }

}

export const deletePost = async (req, res) => {
    const { id: _id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(404).send({ message: 'Invalid post id' })
        }
        else {
            const post = await PostMessage.findById(_id)
            if (!post) {
                return res.status(404).send({ message: 'Id not found' });
            }
            else {
                await PostMessage.findOneAndDelete(_id)
                return res.json({ message: 'Post deleted successfully' })
            }
        }
    } catch (error) {
        return res.status(404).send({ message: error.message })
    }
}



export const likePost = async (req, res) => {
    const { id } = req.params
    try {
        if (!req.userId) {
            return res.status(404).send({ message: "Unauthenticated" })
        } else {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(404).send({ message: 'Something went wrong' })
            }
            else {
                const post = await PostMessage.findById(id);
                if (!post) {
                    return res.status(404).send({ message: 'This id does not exist' })
                }
                else {
                    const index = post.likes.findIndex((id) => id === String(req.userId))
                    if (index === -1) {
                        // like post
                        post.likes.push(req.userId)
                    } else {
                        // dislike the post
                        post.likes === post.likes.filter((id) => id !== String(req.userId))

                    }
                    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
                    return res.json(updatedPost)
                }
            }
        }
    } catch (error) {
        return res.status(404).send({ message: error.message });
    }
}

export const getPostBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query
    try {
        // i stands for if u are searching text, Test TeSt it means these are same 
        const title = new RegExp(searchQuery, 'i')
        // or serach in title or tags and in search inside array of tag
        const posts = await PostMessage.find({ $or: [{ title }, { tags: { $in: tags.split(',') } }] });
        res.json({ data: posts })
    } catch (error) {
        res.status(404).send({ message: error.message });
    }
}

export const getPostPagination = async (req, res) => {
    const { page } = req.query
    try {
        // per page data
        const LIMIT = 2
        const startIndex = (Number(page) - 1) * LIMIT
        const total = await PostMessage.countDocuments({});
        const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex)
        res.status(200).json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) })

    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}


export const getPostById = async (req, res) => {
    console.log("first")
    const { id } = req.params
    try {
        const post = await PostMessage.findById(id)
        res.status(200).json(post)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const commentPost = async (req, res) => {
    const { id } = req.params
    const { comments } = req.body
    try {
        const post = await PostMessage.findById(id)
        if (!post) {
            res.status(404).json({ message: "Post not found" })
        } else {
            post.comments.push(comments)
            const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true })
            res.status(200).json(updatedPost)
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}