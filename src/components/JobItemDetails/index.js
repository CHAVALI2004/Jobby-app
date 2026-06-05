import {Component} from 'react'
import Cookies from 'js-cookie'
import {FaStar, FaBriefcase, FaExternalLinkAlt} from 'react-icons/fa'
import {IoLocationOutline} from 'react-icons/io5'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import SkillList from '../SkillList'
import SimilarList from '../SimilarList'
import './index.css'

const appConstants = {
  intial: 'INTIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  progress: 'PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    data: {},
    similarJobs: [],
    onStatus: appConstants.intial,
  }

  componentDidMount() {
    this.getDetails()
  }

  onSuccess = data => {
    const updatedJobDetails = {
      title: data.job_details.title,
      companyLogoUrl: data.job_details.company_logo_url,
      companyWebsiteUrl: data.job_details.company_website_url,
      employmentType: data.job_details.employment_type,
      id: data.job_details.id,
      jobDescription: data.job_details.job_description,
      location: data.job_details.location,
      packagePerAnnum: data.job_details.package_per_annum,
      rating: data.job_details.rating,
      skills: data.job_details.skills.map(eachSkill => ({
        imageUrl: eachSkill.image_url,
        name: eachSkill.name,
      })),
      lifeAtCompany: {
        description: data.job_details.life_at_company.description,
        imageUrl: data.job_details.life_at_company.image_url,
      },
    }

    const updatedSimilarJobs = data.similar_jobs.map(eachJob => ({
      companyLogoUrl: eachJob.company_logo_url,
      employmentType: eachJob.employment_type,
      id: eachJob.id,
      jobDescription: eachJob.job_description,
      location: eachJob.location,
      rating: eachJob.rating,
      title: eachJob.title,
    }))

    this.setState({
      data: updatedJobDetails,
      similarJobs: updatedSimilarJobs,
      onStatus: appConstants.success,
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

    try {
      const jwtToken = Cookies.get('jwt_token')

      const {match} = this.props
      const {id} = match.params

      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: 'GET',
      }

      const url = `https://apis.ccbp.in/jobs/${id}`

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

  renderSuccess = () => {
    const {data, similarJobs} = this.state

    const {
      employmentType,
      companyWebsiteUrl,
      companyLogoUrl,
      location,
      packagePerAnnum,
      rating,
      title,
      jobDescription,
      skills = [],
      lifeAtCompany = {},
    } = data

    return (
      <div className="detailCon">
        <Header />

        <div className="itemCon1">
          <div className="topCon">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="imgLogo"
            />

            <div>
              <h1 className="topHead">{title}</h1>

              <div className="topCon">
                <FaStar className="star" />
                <p className="topPara">{rating}</p>
              </div>
            </div>
          </div>

          <div className="midCon">
            <div className="topCon">
              <IoLocationOutline className="star1" />
              <p className="topPara1">{location}</p>

              <FaBriefcase className="star1" />
              <p className="topPara1">{employmentType}</p>
            </div>

            <p className="topPara1">{packagePerAnnum}</p>
          </div>

          <hr className="hr" />

          <div className="decrCon descr">
            <h1 className="topHead1">Description</h1>

            <a
              href={companyWebsiteUrl}
              target="_blank"
              rel="noreferrer"
              className="visit"
            >
              Visit
              <FaExternalLinkAlt className="visitLink" />
            </a>
          </div>

          <p className="midPara1 descr">{jobDescription}</p>

          <h1 className="topHead1">Skills</h1>

          <ul className="skillUl">
            {skills.map(each => (
              <SkillList details={each} key={each.name} />
            ))}
          </ul>

          <h1 className="topHead1">Life at Company</h1>

          <div className="lifeCon">
            <p className="lifePara">{lifeAtCompany.description}</p>

            <img
              src={lifeAtCompany.imageUrl}
              alt="life at company"
              className="lifeImg"
            />
          </div>
        </div>

        <div className="simCon">
          <h1 className="topHead3">Similar Jobs</h1>

          <ul className="simiUl">
            {similarJobs.map(each => (
              <SimilarList details={each} key={each.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderFail = () => (
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

      <button type="button" className="findBtn" onClick={this.getDetails}>
        Retry
      </button>
    </div>
  )

  renderProgress = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderAll = status => {
    switch (status) {
      case appConstants.success:
        return this.renderSuccess()
      case appConstants.failure:
        return this.renderFail()
      case appConstants.progress:
        return this.renderProgress()
      default:
        return null
    }
  }

  render() {
    const {onStatus} = this.state
    return this.renderAll(onStatus)
  }
}

export default JobItemDetails
