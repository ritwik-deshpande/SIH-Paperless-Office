import React from 'react'
import NumberCard from './NumberCard'
import Sunburst from "./Sunburst";
import LineChart from './graphs/LineChart';
import PiChart from './graphs/PiChart'
import RaceChart from './RaceChart';
import AnalyticsHeader from '../Headers/AnalyticsHeader'
import {useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'
import {
	Card,
	CardHeader,
	ListGroup,
	ListGroupItem,
	Row,
	Col,
	Button,
	Progress,
	Container
  } from "shards-react";
import HBarChart from './HBarChart';


const datas = [
    [10, 30, 40, 20],
    [10, 40, 30, 20, 50, 10],
    [60, 30, 40, 20, 30]
]

const lineData = [
    { a: 1, b: 3 },
    { a: 2, b: 6 },
    { a: 3, b: 2 },
    { a: 4, b: 12 },
    { a: 5, b: 8 }]

var i = 0;


class AnalyticDashboard extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            numberCardData: {
                pending: 24,
                completed: 100,
                terminated: 25,
                active: 5
            },
            barChartData: datas[0],

        }
    }
    changeData = () => {
        this.setState({
            barChartData: datas[i++]
        })
        if (i === datas.length) i = 0;
    }
    render() {
        

        return (
            <>
            
            <AnalyticsHeader title={'Analytics'}/>
            <br/>
            <Container fluid className="main-content-container px-4">
			<Row>
      			<Col lg="7">
                    <Card small >
                    <CardHeader style ={{ backgroundColor: '#002a29', color: '#fff' }}>
                    <Typography variant="h6" >Types Of Workflow</Typography>
                    </CardHeader>
                      <RaceChart/>
                </Card>
                </Col>
                <Col lg="5">
                <Card small >
                    <CardHeader style ={{ backgroundColor: '#002a29', color: '#fff' }}>
                    <Typography variant="h6" >Work Chart</Typography>
                    </CardHeader>
                        <Sunburst/>
                </Card>
                </Col>
    		</Row>
            <br/>
            <Row>
      			<Col lg="12">
                  <Card small >
                    <CardHeader style ={{ backgroundColor: '#002a29', color: '#fff' }}>
                    <Typography variant="h6" >Department Wise Chart</Typography>
                    </CardHeader>
                      <HBarChart/>
                </Card>


                  </Col>
            </Row>
  		</Container>

            {/* <NumberCard data={this.state.numberCardData}/>
            <h2>Graphs with React</h2>
            <LineChart width={600} height={270} data={lineData}/>
            <button onClick={this.changeData}>Change Data</button>
            <BarChart width={600} height={400} data={this.state.barChartData} />
	    <PiChart /> */}
            </>
        )
    }
}
export default AnalyticDashboard;
