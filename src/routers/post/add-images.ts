import { Router, Request, Response, NextFunction } from "express";
import { uploadImages, BadRequestError } from "../../../common";
import Post from "../../models/post";
import path from "path";
import fs from "fs";

const router = Router();

router.post(
  "/post/:id/add/images",
  uploadImages,
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!req.files) {
      return next(new BadRequestError("Please upload images"));
    }

    let images: Array<Express.Multer.File>;

    if (typeof req.files === "object") {
      images = Object.values(req.files);
    } else {
      images = req.files ? [...req.files] : [];
    }

    const imagesArray = images.map((file: Express.Multer.File) => {
      let srcObj = {
        src: `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
      };
      fs.unlink(path.join("upload/" + file.filename), () => {});
      return srcObj;
    });

    const post = await Post.findOneAndUpdate(
      { _id: id },
      { $push: { images: { $each: imagesArray } } }
    );

    res.status(200).send(post);
  }
);

export { router as addImagesRouter };
