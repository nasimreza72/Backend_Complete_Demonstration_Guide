import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true, minlength: 7 },
    name: { type: String, trim: true },
    avatar: {
      type: String,
      default: () => {
        const size = Math.round(Math.random() * 400 + 100);
        return `http://placekitten.com/${size}/${size}`;
      },
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

const User = model("user", userSchema);

export default User;
