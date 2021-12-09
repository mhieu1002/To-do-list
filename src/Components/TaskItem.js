import React, { Component } from 'react';

class TaskItem extends Component {

  onUpdateStatus = () => {
    this.props.onUpdateStatus(this.props.task.id);
  }

  onDelete = () => {
    this.props.onDelete(this.props.task.id);
  }

  onUpdate = () => {
    this.props.onUpdate(this.props.task.id);
  }

  render() {

    var {task, index} = this.props;

    return (
      <tr>
        <td>{index + 1}</td>
        <td>{task.name}</td>
        <td className="text-center status-setting">
          <span className={ task.status === true ? "label label-danger" : "label label-success"} onClick={this.onUpdateStatus}>
            {task.status === true ? 'Kích hoạt' : 'Ẩn'}
          </span>
        </td>
        <td className="text-center">
          <button type = "button" className="btn btn-warning mr-15" onClick={this.onUpdate}>
            Sửa
          </button>

          <button onClick = {this.onDelete} type = "button" className="btn btn-danger">
            Xóa
          </button>
        </td>
      </tr>
    );
  }
}

export default TaskItem;