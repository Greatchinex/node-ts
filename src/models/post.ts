import { createSchema, Type, typedModel } from "ts-mongoose";

// Other collections
import User from "./user";

const postSchema = createSchema(
  {
    title: Type.string(),
    content: Type.string(),
    category: Type.string(),
    creator: Type.ref(Type.objectId()).to("User", User),
    no_of_comments: Type.number({
      default: 0
    }),
    comments: Type.array().of({
      message: Type.string(),
      creator: Type.ref(Type.objectId()).to("User", User),
      createdAt: Type.date({ default: new Date() as any })
    })
  },
  { timestamps: true }
);

export default typedModel("Post", postSchema);
