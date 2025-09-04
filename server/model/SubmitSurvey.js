import mongoose from "mongoose";

const SubmitSurveySchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    specifi_survey_id: { type: mongoose.Schema.Types.ObjectId, ref: "SpecificSurvey", required: true },
    category_survey_id: { type: mongoose.Schema.Types.ObjectId, ref: "CategorySurvey", default: null },
    total_marks: { type: Number, default: null },
    score: { type: Number, required: true },
    answer: { type: Array, default: [] },
    status: {
      type: String,
      enum: ["Pending", "Complate"],
      default: "Pending",
    },
  },
  { timestamps: true, collection: "tbl_submit_survey" }
);

export default mongoose.model("SubmitSurvey", SubmitSurveySchema);
