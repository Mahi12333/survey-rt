import mongoose from "mongoose";

const SpecificSurveySchema = new mongoose.Schema(
  {
    name: { type: String, default: null },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    image_path: { type: String, default: null },
    category_survey_id: { type: mongoose.Schema.Types.ObjectId, ref: "CategorySurvey", default: null },
    description: { type: String, default: null },
    survey_date: { type: Date, default: Date.now },
    survey_question: { type: Array, default: [] }, // Store JSON array
  },
  { timestamps: true, collection: "tbl_specific_survey" }
);

export default mongoose.model("SpecificSurvey", SpecificSurveySchema);
