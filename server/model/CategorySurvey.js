import mongoose from "mongoose";

const CategorySurveySchema = new mongoose.Schema(
  {
    name: { type: String, default: null },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    logo_path: { type: String, default: null },
  },
  { timestamps: true, collection: "tbl_category_survey" }
);

export default mongoose.model("CategorySurvey", CategorySurveySchema);
