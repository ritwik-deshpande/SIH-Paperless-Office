import React from 'react';
import {connect } from 'react-redux'
import {saveSign} from  '../Actions/UserAction'
import SearchBar from 'material-ui-search-bar'
import api from '../utils/api'
import Button from '@material-ui/core/Button';
import Profile from '../Signatures/Profile'
import Header from '../Header'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import style from '../StyleSheet'
import { withStyles, Tooltip } from '@material-ui/core';
import SearchHeader from './SearchHeader'
import Typography from '@material-ui/core/Typography'
import MaterialTable from "material-table";
import { forwardRef } from "react";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
const tableIcons = {
	Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
	Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
	Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
	Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
	DetailPanel: forwardRef((props, ref) => (
		<ChevronRight {...props} ref={ref} />
	)),
	Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
	Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
	Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
	FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
	LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
	NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
	PreviousPage: forwardRef((props, ref) => (
		<ChevronLeft {...props} ref={ref} />
	)),
	ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
	Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
	SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
	ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
	ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};
const tableColumns = [
	{ title: "User ID", field: "id" },
	{ title: "User Name", field: "name" }
];
// let listitems = [{id:1, name:'Need Plancks constant'},
//             {id:2, name:'Escape from Mind Flayer'}]

class SearchUser extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        userObj: this.props.userObj,
        viewProfile: JSON.parse(JSON.stringify(this.props.userObj)),
        value : "",
        cannotUpdate: false,
        history: []
      };
  	}

    handleSearch = () =>{
        console.log("The userid to search",this.state.value)
        let id = this.state.value
        console.log("The user",this.state.userObj)
        if(id === "")
		{
			alert("User Not Found")
		}
		else{
			 api.users().getByid(id).then( res => {
		    	if (res && res.data){
                    console.log(res.data)
		    		this.setState({
		    			viewProfile : res.data
                    })
                    this.addToList(this.state.viewProfile)
		    		
		    		if(id === this.state.userObj.id){
						this.setState({
								cannotUpdate : false,
								userObj : res.data
							})
			
						}else{
							this.setState({
								cannotUpdate : true
				
							})
				
						}  
                }
		    })
		    .catch( err =>{
		    	alert("User Not Found")
		    });

		}    
    }

    addToList = input => {
        let listArray = this.state.history;
        listArray.push(input);        
        this.setState({
          history: listArray
        }, () => {
            window.localStorage.setItem('savedList', JSON.stringify(this.state.history));
        });
      };

      componentDidMount() {
        const list = window.localStorage.getItem('savedList');
        const parsedList = JSON.parse(list);

        this.setState({
            lists: parsedList,
        })
    }

    handleChange =(newValue) => {

		console.log("The value is", newValue)
		this.setState({
			value : newValue
		})		
  	
    }

    render(){
        const { classes } = this.props 
        return(
            <div>
			<SearchHeader title="Search Users"/>
             <Paper className={classes.headerSearchBox} elevation={0} square>
			 <Grid container spacing={3} direction="row" justify="flex-start" alignItems="flex-start">
				 <Grid item xs={7} sm={8} md={10}>
					<Tooltip title="Search a User by ID" arrow placement="top-start">
						<SearchBar
						placeholder = "Search a User by ID"
						value = {this.state.value}
						onChange={(newValue) => this.handleChange(newValue)}
                        onRequestSearch={() => this.handleSearch(this.state.value)}
						fullWidth
						/>
					</Tooltip>
				</Grid>
			  	<Grid item xs={5} sm={4} md={2}>
					<Button variant="contained" color="secondary" onClick = { this.handleSearch} fullWidth>
					GET PROFILE 
					</Button>
				</Grid>
			</Grid>
			</Paper>
			<br/>
		
            {!(this.state.viewProfile.id === this.state.userObj.id)?
            <div>
			<Profile userObj = {this.state.viewProfile} />
		
		    </div> :  (this.state.history ? 
            
            <div className={classes.tableStyle}>
            <Grid container justify="center"
  alignItems="flex-start">
                <Grid item md={6}>
			<MaterialTable
				icons={tableIcons}
				title="Recent Searches"
				columns={tableColumns}
                data={this.state.history}
                options={{
                    search: false
                  }}
			/></Grid>
            </Grid>
        </div>
        : <h6>No search history</h6>)
                }

	  </div>
            
        )
    }
}

const mapDispatchtoProps = (dispatch) =>{
    return{
      saveSign : (userObj) => dispatch(saveSign(userObj))
      }
}


export default connect(null,mapDispatchtoProps)(withStyles(style,{ withTheme: true})(SearchUser))
