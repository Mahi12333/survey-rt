import mongoose from "mongoose";

const BannerSchema = new mongoose.Schema(
  {
    name: { type: String, default: null },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    image_path: { type: String, default: null },
    category_survey_id: { type: mongoose.Schema.Types.ObjectId, ref: "CategorySurvey", default: null },
    specific_survey_id: { type: mongoose.Schema.Types.ObjectId, ref: "SpecificSurvey", default: null },
  },
  { timestamps: true, collection: "tbl_banners" }
);

export default mongoose.model("Banner", BannerSchema);
