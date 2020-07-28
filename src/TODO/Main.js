import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import Paper from '@material-ui/core/Paper';
import uuid from 'uuid';

//internal dependecies
import AddTodo from './AddTodo';
import TodoList from './TodoList';
import api from "../utils/api";
// import useStyles from "../Style" 
import { withStyles, Typography, makeStyles, Divider, Box, Card, CardHeader, CardContent, CardActions } from '@material-ui/core';
import style from '../StyleSheet';

// const styles = theme => ({
//   toDoListBox: {
// 		width: "100%",
// 		height: "100%",
// 		padding: theme.spacing(1),
//     overflow: "hidden",
//     display: "flex",
//     flexDirection: "column",
// 	},
// });
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
    const {classes} = this.props
    return (
      //  <Paper className={classes.toDoListBox}>
      //    <Typography variant="subtitle1" component="h4">
      //         ToDo List
      //       </Typography>
      //       <div>
            
           
      //     <Divider/>
      //     {this.state.todos.length === 0 ? <Box m={2}> No items in TODO List </Box> : 
      //     <TodoList 
      //       todos={this.state.todos}
      //       handleRemove={this.handleRemove} 
      //       handleCheck={this.handleCheck} 
      //     />
      //     }
          
      //       <Box alignSelf="flex-end">
          
          
      //      <AddTodo handleClick={this.handleClick}/>
      //      </Box>
           
      //      </div>
      //     <Snackbar
      //     open={this.state.open}
      //     message="TODO Item deleted"
      //     autoHideDuration={2000}
      //     onClose={this.handleRequestClose}
      //   /> 

      //   </Paper>
      <Card>
        <CardContent style={{width: "100%"}}>
          <Typography variant="h6" gutterBottom>
             TODO List
          </Typography>
          <Divider />
            <Box display="flex" flexDirection="column" className={classes.utilCard}>
              <Box pb={1} flexGrow={1} style={{overflow:"auto"}}>
                {this.state.todos.length === 0 ? <Box m={2}> No items in TODO List </Box> : 
                  <TodoList 
                    todos={this.state.todos}
                    handleRemove={this.handleRemove} 
                    handleCheck={this.handleCheck} 
                  />}
              </Box>
              <AddTodo handleClick={this.handleClick}/>
                <Snackbar
                open={this.state.open}
                message="TODO Item deleted"
                autoHideDuration={2000}
                onClose={this.handleRequestClose}
              />
            </Box>
        </CardContent>
        
      </Card>
     
      
    );
  }
}

export default withStyles(style)(Main);

