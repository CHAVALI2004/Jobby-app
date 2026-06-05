import './index.css'

const SkillList = props => {
  const {details} = props
  const {imageUrl, name} = details
  return (
    <li className="skillList">
      <img src={imageUrl} alt={name} className="skillImg" />
      <p className="skillPara">{name}</p>
    </li>
  )
}

export default SkillList
