import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import Paper from '@material-ui/core/Paper';
import uuid from 'uuid';

//internal dependecies
import AddTodo from './AddTodo';
import TodoList from './TodoList';
import api from "../utils/api";


class Main extends Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      open: false,
    }
  }

  componentDidMount(){
	
	api.todo_list().get(this.props.userid).then( res => {
		console.log(res.data)
		this.setState({
			todos : res.data.items
		})	
	})
  }

  componentWillUnmount(){
   
   	let payload = {
   		id : this.props.userid,
   		items : this.state.todos
   	}
	api.todo_list().update(this.props.userid, payload).then( res => {
		console.log("Updated TODO list")	
	})
  }

  handleClick= (todo) => {
    console.log(this.state)
    this.setState({
      todos: [
        ...this.state.todos,
        {
          id:uuid(),
          task:todo,
          checked:false,
        }
      ]

    })
  }

  handleRemove = (id) => {
      const finalTodos = this.state.todos.filter((todo) => {
        if(todo.id != id) return todo
      });
      this.setState({
        todos: finalTodos,
        open: true,
      });
  }

  handleCheck = (id) => {
    // console.log('shah')
    const finalTodos = this.state.todos.map((todo) => {
        if(todo.id === id){
          todo.checked =! todo.checked
        } 
        return todo
      });
      this.setState({
        todos: finalTodos,
      });
  } 

  handleRequestClose = () => {
    this.setState({
      open: false,
    })
  }

  
  render() {
    return (
       <Paper 
          style={{paddingBottom: '20px', width: '70'}}>
          <div >
			
            <div>
              <h1 style={{ textAlign: 'center'}}>
                TODO List 
              </h1>
            </div>
           
          </div>
          {this.state.todos.length === 0 ? <div style={{marginLeft :60}}> No items in TODO List </div> : <div>
          <TodoList 
            todos={this.state.todos}
            handleRemove={this.handleRemove} 
            handleCheck={this.handleCheck} 
          />
          </div>}
          <br />
          
          <div style={{marginLeft: '5%'}}>
           <AddTodo handleClick={this.handleClick}/>
          </div>
          <Snackbar
          open={this.state.open}
          message="TODO Item deleted"
          autoHideDuration={2000}
          onClose={this.handleRequestClose}
        /> 

        </Paper>
        
     
      
    );
  }
}

export default Main;
