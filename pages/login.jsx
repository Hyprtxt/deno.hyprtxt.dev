import { h } from "https://x.lcas.dev/preact@10.5.12/mod.js"
import Layout from "./layout.jsx"

const Login = () => (
  <Layout>
    <h1>Login Here</h1>
    <form method="POST" action="/login">
      <div className="mb-3">
        <label htmlFor="loginEmail" className="form-label">
          Email address
        </label>
        <input
          name="email"
          type="email"
          className="form-control"
          id="loginEmail"
          aria-describedby="emailHelp"
        />
        <div id="emailHelp" className="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="loginPassword" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="loginPassword"
          name="password"
        />
      </div>
      <div className="mb-3 form-check">
        <input
          name="checkbox"
          type="checkbox"
          className="form-check-input"
          id="exampleCheck1"
        />
        <label className="form-check-label" htmlFor="exampleCheck1">
          Check me out, mmmmk
        </label>
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  </Layout>
)

export default Login
