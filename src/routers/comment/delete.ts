import { Router, Response, Request, NextFunction } from "express";
import Post from "../../models/post";
import Comment from "../../models/comment";
import { BadRequestError } from "../../../common";

const router = Router();

router.delete(
  "/api/comment/:commentId/delete/:postId",
  async (req: Request, res: Response, next: NextFunction) => {
    const { commentId, postId } = req.params;

    if (!commentId || !postId) {
      return next(
        new BadRequestError("post id and comment id are both required")
      );
    }

    try {
      await Comment.findOneAndDelete({ _id: commentId });
    } catch (err) {
      next(new Error("comment cannot be updated!"));
    }

    await Post.findOneAndUpdate(
      { _id: postId },
      { $pull: { comments: commentId } }
    );

    res.status(200).json({ success: true });
  }
);

export { router as deleteCommentRouter };
