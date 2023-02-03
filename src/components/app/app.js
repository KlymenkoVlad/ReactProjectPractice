import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployessAddForm from '../employees-add-form/employees-add-form';

import './app.css'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [
                {name: 'John L.', salary: 600, increase: false, rise: true, id: 1},
                {name: 'Mike C.', salary: 500, increase: true, rise: false, id: 2},
                {name: 'Tom K.', salary: 2000, increase: false, rise: false, id: 3},
                {name: 'Jane D.', salary: 1700, increase: true, rise: false, id: 4},
                {name: 'Alex P.', salary: 1900, increase: false, rise: true, id: 5},
                {name: 'Sarah M.', salary: 2100, increase: true, rise: false, id: 6},
                {name: 'Dave R.', salary: 2200, increase: false, rise: false, id: 7},
                {name: 'Bob J.', salary: 1600, increase: true, rise: false, id: 8},
                {name: 'Emma W.', salary: 2500, increase: false, rise: true, id: 9},
                {name: 'Chris B.', salary: 2000, increase: true, rise: false, id: 10},
                {name: 'Linda H.', salary: 1400, increase: false, rise: false, id: 11},
                {name: 'Greg S.', salary: 2200, increase: true, rise: false, id: 12},
                {name: 'Amanda K.', salary: 800, increase: false, rise: true, id: 13},
                {name: 'Ryan D.', salary: 900, increase: true, rise: false, id: 14},
                {name: 'Nina F.', salary: 1400, increase: false, rise: false, id: 15}
            ],
            term: '',
            salarySort: false,
            riseSort: false
        }
        this.maxId = this.state.data.length + 1;
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            return {
                data: data.filter(item => item.id !== id)
            }
        })
    }

    addItem = (name, salary) => {
        if(name.replace(/\d/igm, "").length >= 3) {
            const newItem = {
                name, 
                salary,
                increase: false,
                id: this.maxId++
            }
            this.setState(({data}) => {
                const newArr = [...data, newItem];
                return {
                    data: newArr
                }
            });
        } else {
            alert('Имя должно быть больше 3 символов')
        }
    }

    onToggleProp = (id, prop) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, [prop]: !item[prop]}
                }
                return item;
            })
        }))
    }

    searchEmp = (items, term) => {
        if (term.length === 0) {
            return items;
        }

        return items.filter(item => {
            const visibleData = item.name.indexOf(term) > -1
            return visibleData
        })

    }

    searchBySalary = (items) => {
        if (this.state.salarySort) {
            return items.filter(item => {
                return item.salary > 1000
            })
        } else {
            return items;
        }
    }

    searchByRise = (items) => {
        if (this.state.riseSort) {
            return items.filter(item => {
                return item.rise === true
            })
        } else {
            return items;
        }
    }

    onUpdateSearch = (term) => {
        this.setState({term})
    }

    onUpdateSalary = (salarySortValue) => {
        this.setState({salarySort: salarySortValue})
    }

    onUpdateRise = (riseSortValue) => {
        this.setState({riseSort: riseSortValue})
    }

    render() {
        const {data, term} = this.state;
        const employees = this.state.data.length;
        const increased = this.state.data.filter(item => item.increase).length;
        const visibleDataRender = this.searchByRise(this.searchBySalary(this.searchEmp(data, term)))

        return (
            <div className="app">
                <AppInfo
                    employees={employees}
                    increase={increased}/>
    
                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter 
                        sortBySalary={this.onUpdateSalary}
                        sortByRise={this.onUpdateRise}/>
                </div>
    
                <EmployeesList 
                    data={visibleDataRender}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp}/>
                <EmployessAddForm onAdd={this.addItem}/>
            </div>
        )
    }
}

export default App;