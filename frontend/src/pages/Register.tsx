import React, { useState } from "react"
import { FaUser } from "react-icons/fa"
import { register } from '../api/users'

export interface User {
  name: string,
  email: string,
  password: string,
}

interface RegisterData {
  user: User,
  passwordConfirmation: string,
}

const Register = () => {

  const initialState: RegisterData = {
    user: {
      name: '',
      email: '',
      password: ''
    },
    passwordConfirmation: ''
  }

  const [formData, setFormData] = useState<RegisterData>(initialState);
  const [errorIsActive, setErrorIsActive] = useState(false);

  const { user, passwordConfirmation } = formData;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    const eventName = event.target.name;

    if (eventName == 'name' || eventName == 'email' || eventName == 'password') {
      setFormData(prev => ({
        user: {
          ...prev.user,
          [eventName]: event.target.value
        },
        passwordConfirmation: prev.passwordConfirmation
      }));
    } else {
      setFormData(prev => ({
        user: prev.user,
        passwordConfirmation: event.target.value
      }));
    }
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (user.password === passwordConfirmation) {
      const responseAfterRegister = register(user)
        .then(data => console.log(data))
        .catch(err => console.log(err));
    } else {
      if (!errorIsActive) {
        setErrorIsActive(prev => !prev);

        setTimeout(() => setErrorIsActive(prev => !prev), 3000);
      }
    }
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>

      <section className="form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={user.name}
              placeholder="Enter your name"
              onChange={handleChange} />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={user.email}
              placeholder="Enter your email"
              onChange={handleChange} />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={user.password}
              placeholder="Enter your password"
              onChange={handleChange} />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password2"
              name="password2"
              value={passwordConfirmation}
              placeholder="Confirm your password"
              onChange={handleChange} />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block text-block">Submit</button>
          </div>
        </form>
        {errorIsActive && <div className="error-message text-block">
          Passwords do not match
        </div>}
      </section>
    </>
  )
}

export default Register