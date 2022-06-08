import Validator from "validator";
import isEmpty from "./is-empty";
import { IDataInputs, IErrors, IProfile } from "../interfaces/Interface";

const validateProfileInput = (data: IProfile & IDataInputs) => {
    let errors: IErrors = {};

    data.handle = !isEmpty(data.handle) ? data.handle : '';
    data.status = !isEmpty(data.status) ? data.status : '';
    data.skills = !isEmpty(data.skills) ? data.skills : [];

    if(!Validator.isLength(data.handle, {min: 2, max: 40})) {
        errors.handle = "Handle needs to be between 2 and 40 characters";
    };

    if(Validator.isEmpty(data.handle)) {
        errors.handle = "Profile handle is required";
    };

    if(Validator.isEmpty(data.status)) {
        errors.status = "Status field is required";
    };

    if(isEmpty(data.skills)) {
        errors.skills = "Skills field is required";
    };

    if(!isEmpty(data.website)) {
        if(!Validator.isURL(data.website)) {
            errors.url = "This is not a valid url";
        }
    }

    if(!isEmpty(data.youtube)) {
        if(!Validator.isURL(data.youtube)) {
            errors.url = "This is not a valid url";
        }
    }

    if(!isEmpty(data.twitter)) {
        if(!Validator.isURL(data.twitter)) {
            errors.url = "This is not a valid url";
        }
    }

    if(!isEmpty(data.facebook)) {
        if(!Validator.isURL(data.facebook)) {
            errors.url = "This is not a valid url";
        }
    }

    if(!isEmpty(data.linkedin)) {
        if(!Validator.isURL(data.linkedin)) {
            errors.url = "This is not a valid url";
        }
    }

    if(!isEmpty(data.instagram)) {
        if(!Validator.isURL(data.instagram)) {
            errors.url = "This is not a valid url";
        }
    }

    return {
        errors, isValid: isEmpty(errors)
    };
};

export default validateProfileInput;