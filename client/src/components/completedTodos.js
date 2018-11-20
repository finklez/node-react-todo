import React from 'react'
import '../style/components/completed-todos.sass'
import Todo from './todo'

import FlipMove from 'react-flip-move';

// export const TodoList = (props) => {
class CompletedTodos extends React.Component {
  state = {
    text: ''
  };

  updateText = (e) => {

    this.setState({text: e.currentTarget.value})
  };

  handleAdd = async e => {
    e.preventDefault();
    const response = await fetch('/api/add-todo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.text }),
    });
    const body = await response.text();
    console.log(body);
    // this.setState({ responseToPost: body });
  };

  render() {
    return (
        <div className="completed-todos">
          <h3>Completed Todos</h3>
          <ul>
            <FlipMove>
            {
              this.props.todos.map((props, i) => (
                  <Todo key={i}
                        updateTodos={this.props.updateTodos}
                        {...props}/>
              ))
            }
            </FlipMove>
          </ul>
        </div>
    );
  }
};

export default CompletedTodos