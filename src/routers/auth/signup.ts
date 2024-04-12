import { Router, Request, Response, NextFunction } from "express";
import { User } from "../../models/user";
const router = Router();
import jwt from "jsonwebtoken";
import { BadRequestError, validateRequest } from "../../../common";
import { body } from "express-validator";

router.post(
  "/signup",
  [
    body("email")
      .not()
      .isEmpty()
      .isEmail()
      .withMessage("Please provide a valid email"),

    body("password")
      .not()
      .isEmpty()
      .isLength({ min: 6 })
      .withMessage("A valid password is required"),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return next(
        new BadRequestError("user with the same email already exist")
      );
    }

    const newUser = User.build({
      email,
      password,
    });

    await newUser.save();

    req.session = {
      jwt: jwt.sign({ email, userId: newUser._id }, process.env.JWT_KEY!),
    };

    res.status(201).send(newUser);
  }
);

export { router as signupRouter };
