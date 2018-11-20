import React from 'react'
import '../style/components/todo.sass'



// export const Todo = (props) => {
class Todo extends React.Component {

  handleComplete = async e => {
    e.preventDefault();
    // console.log('props', this.props);
    const response = await fetch('/api/todo', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.props.id }),
    });
    const body = await response.text();
    console.log(body);
    this.props.updateTodos();
    // this.setState({ responseToPost: body });
  };

  handleDelete = async e => {
    e.preventDefault();
    // console.log('props', this.props);
    const response = await fetch('/api/todo', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.props.id }),
    });
    const body = await response.text();
    console.log(body);
    this.props.updateTodos();
    // this.setState({ responseToPost: body });
  };

  render() {
    return (
        <li className="todo" id={this.props.id}>
          <span className="text">{this.props.text}</span>
          <button
              className="done"
              onClick={this.handleComplete}
              disabled={!this.props.canComplete}>Done</button>
          <button
              className="delete"
              onClick={this.handleDelete}>X</button>

        </li>
    );
  }

}

export default Todo