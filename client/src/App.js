import React, { Component } from 'react';
import logo from './assets/images/logo.svg';
import './App.css';
import TodoList from "./components/todoList";
import CompletedTodos from "./components/completedTodos";

class App extends Component {
  state = {
    todos: [],
    completed: [],
    post: '',
    // responseToPost: '',
  };

  componentDidMount() {
    this.updateTodos();
  }

  updateTodos = () => {
    this.callApi('todo-list')
        .then(res => {
          const completed = res.todos.filter((t) => { return t.completed === '1'});
          const filtered = res.todos.filter((t) => { return t.completed === '0'});
          this.setState({ todos: filtered, completed: completed })
        })
        .catch(err => console.log(err));
  };

  callApi = async (path) => {
    const response = await fetch('/api/' + path);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  handleReset = () => {
    this.callApi('reset')
        .then(res => {
          console.log(res);
        })
        .catch(err => console.log(err));
  };

  // handleSubmit = async e => {
  //   e.preventDefault();
  //   const response = await fetch('/api/world', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ post: this.state.post }),
  //   });
  //   const body = await response.text();
  //   this.setState({ responseToPost: body });
  // };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div className="git-link"><a href="https://github.com/finklez/node-react-todo">https://github.com/finklez/node-react-todo</a></div>
        {/*<p>{JSON.stringify(this.state.response)}</p>*/}
        {/*<form onSubmit={this.handleSubmit}>*/}
          {/*<p>*/}
            {/*<strong>Post to Server:</strong>*/}
          {/*</p>*/}
          {/*<input*/}
              {/*type="text"*/}
              {/*value={this.state.post}*/}
              {/*onChange={e => this.setState({ post: e.target.value })}*/}
          {/*/>*/}
          {/*<button type="submit">Submit</button>*/}
        {/*</form>*/}
        {/*<p>{this.state.responseToPost}</p>*/}
        <button
        onClick={this.handleReset}>Reset</button>
        <TodoList
            updateTodos={this.updateTodos}
            todos={this.state.todos}/>
        <CompletedTodos
            updateTodos={this.updateTodos}
            todos={this.state.completed}/>
      </div>
    );
  }
}

export default App;
