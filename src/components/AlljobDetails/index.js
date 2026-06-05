import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import JobItem from '../JobItem'
import './index.css'

const appConstants = {
  intial: 'INTIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  progress: 'PROGRESS',
}

class AlljobDetails extends Component {
  state = {
    jobDet: [],
    onStatus: appConstants.intial,
  }

  componentDidMount() {
    this.getDetails()
  }

  onSuccess = data => {
    if (data.jobs.length === 0) {
      this.setState({
        onStatus: appConstants.success,
        jobDet: [],
      })
      return
    }

    const updatedData = data.jobs.map(eachJob => ({
      companyLogoUrl: eachJob.company_logo_url,
      employmentType: eachJob.employment_type,
      id: eachJob.id,
      jobDescription: eachJob.job_description,
      location: eachJob.location,
      packagePerAnnum: eachJob.package_per_annum,
      rating: eachJob.rating,
      title: eachJob.title,
    }))

    this.setState({
      onStatus: appConstants.success,
      jobDet: updatedData,
    })
  }

  onFailure = () => {
    this.setState({
      onStatus: appConstants.failure,
    })
  }

  getDetails = async () => {
    this.setState({
      onStatus: appConstants.progress,
    })

    const {employmentType = [], salaryRange = '', searchInput = ''} = this.props

    const employment = employmentType ? employmentType.join(',') : ''

    const url = `https://apis.ccbp.in/jobs?employment_type=${employment}&minimum_package=${salaryRange}&search=${searchInput}`

    try {
      const jwtToken = Cookies.get('jwt_token')
      console.log('JWT:', jwtToken)

      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: 'GET',
      }

      const response = await fetch(url, options)
      const data = await response.json()

      if (response.ok) {
        this.onSuccess(data)
      } else {
        this.onFailure()
      }
    } catch (error) {
      this.onFailure()
    }
  }

  renderNoJobs = () => (
    <div className="failCon">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="failure"
      />
      <h1 className="homeHead">No Jobs Found</h1>
      <p className="homePara">We could not find any jobs. Try other filters.</p>
    </div>
  )

  renderSuccess = () => {
    const {jobDet} = this.state

    if (jobDet.length === 0) {
      return this.renderNoJobs()
    }

    return (
      <ul className="jobUl">
        {jobDet.map(each => (
          <JobItem details={each} key={each.id} />
        ))}
      </ul>
    )
  }

  renderFailure = () => (
    <div className="failCon">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure"
      />
      <h1 className="homeHead">Oops! Something Went Wrong</h1>
      <p className="homePara">
        We cannot seem to find the page you are looking for
      </p>
      <div>
        <button type="button" className="findBtn" onClick={this.getDetails}>
          Retry
        </button>
      </div>
    </div>
  )

  renderProgress = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderTotal = status => {
    switch (status) {
      case appConstants.success:
        return this.renderSuccess()
      case appConstants.failure:
        return this.renderFailure()
      case appConstants.progress:
        return this.renderProgress()
      default:
        return null
    }
  }

  render() {
    const {onStatus} = this.state
    return this.renderTotal(onStatus)
  }
}

export default AlljobDetails
