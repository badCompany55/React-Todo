import React from 'react';
import './components/TodoComponents/Todo.css';
import ToDoList from './components/TodoComponents/TodoList.js';
import {AddButton} from './components/TodoComponents/TodoForm.js';
import {Input} from './components/TodoComponents/TodoForm.js';
import {ClearCompleted} from './components/TodoComponents/TodoForm.js';
import {Save} from './components/TodoComponents/TodoForm.js';

// the main app

class App extends React.Component {
  constructor() {
    super();
    (this.local = window.localStorage),
      (this.info = JSON.parse(this.local.getItem('info')));
    this.state = {
      list: this.info,
      currentInput: '',
    };
  }

  // function to change the state of the the app
  updateState = () => {
    // const input = document.querySelector('input');
    // let toDoList = this.state.list.slice();
    // let currInput = this.state.currentInput;
    // if (input.value !== '') {
    //   toDoList.push({
    //     task: currInput,
    //     id: Date.now(),
    //     completed: false,
    //   });
    // }
    this.setState(prevState => {
      const input = document.querySelector('input');
      let toDoList = this.state.list.slice();
      let currInput = this.state.currentInput;
      if (input.value !== '') {
        toDoList.push({
          task: currInput,
          id: Date.now(),
          completed: false,
        });
      }
      // this.setState({list: toDoList});
      input.value = '';
      return {list: toDoList};
    });
  };

  // captures the input of the user interaction
  captureInput = event => {
    let theEvent = event.target.value;
    this.setState(prevState => {
      return {currentInput: theEvent};
    });
    // this.setState({currentInput: event.target.value});
  };

  setLocal = () => {
    let info = JSON.stringify(this.state.list);
    this.local.setItem('info', info);
  };

  // marks and changes the "completed" element of the object. Also adds and removes classes for styling
  completed = event => {
    let theEvent = event.target;
    this.setState(prevState => {
      let theList = this.state.list.slice();
      theList.map(item => {
        if (theEvent.innerText === item.task) {
          if (item.completed === false) {
            item.completed = true;
            theEvent.classList.add('completed');
            theEvent.classList.remove('everythingElse');
          } else {
            item.completed = false;
            theEvent.classList.add('everythingElse');
            theEvent.classList.remove('completed');
          }
        }
      });
    });
    // let theList = this.state.list.slice();
    // theList.map(item => {
    //   if (event.target.innerText === item.task) {
    //     if (item.completed === false) {
    //       item.completed = true;
    //       event.target.classList.add('completed');
    //       event.target.classList.remove('everythingElse');
    //     } else {
    //       item.completed = false;
    //       event.target.classList.add('everythingElse');
    //       event.target.classList.remove('completed');
    //     }
    //   }
    // });
    // this.setState({list: theList});
  };

  // function that changes the displayed items based on if they have been completed or not.
  clear = () => {
    // let newList = this.state.list.slice();
    // let finalList = newList.filter(item => {
    //   return item.completed === false;
    // });
    this.setState(prevState => {
      let newList = prevState.list.slice();
      let finalList = newList.filter(item => {
        return item.completed === false;
      });
      return {list: finalList};
    });
    // this.setState({list: finalList});
    let setList = document.querySelectorAll('li');
    setList.forEach(listItem => {
      listItem.classList.remove('everythingElse');
      listItem.classList.remove('completed');
      listItem.classList.add('everythingElse');
    });
  };

  // you will need a place to store your state in this component.
  // design `App` to be the parent component of your application.
  // this component is going to take care of state, and any change handlers you need to work with your state
  render() {
    return (
      <div
        onKeyPress={event => {
          if (event.key === 'Enter') {
            this.updateState();
          }
        }}>
        <h2>To Do List</h2>
        <ToDoList checked={this.completed} state={this.state.list} />
        <div className="buttons">
          <Input placeholder="Enter Your Task Here" input={this.captureInput} />
          <AddButton update={this.updateState} />
          <ClearCompleted clear={this.clear} />
          <Save save={this.setLocal} />
        </div>
      </div>
    );
  }
}

export default App;
