import mongoose from "mongoose";

const BookmarkSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    specifi_survey_id: { type: mongoose.Schema.Types.ObjectId, ref: "SpecificSurvey", default: null },
    type: {
      type: String,
      enum: ["bookmark", "like"],
      default: "like",
    },
  },
  { timestamps: true, collection: "tbl_bookmark" }
);

export default mongoose.model("Bookmark", BookmarkSchema);
