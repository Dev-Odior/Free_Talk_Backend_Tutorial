import { authenticationService } from "../../common";
import mongoose from "mongoose";
import { PostDoc } from "./post";

export interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
  posts?: Array<PostDoc>;
}

export interface CreateUserDto {
  email: string;
  password: string;
}

export interface UserModel extends mongoose.Model<UserDoc> {
  build(dto: CreateUserDto): UserDoc;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    require: true,
  },

  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});

userSchema.pre("save", async function (done) {
  if (this.isModified("password") || this.isNew) {
    const password = this.get("password");
    if (typeof password === "string") {
      const hashedPassword = authenticationService.pwdToHash(password);
      this.set("password", hashedPassword);
    }
  }

  done();
});

userSchema.statics.build = (createUserDto: CreateUserDto) => {
  return new User(createUserDto);
};

export const User = mongoose.model<UserDoc, UserModel>("User", userSchema);
