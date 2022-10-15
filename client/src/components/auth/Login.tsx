import React, { useState } from 'react'
import { IUser } from '../../interfaces/Interface';

function Login() {


  const [loginInput, setLoginInput] = useState<IUser>({ email: "", password: ""});

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const User = loginInput;
    console.log(User);
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setLoginInput({ ...loginInput, [e.currentTarget.name]: e.target.value });
  }

  return (
    <div className="login">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Log In</h1>
            <p className="lead text-center">Sign in to your DevConnector account</p>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input type="email"
                  className="form-control form-control-lg"
                  placeholder="Email Address"
                  name="email"
                  value={loginInput.email}
                  onChange={onChange} />
              </div>
              <div className="form-group">
                <input type="password"
                  className="form-control form-control-lg"
                  placeholder="Password"
                  name="password"
                  value={loginInput.password}
                  onChange={onChange} />
              </div>
              <input type="submit" className="btn btn-info btn-block mt-4" value="Submit"/>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login