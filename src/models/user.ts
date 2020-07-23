import { createSchema, Type, typedModel } from "ts-mongoose";

const userSchema = createSchema(
  {
    full_name: Type.string(),
    email: Type.string(),
    phone_number: Type.string(),
    age: Type.number()
  },
  { timestamps: true }
);

export default typedModel("User", userSchema);
