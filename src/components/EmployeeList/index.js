import './index.css'

const EmployeeList = props => {
  const {details, onChangeEmployment} = props
  const {label, employmentTypeId} = details

  const onChangeCheckBox = () => {
    onChangeEmployment(employmentTypeId)
  }

  return (
    <li className="checkList">
      <input
        type="checkbox"
        className="checkbox"
        id={employmentTypeId}
        value={employmentTypeId}
        onChange={onChangeCheckBox}
      />
      <label htmlFor={employmentTypeId} className="checkLabel">
        {label}
      </label>
    </li>
  )
}

export default EmployeeList
