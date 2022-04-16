import React, { useState } from "react"
import { FaUser } from "react-icons/fa"
import { register } from "../hooks/useAuth"
export interface RegisterData {
  name: string,
  email: string,
  password: string,
  password2: string,
}

const Register = () => {

  const initialState: RegisterData = {
    name: '',
    email: '',
    password: '',
    password2: ''
  }

  const [formData, setFormData] = useState<RegisterData>(initialState);
  const [isActive, setIsActive] = useState(false);

  const { name, email, password, password2 } = formData;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [event.target.name]: event.target.value,
    }))
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (formData.password === formData.password2) {
      const responseAfterRegister = register(formData)
        .then(data => console.log(data))
        .catch(err => console.log(err));
    } else {
      if (!isActive) {
        setIsActive(prev => !prev);
  
        setTimeout(() => setIsActive(prev => !prev), 3000);
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
              id="password2"
              name="password2"
              value={password2}
              placeholder="Confirm your password"
              onChange={handleChange} />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block text-block">Submit</button>
          </div>
        </form>
        {isActive && <div className="error-message text-block">
            Passwords do not match
        </div>}
      </section>
    </>
  )
}

export default Register