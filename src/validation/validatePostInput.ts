import Validator from "validator";
import isEmpty from "./is-empty";
import { IDataInputs, IErrors } from "../interfaces/Interface";

const validatePostInput = (data: IDataInputs) => {
    let errors: IErrors = {};

    data.text = !isEmpty(data.text) ? data.text : '';
    
    if(!Validator.isLength(data.text, {min: 10, max: 300})) {
        errors.text = "Post must be between 10 and 300 characters";
    };

    if(Validator.isEmpty(data.text)) {
        errors.text = "Text field is required";
    }

    

    return {
        errors, isValid: isEmpty(errors)
    };
};

export default validatePostInput;