import { useState } from "react";
import { FaSignInAlt } from "react-icons/fa"
import useAuth, { LoginData } from "../hooks/useAuth";
import checkFilledForms from "../helpers/checkFilledForms";

const Login = () => {

  const { login, loading, error } = useAuth();

  const [formData, setFormData] = useState<LoginData>({} as LoginData);
  const [errorSumbitting, setErrorSumbitting] = useState(false);
  const isEnabled = checkFilledForms(formData);

  const { email, password } = formData;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => { 
    
    const { name, value } = event.target;

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (event: React.FormEvent) => {

    event.preventDefault();    

    login(formData); 
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
            <button type="submit" disabled={loading || !isEnabled} className="btn btn-block text-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login