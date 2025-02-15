import { Schema, model, Types } from "mongoose";

const volcanoSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required!"],
    minLength: 2
  },
  location: {
    type: String,
    required: [true, "Location is required!"],
    minLength: 3
  },
  elevation: {
    type: Number,
    required: [true, "Elevation is required!"],
    min: 0
  },
  lastEruption: {
    type: Number,
    required: [true, "Last eruption is required!"],
    min:0,
    max:2024
  },
  image: {
    type: String,
    required: [true, "Image is required!"],
    validate: /^https?:\/\//
  },
  typeVolcano: {
    type: String,
    required: [true, "Type of volcano is required!"],
    enum: [
      "Supervolcanoes",
      "Submarine",
      "Subglacial",
      "Mud",
      "Stratovolcanoes",
      "Shield",
    ],
  },
  description: {
    type: String,
    required: [true, "Description is required!"],
    minLength: 10
  },
  owner: {
    type: Types.ObjectId,
    ref: "User",
  },
  voteList: [{
    type: Types.ObjectId,
    ref: 'User'
  }]
});

const Volcano = model('Volcano', volcanoSchema);

export default Volcano;
