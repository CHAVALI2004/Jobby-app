import {Component} from 'react'
import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

class Home extends Component {
  render() {
    return (
      <div className="homeCon">
        <Header />

        <div className="home">
          <h1 className="homeHead">Find The Job That Fits Your Life</h1>

          <p className="homePara">
            Millions of people are searching for jobs, salary information,
            company reviews. Find the job that fits your abilities and
            potential.
          </p>

          <Link to="/jobs" className="navLink">
            <button type="button" className="findBtn">
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    )
  }
}

export default Home
