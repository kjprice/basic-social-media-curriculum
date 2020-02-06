/*
* TODO:
* Add code for Bootstrap
* Remove all starter stuff from App.js
* Return single div with className="container"
* Create a single class "TodoApp"
* Set initial state 
* Create "TODO" render (H3 and form elements)
* Create callbacks: handleChange, handleSubmit
* Create TodoList component
* Save to localStorage
* Discuss localStorage (key, value pairs)
* Style the buttons (class=btn), inputs (class=form-control) and form (inner div with class=form-group)
*/
import React from 'react';

import TodoList from './TodoList';

function getSavedTodoList() {
  const itemsString = localStorage.todoItems;
  if (!itemsString || !itemsString.length) {
    return [];
  }

  return JSON.parse(itemsString);
}

class TodoApp extends React.Component {
  constructor() {
    super();

    this.state = {
      items: getSavedTodoList(),
      text: '',
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.state.text.length) {
      return;
    }
    const newItem = {
      text: this.state.text,
      id: Date.now()
    };

    const items = this.state.items.concat(newItem);

    this.setState(state => ({
      items,
      text: ''
    }));
    localStorage.todoItems = JSON.stringify(items);
  };

  handleChange = (e) => {
    this.setState({ text: e.target.value });
  };

  render() {
    return (
      <div className="container">
        <h3>TODO</h3>
        <TodoList items={this.state.items} />
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="new-todo">What needs to be done?</label>
          <input id="new-todo" onChange={this.handleChange} value={this.state.text} />
          <button>Add #{this.state.items.length + 1}</button>
        </form>
      </div>
    );
  }
}

export default TodoApp;
