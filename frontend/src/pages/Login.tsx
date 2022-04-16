import { useState } from "react";
import { FaSignInAlt } from "react-icons/fa"
import { login } from "../hooks/useAuth";

export interface LoginData {
  email: string,
  password: string,
}

const Login = () => {
  const initialState: LoginData = {
    email: '',
    password: '',
  }

  const [formData, setFormData] = useState<LoginData>(initialState);

  const { email, password } = formData;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {   

    setFormData(prev => ({
      ...prev,
      [event.target.name]: event.target.value,
    }))
  }

  const handleSubmit = (event: React.FormEvent) => {

    event.preventDefault();    

    const responseAfterLogin = login(formData)
      .then(user => console.log(user))
      .catch(err => console.log(err));    
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Log in to your account</p>
      </section>

      <section className="form">
        <form onSubmit={handleSubmit}>
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
            <button type="submit" className="btn btn-block text-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login