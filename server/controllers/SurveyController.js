import asyncHandler from "../utils/AsyncHandler.js";
import { User, Banner, CategorySurvey, SpecificSurvey  } from "../model/index.js"
import { AppError } from "../utils/ApiErrors.js";
import { successResponse } from "../utils/responseHandler.js";


export const createCategorySurvey = asyncHandler(async (req, res) => {
  const { name } = req.body;
  
  let file = null;
  if(req.file > 0){
   file =   req.file.path;
  }else{
    throw new AppError("Please upload file!")
  }

  if (!name) throw new AppError("Name is required", 400);

  const survey = await CategorySurvey.create({
    name,
    user_id: req.user.id,
    logo_path: file || null,
  });

  return successResponse(res, "CategorySurvey created successfully!", survey);
});

// ✅ Update CategorySurvey
export const updateCategorySurvey = asyncHandler(async (req, res) => {
  const { id, name, onlyFetch = false } = req.body;

  const survey = await CategorySurvey.findByPk(id);
  if (!survey) throw new AppError("CategorySurvey not found", 404);
  if(onlyFetch === true || onlyFetch === 'true'){
    return successResponse(res, "Fetch Successfully", survey)
  }
  survey.name = name ?? survey.name;
  survey.user_id = req.user.id ?? survey.user_id;
  survey.logo_path = req.file.path ?? survey.logo_path;

  await survey.save();

  return successResponse(res, "CategorySurvey updated successfully!", survey);
});

// ✅ Delete CategorySurvey
export const deleteCategorySurvey = asyncHandler(async (req, res) => {
  const { id } = req.query;

  const survey = await CategorySurvey.findByPk(id);
  if (!survey) throw new AppError("CategorySurvey not found", 404);

  await survey.destroy();

  return successResponse(res, "CategorySurvey deleted successfully!");
});

export const createBanner = asyncHandler(async (req, res) => {
  const { name, specific_survey_id } = req.body;
  if (!name) throw new AppError("Name is required", 400);
  const category_survey = await SpecificSurvey.findOne({ where: { id: specific_survey_id }})
  const userId = req.user.id;
  const banner = await Banner.create({
    name,
    user_id: userId,
    image_path: req.file?.path || null,
    category_survey_id: category_survey.id,
    specific_survey_id: specific_survey_id,
  });

  return successResponse(res, "Banner created successfully!", banner);
});

export const updateBanner = asyncHandler(async (req, res) => {
  const { name, id, image_path,specific_survey_id } = req.body;

  const banner = await Banner.findByPk(id);
  if (!banner) throw new AppError("Banner not found", 404);
    const category_survey = await SpecificSurvey.findOne({ where: { id: specific_survey_id }})
  banner.name = name ?? banner.name;
  banner.user_id = user_id ?? banner.user_id;
  banner.image_path = req.file?.path ?? banner.image_path;
  banner.category_survey_id = category_survey ?? banner.category_survey_id;
  banner.specific_survey_id = specific_survey_id ?? banner.specific_survey_id;

  await banner.save();

  return successResponse(res, "Banner updated successfully!", banner);
});

export const deleteBanner = asyncHandler(async (req, res) => {
  const { id } = req.query;
  const banner = await Banner.findByPk(id);
  if (!banner) throw new AppError("Banner not found", 404);
  await banner.destroy();
  return successResponse(res, "Banner deleted successfully!");
});

