import Validator from "validator";
import isEmpty from "./is-empty";
import { IDataInputs, IErrors } from "../interfaces/Interface";

const validateRegisterInput = (data: IDataInputs) => {
    let errors: IErrors = {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';

    if(!Validator.isLength(data.name, {min: 2, max: 30} as Validator.IsLengthOptions)) {
        errors.name = "Name must be between 2 and 30 characters";
    };

    if(Validator.isEmpty(data.name)) {
        errors.name = "Name field is required";
    };

    if(Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    };

    if(!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    };

    if(Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    };

    if(!Validator.isLength(data.password, {min: 6, max: 30} as Validator.IsLengthOptions)) {
        errors.password = "Password must be between 6 and 30 characters";
    };

    if(Validator.isEmpty(data.password2!)) {
        errors.password2 = "Confirm password is required";
    };

    if(!Validator.equals(data.password, data.password2!)) {
        errors.password2 = "Confirm password does not match";
    };

    return {
        errors, isValid: isEmpty(errors)
    };
};

export default validateRegisterInput;