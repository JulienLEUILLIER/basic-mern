import React, { useState, useEffect } from "react"
import { FaUser } from "react-icons/fa"
import useAuth from '../hooks/useAuth';
import checkFilledForms from "../helpers/checkFilledForms";

export interface RegisterDataWithConfirmation {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

const Register = () => {


  const [formData, setFormData] = useState<RegisterDataWithConfirmation>({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  });
  const [errorSubmitting, setErrorSubmitting] = useState(false);

  const { register, loading, error } = useAuth();
  const { name, email, password, passwordConfirmation } = formData;
  const isEnabled = checkFilledForms(formData);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    const { name, value } = event.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (password === passwordConfirmation) {

      const { passwordConfirmation, ...userData } = formData;

      register(userData);
    } else {
      setErrorSubmitting(true);
      setTimeout(() => { setErrorSubmitting(false) }, 3000);
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
              value={name}
              placeholder="Enter your name"
              onChange={handleChange} />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={handleChange} />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={handleChange} />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="passwordConfirmation"
              name="passwordConfirmation"
              value={passwordConfirmation}
              placeholder="Confirm your password"
              onChange={handleChange} />
          </div>
          <div className="form-group">
            <button type="submit" disabled={loading || !isEnabled} className="btn btn-block text-block">Submit</button>
          </div>
        </form>
        {errorSubmitting && <div className="error-message text-block">
          Passwords do not match
        </div>}
      </section>
    </>
  )
}

export default Register