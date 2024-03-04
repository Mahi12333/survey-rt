import { check} from "express-validator";


const subcategoryValidation = [
     check('category').notEmpty().withMessage('Category is required'),
     check('subcategory').notEmpty().withMessage('SubCategory is required'),
  ];
  
  export { subcategoryValidation };