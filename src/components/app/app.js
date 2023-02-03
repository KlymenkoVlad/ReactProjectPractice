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
                {name: 'John L.', salary: 2000, increase: false, rise: true, id: 1},
                {name: 'Mike C.', salary: 1500, increase: true, rise: false, id: 2},
                {name: 'Tom K.', salary: 3000, increase: false, rise: false, id: 3},
                {name: 'Jane D.', salary: 1700, increase: true, rise: false, id: 4},
                {name: 'Alex P.', salary: 1900, increase: false, rise: true, id: 5},
                {name: 'Sarah M.', salary: 2100, increase: true, rise: false, id: 6},
                {name: 'Dave R.', salary: 2200, increase: false, rise: false, id: 7},
                {name: 'Bob J.', salary: 1600, increase: true, rise: false, id: 8},
                {name: 'Emma W.', salary: 2500, increase: false, rise: true, id: 9},
                {name: 'Chris B.', salary: 2000, increase: true, rise: false, id: 10},
                {name: 'Linda H.', salary: 1400, increase: false, rise: false, id: 11},
                {name: 'Greg S.', salary: 3200, increase: true, rise: false, id: 12},
                {name: 'Amanda K.', salary: 1800, increase: false, rise: true, id: 13},
                {name: 'Ryan D.', salary: 1900, increase: true, rise: false, id: 14},
                {name: 'Nina F.', salary: 2400, increase: false, rise: false, id: 15}
            ],
            term: ''
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
            return item.name.indexOf(term) > -1
        })

    }

    searchBySalary = (items) => {
        return items.filter(item => {
            return item.salary > 2000
        })
    }

    onUpdateSearch = (term) => {
        this.setState({term})
    }

    render() {
        const {data, term} = this.state;
        const employees = this.state.data.length;
        const increased = this.state.data.filter(item => item.increase).length;
        const visibleData = this.searchEmp(data, term);

        return (
            <div className="app">
                <AppInfo
                    employees={employees}
                    increase={increased}/>
    
                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter sortBySalary={this.searchBySalary}/>
                </div>
    
                <EmployeesList 
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp}/>
                <EmployessAddForm onAdd={this.addItem}/>
            </div>
        )
    }
}

export default App;