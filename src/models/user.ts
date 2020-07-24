import { NextFunction } from "express";
import { createSchema, Type, typedModel } from "ts-mongoose";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

// Import other collections
import Post from "./post";

dotenv.config();

const userSchema = createSchema(
  {
    full_name: Type.string(),
    email: Type.string(),
    phone_number: Type.string(),
    age: Type.number(),
    password: Type.string(),
    created_posts: Type.array().of(Type.ref(Type.objectId()).to("Post", Post)),
    no_of_posts: Type.number({
      default: 0
    })
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next: NextFunction) {
  if (this.isModified("password")) {
    this.password = await this.hashPass(this.password);
  }

  next();
});

userSchema.methods = {
  // Sign user token
  jwtToken: function (): any {
    return jwt.sign({ userId: this._id }, process.env.JWT_SECRET);
  },

  // hash password
  hashPass: async function (password): Promise<any> {
    return await bcrypt.hash(password, 12);
  },

  // Verify user password
  verifyPass: async function (password): Promise<any> {
    let cp = await bcrypt.compare(password, this.password);

    return cp;
  }
};

export default typedModel("User", userSchema);
