export default{

	getApprovers(node_approvers){

		let approvers = []
		for(var id in node_approvers.approvedBy){
			approvers.push(id)
		}
		return approvers
	  }

}
