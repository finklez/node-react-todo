import React from 'react'
import '../style/components/todo-list.sass'
import Todo from './todo'

import FlipMove from 'react-flip-move';

// export const TodoList = (props) => {
class TodoList extends React.Component {
  state = {
    text: ''
  };

  updateText = (e) => {

    this.setState({text: e.currentTarget.value})
  };

  handleAdd = async e => {
    e.preventDefault();
    const response = await fetch('/api/todo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.text }),
    });
    const body = await response.text();
    console.log(body);
    this.props.updateTodos();
    // this.setState({ responseToPost: body });
  };

  render() {
    return (
        <div className="todo-list">
          <h3>TODOs</h3>
          <ul>

            <FlipMove>
            {
              this.props.todos.map((props, i) => (
                  <Todo key={i}
                        updateTodos={this.props.updateTodos}
                        canComplete="true"
                        {...props}/>
              ))
            }
            </FlipMove>
          </ul>
          <input type="text" onChange={this.updateText}/>
          <button onClick={this.handleAdd}>Add</button>
        </div>
    );
  }
};

export default TodoList