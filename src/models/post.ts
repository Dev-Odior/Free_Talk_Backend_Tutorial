import mongoose from "mongoose";
import { CommentDoc } from "./comment";

export interface PostDoc extends mongoose.Document {
  title: string;
  content: string;
  images: Array<{ src: string }>;
  comments: Array<CommentDoc>;
}

export interface PostModel extends mongoose.Model<PostDoc> {
  build(dto: CreatePostDTO): PostDoc;
}

export interface CreatePostDTO {
  title: string;
  content: string;
  images: Array<{ src: string }>;
}

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    require: true,
  },

  images: [{ src: { type: String, required: true } }],

  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

// Comment , is how to refer to a different data base from another database
postSchema.statics.build = (createPostDto: CreatePostDTO) =>
  new Post(createPostDto);

const Post = mongoose.model<PostDoc, PostModel>("Post", postSchema);

export default Post;
