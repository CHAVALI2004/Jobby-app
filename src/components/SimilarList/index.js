import {FaStar, FaBriefcase} from 'react-icons/fa'
import {IoLocationOutline} from 'react-icons/io5'
import './index.css'

const SimilarList = props => {
  const {details} = props

  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = details

  return (
    <li className="itemCon3">
      <div className="topCon">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
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

      <h1 className="topHead4">Description</h1>

      <p className="lifePara1">{jobDescription}</p>

      <div className="midCon">
        <div className="topCon">
          <IoLocationOutline className="star1" />
          <p className="topPara1">{location}</p>

          <FaBriefcase className="star1" />
          <p className="topPara1">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarList
