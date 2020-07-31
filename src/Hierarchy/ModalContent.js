import React from 'react'
import api from '../utils/api';
import Timestamp from "../utils/TimeStamp";
import  AlignItemsList  from "../Approvals/AlignItemsList";
class ModalContent extends React.Component{


    constructor(props){
        super(props)
        this.state={
            tabledata :{},
        }
    }
    componentDidMount(){

        api.pending_request().get(this.props.nodes.id).then((res) => {
            if(res && res.data)
            {
                this.setState
                ({requestTable: this.createRequestTable(res.data)})
            }

        })

    }

    createRequestTable(pending_requests) {
		let tableData = [];
		const displayPriority = {
			'true' : "High",
			'false' : "Normal"
		}
		for (var index in pending_requests.requests) {
			tableData.push({
				id: pending_requests.requests[index].id,
				wname: pending_requests.requests[index].subject,
				sender: pending_requests.requests[index].nameofSender,
				feedback: pending_requests.requests[index].status,
				time: Timestamp.getTimestamp(parseInt( pending_requests.requests[index].receivedon,10)),
				priority : displayPriority[pending_requests.requests[index].priority],
				item: pending_requests.requests[index],
			});
		}
		return tableData;
    }
    
    handleClick = (item) =>{
        console.log(item)
        //this.props.history.pushs
        api.workFlow().getByid(item.id)
				.then((res) => {
					//console.log('The data received is',res.data)
					if (res && res.data) {
                        this.props.history.push({
                            pathname: '/status',
                            state: res.data
                          })
                    }
                })
        
    }
    
    render(){
        return(
            <AlignItemsList
							Click={this.handleClick}
							userObj={this.props.userObj}
							requestTable={this.state.requestTable}
                            filter={null}
                            node = {this.props.nodes}
						/>
        )
    }
}

export default ModalContent;