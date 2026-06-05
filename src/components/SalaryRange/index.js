import './index.css'

const SalaryRange = props => {
  const {details, onChangeSalary} = props
  const {label, salaryRangeId} = details

  const onChangeRadio = () => {
    onChangeSalary(salaryRangeId)
  }

  return (
    <li className="checkList">
      <input
        type="radio"
        id={salaryRangeId}
        name="salaryRange"
        value={salaryRangeId}
        className="checkbox"
        onChange={onChangeRadio}
      />
      <label htmlFor={salaryRangeId} className="checkLabel">
        {label}
      </label>
    </li>
  )
}

export default SalaryRange
