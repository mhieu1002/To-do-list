import React, { Component } from 'react';
import './App.css';
import TaskForm from "./Components/TaskForm";
import Control from "./Components/Control";
import TaskList from './Components/TaskList';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tasks : [],
      isDisplayForm: false,
      taskEditing: null,
      filter: {
        name: '',
        status: -1
      },
      keyword: '',
      sort : {
        by: 'name', 
        value: 1
      }
    }
  }

  componentWillMount() {
    if(localStorage && localStorage.getItem('tasks')) {
      var tasks = JSON.parse(localStorage.getItem('tasks'));
      this.setState({
        tasks: tasks
      });
    }
  }

  s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }

  generateID() {
    return this.s4() + this.s4() + '-' + this.s4() + this.s4() + this.s4();
  }

  // true => false 
  onToggleForm = () => {
    if(this.state.isDisplayForm && this.state.taskEditing !== null) {
      this.setState({
        isDisplayForm : true,
        taskEditing: null
      });
    } else {
        this.setState({
        isDisplayForm : !this.state.isDisplayForm,
        taskEditing: null
      });
    }
    
  }

  onCloseForm = () => {
    this.setState({
      isDisplayForm : false
    });
  }

  onShowForm = () => {
    this.setState({
      isDisplayForm : true
    });
  }

  onSubmit = (data) => {
    var {tasks} = this.state;
    if(data.id === '') {
      data.id = this.generateID();
      tasks.push(data);
    } else {
        var index = this.findIndex(data.id);
        tasks[index] = data;
    }
    
    this.setState({
      tasks: tasks,
      taskEditing: null
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  findIndex = (id) => {
    var {tasks} = this.state;
    var result = -1;
    tasks.forEach((task, index) => {
      if(task.id === id) {
        result = index;
      }
    });
    return result;
  }

  onUpdateStatus = (id) => {
    var {tasks} = this.state;
    var index = this.findIndex(id);
    if(index !== -1) {
      tasks[index].status = !tasks[index].status;
      this.setState({
        tasks: tasks
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }

  onDelete = (id) => {
    var {tasks} = this.state;
    var index = this.findIndex(id);
    if(index !== -1) {
      tasks.splice(index, 1); // Xóa item
      this.setState({
        tasks: tasks
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    this.onCloseForm();
  }

  onUpdate = (id) => {
    var {tasks} = this.state;
    var index = this.findIndex(id);
    var taskEditing = tasks[index];
    this.setState({
      taskEditing : taskEditing
    });
    this.onShowForm();
  }

  onFilter = (filterName, filterStatus) => {
    filterStatus = parseInt(filterStatus, 10);
    this.setState({
      filter: {
        name: filterName.toLowerCase(),
        status: filterStatus
      }
    });
  }

  onSearch = (keyword) => {
    this.setState({
      keyword: keyword.toLowerCase()
    });
  }

  onSort = (sort) => {
    if(this.state.sort.value === 1) {
      this.setState({
        sort: {
          by: sort.by,
          value: -sort.value
        }
      });
    } else {
        this.setState({
          sort: {
            by: sort.by,
            value: sort.value
          }
        });
    }
  }

  render() {
    var { tasks, isDisplayForm, taskEditing, filter, keyword, sort} = this.state;

    if(filter) {
      if(filter.name) {
        tasks = tasks.filter((task) => {
          return task.name.toLowerCase().indexOf(filter.name) !== -1; //Chuyển thành kí tự thường
        }); 
      }
      tasks = tasks.filter((task) => {
        if(filter.status === -1) {
          return task;
        } else {
            return task.status === (filter.status === 1 ? true : false);
        }
      });
    }

    if(keyword) {
      tasks = tasks.filter((task) => {
        return task.name.toLowerCase().indexOf(keyword) !== -1;
      }); 
    }

    if(sort.value === 1) {
      tasks.sort((a, b) => {
        if(a.name > b.name) return 1;
        else if(a.name < b.name) return -1;
        else return 0;
      })
    } else {
        tasks.sort((a, b) => {
          if(a.name > b.name) return -1;
          else if(a.name < b.name) return 1;
          else return 0;
        })
      }

    var elmTaskForm = isDisplayForm ? <TaskForm onSubmit={this.onSubmit} onCloseForm={this.onCloseForm} task={taskEditing}/> : '';

    return (
      <div className="container">
        <div className="text-center mt-15">
          <h1 >Quản lý công việc</h1>
        </div>
  
        <div className="row mt-30">
          <div className={isDisplayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ""}>
            {elmTaskForm}
          </div>
  
          <div className={isDisplayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
            <button type="button" className="btn btn-primary" onClick = {this.onToggleForm}>
              {/* <span className="fa fa-plus mr-5"></span> */}
              Thêm công việc
            </button>
              <Control onSearch={this.onSearch} onSort={this.onSort} />
              <TaskList tasks = { tasks } 
                        onUpdateStatus={this.onUpdateStatus} 
                        onDelete={this.onDelete} 
                        onUpdate={this.onUpdate}
                        onFilter={this.onFilter} />
          </div>
        </div>
        
      </div>
    );
  }  
}

export default App;
