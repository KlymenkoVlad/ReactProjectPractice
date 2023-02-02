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
                {name: 'Tom K.', salary: 3000, increase: false, rise: false, id: 3}
            ]
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


    render() {
        const employees = this.state.data.length;
        const increased = this.state.data.filter(item => item.increase).length;
        return (
            <div className="app">
                <AppInfo
                    employees={employees}
                    increase={increased}/>
    
                <div className="search-panel">
                    <SearchPanel/>
                    <AppFilter/>
                </div>
    
                <EmployeesList 
                    data={this.state.data}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp}/>
                <EmployessAddForm onAdd={this.addItem}/>
            </div>
        )
    }
}

export default App;