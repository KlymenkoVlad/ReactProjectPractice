import { Component } from 'react';

import './app-filter.css';

class AppFilter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            salarySort: false,
            riseSort: false
        }
    }

    onUpdateSalary = () => {
        this.setState(({
            salarySort: !this.state.salarySort
        }))
        this.props.sortBySalary(!this.state.salarySort)
    }

    onUpdateRise = () => {
        this.setState(({
            riseSort: !this.state.riseSort
        }))
        this.props.sortByRise(!this.state.riseSort)
    }

    onUpdateAll = () => {
        this.setState(({
            salarySort: false,
            riseSort: false
        }))
        this.props.sortBySalary(false)
        this.props.sortByRise(false)
    }

    render() {
        let classNamesAll = "btn btn-light";
        let classNamesRise = "btn btn-outline-light";
        let classNamesSalary = "btn btn-outline-light";

        if (this.state.salarySort) {
            classNamesSalary = "btn btn-light"
            classNamesAll = "btn btn-outline-light"
        }
        if (this.state.riseSort) {
            classNamesRise = "btn btn-light"
            classNamesAll = "btn btn-outline-light"
        }

        return (
            <div className="btn-group">
                <button 
                    className={classNamesAll}
                    type="button"
                    onClick={this.onUpdateAll}>
                        Все сотрудники
                </button>
                <button 
                    className={classNamesRise}
                    type="button"
                    onClick={this.onUpdateRise}>
                        На повышение
                </button>
                <button 
                    className={classNamesSalary}
                    type="button"
                    onClick={this.onUpdateSalary}>
                        З/П больше 1000$
                </button>
            </div>
        )
    }
}

export default AppFilter;