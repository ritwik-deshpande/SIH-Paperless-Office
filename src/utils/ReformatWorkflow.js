









export default {
    reformat(WorkFlow){
      
      let newWorkFlow = {
      }

      console.log("The Workflow is",WorkFlow)
      for (var link in WorkFlow.links){

        let node1 = {
          requestAccepted:{},
          approvedBy:{},
          nextNodes :[],
          timestamp :"",
          type:"",
        }
        
        let node2 = {
          requestAccepted:{},
          approvedBy:{},
          nextNodes :[],
          timestamp:"",
          type:"",
        }
        var from =  WorkFlow.links[link].from.nodeId
        var to =  WorkFlow.links[link].to.nodeId
        console.log(from,to)
      
        if(!newWorkFlow[from]){
          newWorkFlow[from] = node1
          newWorkFlow[from].type = WorkFlow.nodes[from].type
        }
        if(!newWorkFlow[to]){

          newWorkFlow[to] = node2
          newWorkFlow[to].type = WorkFlow.nodes[to].type

        }
      
      
        if(WorkFlow.nodes[from].properties.approvers.localeCompare("")!=0){
        
          
          let approvers_from = WorkFlow.nodes[from].properties.approvers.split('-')
          for (var i = 0 ;i< approvers_from.length;i++){
              console.log(approvers_from[i])
              newWorkFlow[from].approvedBy[approvers_from[i]] = false
              newWorkFlow[from].requestAccepted[approvers_from[i]] = false
              
            }
      
         }
         
         
        if(WorkFlow.nodes[to].properties.approvers.localeCompare("")!=0){
      
          let approvers_to = WorkFlow.nodes[to].properties.approvers.split('-')
          console.log("Approvers of to",approvers_to)
          
          for (var i = 0 ;i< approvers_to.length;i++){
            console.log(approvers_to[i])
            newWorkFlow[to].approvedBy[approvers_to[i]] = false
             newWorkFlow[to].requestAccepted[approvers_to[i]] = false
          }
      
      
        }
        newWorkFlow[from].nextNodes = [...newWorkFlow[from].nextNodes,to]
        
        console.log(newWorkFlow)
    }
    return newWorkFlow
  }



}