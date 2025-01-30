import mongoose, { Schema } from "mongoose";

export type UserType = {
  name: string;
  email: string;
  age?: number;
  mobile: string;
  interests: string[];
  isDeleted?: boolean;
};

export enum Interests {
  Sports = "Sports",
  Music = "Music",
  Reading = "Reading",
  Coding = "Coding",
  Cooking = "Cooking",
  Gardening = "Gardening",
  Travelling = "Travelling",
  Dancing = "Dancing",
}

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
  },
  mobile: {
    type: Number,
    required: true,
    unique: true,
  },
  interests: {
    type: [String],
    enum: Object.values(Interests),
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model<UserType>("User", UserSchema);
