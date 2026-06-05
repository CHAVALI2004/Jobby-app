import {Link} from 'react-router-dom'
import {FaStar, FaBriefcase} from 'react-icons/fa'
import {IoLocationOutline} from 'react-icons/io5'
import './index.css'

const JobItem = props => {
  const {details} = props

  const {
    companyLogoUrl,
    jobDescription,
    employmentType,
    location,
    rating,
    title,
    packagePerAnnum,
    id,
  } = details

  return (
    <Link to={`/jobs/${id}`} className="link">
      <li className="itemCon">
        <div className="topCon">
          <img src={companyLogoUrl} alt="company logo" className="imgLogo" />

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
            <p className="midPara">{location}</p>

            <FaBriefcase className="star1" />
            <p className="midPara">{employmentType}</p>
          </div>

          <p className="midPara">{packagePerAnnum}</p>
        </div>

        <hr className="hr" />

        <h1 className="topHead">Description</h1>

        <p className="midPara">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobItem
