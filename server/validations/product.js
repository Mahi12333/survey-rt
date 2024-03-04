import { check} from "express-validator";


const productValidation = [
     check('category').notEmpty().withMessage('Category is required'),
     check('subcategory').notEmpty().withMessage('SubCategory is required'),
     check('product').notEmpty().withMessage('Product Name  is required'),
     check('org_price').notEmpty().withMessage('Original Price  is required'),
     check('discount').notEmpty().withMessage('Discount Price  is required'),
     check('checkbox').notEmpty().withMessage('check Box  is required'),
  ];
  
  export { productValidation };