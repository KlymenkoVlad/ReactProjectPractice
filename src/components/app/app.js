import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployessAddForm from '../employees-add-form/employees-add-form';

import './app.css'

function App() {

    const data = [
        {name: 'John L.', salary: 2000, increase: false, id: 1},
        {name: 'Mike C.', salary: 1500, increase: true, id: 2},
        {name: 'Tom K.', salary: 3000, increase: true, id: 3}
    ]

    return (
        <div className="app">
            <AppInfo/>

            <div className="search-panel">
                <SearchPanel/>
                <AppFilter/>
            </div>

            <EmployeesList data={data}/>
            <EmployessAddForm/>
        </div>
    )
}

export default App;