import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import EmployeeList from '../EmployeeList'
import SalaryRange from '../SalaryRange'
import AlljobDetails from '../AlljobDetails'
import Profile from '../Profile'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    searchInput: '',
    searchValue: '',
    employmentType: [],
    salaryRange: '',
  }

  onChangeSearch = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  onClickSearch = () => {
    const {searchInput} = this.state

    this.setState({
      searchValue: searchInput,
    })
  }

  onChangeEmployment = id => {
    this.setState(prevState => {
      const isPresent = prevState.employmentType.includes(id)

      if (isPresent) {
        return {
          employmentType: prevState.employmentType.filter(
            eachId => eachId !== id,
          ),
        }
      }

      return {
        employmentType: [...prevState.employmentType, id],
      }
    })
  }

  onChangeSalary = id => {
    this.setState({
      salaryRange: id,
    })
  }

  render() {
    const {searchInput, searchValue, employmentType, salaryRange} = this.state

    return (
      <>
        <Header />

        <div className="jobCon">
          <div className="jobLeft">
            <Profile />

            <hr className="hr" />

            <h1 className="leftHead">Type of Employment</h1>

            <ul className="leftUn">
              {employmentTypesList.map(each => (
                <EmployeeList
                  key={each.employmentTypeId}
                  details={each}
                  onChangeEmployment={this.onChangeEmployment}
                />
              ))}
            </ul>

            <hr className="hr" />

            <h1 className="leftHead">Salary Range</h1>

            <ul className="leftUn">
              {salaryRangesList.map(each => (
                <SalaryRange
                  key={each.salaryRangeId}
                  details={each}
                  onChangeSalary={this.onChangeSalary}
                />
              ))}
            </ul>
          </div>

          <div className="jobRight">
            <div className="searchCon">
              <input
                type="search"
                className="searchBar"
                placeholder="Search"
                value={searchInput}
                onChange={this.onChangeSearch}
              />

              <button
                type="button"
                data-testid="searchButton"
                className="searchBtn"
                onClick={this.onClickSearch}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>

            <AlljobDetails
              key={`${employmentType.join(',')}-${salaryRange}-${searchValue}`}
              employmentType={employmentType}
              salaryRange={salaryRange}
              searchInput={searchValue}
            />
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
