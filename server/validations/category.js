import { check} from "express-validator";


const categoryValidation = [
     check('category').notEmpty().withMessage('Category is required'),
  ];
  
  export { categoryValidation };