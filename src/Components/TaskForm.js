import React, { Component } from 'react';

class TaskForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      status: true
    }
  }

  componentWillMount() {
    if(this.props.task) {
      this.setState({
        id: this.props.task.id,
        name: this.props.task.name,
        status: this.props.task.status
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps && nextProps.task) {
      this.setState({
        id: nextProps.task.id,
        name: nextProps.task.name,
        status: nextProps.task.status
      });
    }else if (!nextProps.task) {
      this.setState({
        id: '',
        name: '',
        status: true
      });
    }

  }

  onCloseForm = () => {
    this.props.onCloseForm();
  }

  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    if(name === 'status') {
      value = target.value === 'true' ? true : false;
    }
    this.setState({
      [name]: value
    });
  }

  onSubmit = (event) => {
    event.preventDefault(); // Không bị load lại trang
    this.props.onSubmit(this.state);
    // Cancel & close
    this.onClear();
    this.onCloseForm();
  }

  onClear = () => {
    this.setState({
      name: '',
      status: true
    });
  }

  render() {

    var {id} = this.state;

    return (
      <div className = "panel panel-warning">
      <div className = "panel-heading">
        <h3 className = "panel-title">
          {id !== '' ? 'Cập nhật công việc' : 'Thêm công việc'}
          <span className = "fa fa-times-circle text-right icon-setting" onClick={this.onCloseForm}/>
        </h3>
      </div>
      <div className = "panel-body">
        <form onSubmit={this.onSubmit}>
          <div className = "form-group">
            <label>Tên:</label>
            <input type = "text" className = "form-control" name = "name" value={this.state.name} onChange={this.onChange}/>
          </div>
          <label className = "mt-15">Trạng Thái:</label>
          <select className = "form-control form-setting" name = "status" value={this.state.status} onChange={this.onChange} >
            <option value = { true }>Kích Hoạt</option>
            <option value = { false }>Ẩn</option>
          </select>
          <br />
          <div className = "text-right">
            <button type = "submit" className = "btn btn-warning mr-15">
              {/* <span className = "fa fa-plus mr-5" /> */}
              Lưu Lại
            </button>
            &nbsp;
            <button onClick={this.onClear} type = "button" className = "btn btn-danger mr-10">
              {/* <span className = "fa fa-close mr-5" /> */}
              Hủy Bỏ
            </button>
          </div>
        </form>
      </div>
    </div>
    );
  }
}

export default TaskForm;
