import axios from 'axios';
import classnames from 'classnames';
import React, { useState } from 'react'
import { IErrors, IUser } from '../../interfaces/Interface'

// export default function Register: FC<IProps>(): ReactElement
export default function Register() {

    type RegisterInput = Required<IUser>;
    type RegisterErrors = Partial<IErrors>;
    // TODO: Errors should be its own interface
    const [registerInput, setRegisterInput] = useState<RegisterInput>({name: "", email: "", password: "", password2: ""});
    const [errors, setErrors] = useState<RegisterErrors>({});

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const newUser = registerInput;
        axios.post('api/users/register', newUser)
        .then(res => console.log(res.data))
        .catch(err => setErrors(err.response.data));
        
    }

    console.table(errors);

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        setRegisterInput({...registerInput, [e.currentTarget.name]: e.target.value});
    }

    return (
        <div className="register">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">Sign Up</h1>
                        <p className="lead text-center">Create your DevConnector account</p>
                        <form noValidate onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input type="text"
                                    className={classnames('form-control form-control-lg', {
                                        'is-invalid': errors.name
                                    })}
                                    placeholder="Name"
                                    name="name"
                                    value={registerInput.name}
                                    onChange={onChange} />
                                {errors.name && (<div className='invalid-feedback'>{errors.name}</div>)}
                            </div>
                            <div className="form-group">
                                <input type="email"
                                    className={classnames('form-control form-control-lg', {
                                        'is-invalid': errors.email
                                    })}
                                    placeholder="Email Address"
                                    name="email"
                                    value={registerInput.email}
                                    onChange={onChange} />
                                {errors.email && (<div className='invalid-feedback'>{errors.email}</div>)}
                                <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
                            </div>
                            <div className="form-group">
                                <input type="password"
                                    className={classnames('form-control form-control-lg', {
                                        'is-invalid': errors.password
                                    })} 
                                    placeholder="Password"
                                    name="password"
                                    value={registerInput.password}
                                    onChange={onChange} />
                                {errors.password && (<div className='invalid-feedback'>{errors.password}</div>)}
                            </div>
                            <div className="form-group">
                                <input type="password"
                                    className={classnames('form-control form-control-lg', {
                                        'is-invalid': errors.password2
                                    })}
                                    placeholder="Confirm Password"
                                    name="password2"
                                    value={registerInput.password2}
                                    onChange={onChange} />
                                {errors.password2 && (<div className='invalid-feedback'>{errors.password2}</div>)}
                            </div>
                            <input type="submit" className="btn btn-info btn-block mt-4" value="Submit"/>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
