import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import Modal from '@material-ui/core/Modal';
import ModalContent from './ModalContent';
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { withRouter } from "react-router";
import useStyles from '../Style'
import {
	AppBar,
	withStyles,
	Toolbar,
	ButtonGroup,
	Box,
	Button,
	Tooltip,
	TextField,
	Grid,
} from "@material-ui/core";
const data = {
  DIR01: {
    id: "DIR01",
    name: "Pramod Padole",
    children: ["HOD001"]
  },
  HOD001: {
    id: "HOD001",
    name: "Umesh Deshpande",
    children: ["AP001", "AP002", "AP003"]
  },
  AP001: {
    id: "AP001",
    name: "Ravindra Keskar",
    children: ["20409"]
  },
  AP002: {
    id: "AP002",
    name: "Anil Mokhade"
  },
  AP003: {
    id: "AP003",
    name: "Manish Kurhekar"
  },
  "20409": {
    id: "20409",
    name: "Ritwik Deshpande"
  }
};


function getModalStyle() {
  const top = 5
  const left = 5

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}



function DisplayHierarchy(props) {

  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [juniornode, setJuniorNode] = React.useState({
    id: "DIR01",
    name: "Pramod Padole",
    children: ["HOD001"]
  })

  const handleOpen = (nodes) => {
    console.log(nodes);
    setJuniorNode(nodes)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.hierarchyPaper}>
      
      <ModalContent nodes={juniornode} history={props.history}/>
      {console.log(props)}
    </div>
  );

  
  const renderTree = nodes => (
    <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}  onLabelClick={()=>{handleOpen(nodes)}}>
      
      {Array.isArray(nodes.children)
        ? nodes.children.map(node => {
            console.log(node);
            return renderTree(data[node]);
          })
        : null}
    </TreeItem>
  );

  return (
    <React.Fragment>
     
      {console.log("im here !!")}
      <TreeView
        //className={classes.root}
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpanded={[props.userObj.id]}
        defaultExpandIcon={<ChevronRightIcon />}
      > 
      {renderTree(data[props.userObj.id])}
      </TreeView>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div>
		<AppBar className={classes.appBar}>
				<Toolbar >
					<Box display="flex" flexGrow={1}>
						<Button
							edge="start"
							autoFocus
							color="inherit"
							onClick={handleClose}
							startIcon={<ArrowBackIosIcon />}>
							Back
						</Button>
					</Box>
				</Toolbar>
			</AppBar>
        {body}
        </div>
      </Modal>
    </React.Fragment>
  );
}

export default withRouter(DisplayHierarchy)
