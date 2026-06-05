import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

const appConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  progress: 'PROGRESS',
}

class Profile extends Component {
  state = {
    profData: {},
    stat: appConstants.initial,
  }

  componentDidMount() {
    this.getDet()
  }

  onSuccess = data => {
    const updatedData = {
      name: data.profile_details.name,
      profileImageUrl: data.profile_details.profile_image_url,
      shortBio: data.profile_details.short_bio,
    }

    this.setState({
      profData: updatedData,
      stat: appConstants.success,
    })
  }

  onFail = () => {
    this.setState({
      stat: appConstants.failure,
    })
  }

  getDet = async () => {
    this.setState({
      stat: appConstants.progress,
    })

    try {
      const jwtToken = Cookies.get('jwt_token')

      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: 'GET',
      }

      const response = await fetch('https://apis.ccbp.in/profile', options)

      const data = await response.json()

      if (response.ok) {
        this.onSuccess(data)
      } else {
        this.onFail()
      }
    } catch (error) {
      this.onFail()
    }
  }

  renderFailure = () => (
    <div className="failCon">
      <button type="button" className="findBtn" onClick={this.getDet}>
        Retry
      </button>
    </div>
  )

  renderSuccess = () => {
    const {profData} = this.state

    return (
      <div className="profCon">
        <img src={profData.profileImageUrl} alt="profile" className="profImg" />

        <h1 className="profName">{profData.name}</h1>

        <p className="profBio">{profData.shortBio}</p>
      </div>
    )
  }

  renderProgress = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={50} width={50} />
    </div>
  )

  renderAll = () => {
    const {stat} = this.state

    switch (stat) {
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
    return this.renderAll()
  }
}

export default Profile
