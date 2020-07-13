import React from 'react'
import NumberCard from './NumberCard'
import BarChart from "./graphs/BarChart";
import LineChart from './graphs/LineChart';
const datas = [
    [10, 30, 40, 20],
    [10, 40, 30, 20, 50, 10],
    [60, 30, 40, 20, 30]
]

const lineData =[
    { a: 1, b: 3 },
    { a: 2, b: 6 },
    { a: 3, b: 2 },
    { a: 4, b: 12 },
    { a: 5, b: 8 }]

var i = 0;


class AnalyticDashboard extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            numberCardData : {
                pending : 24,
                completed : 100,
                terminated : 25,
                active : 5
            },
            barChartData : datas[0],

        }
    }
    changeData = () => {
        this.setState({
            barChartData : datas[i++]
        })
        if(i === datas.length) i = 0;
    }
    render(){

        return(
            <>
            <NumberCard data={this.state.numberCardData}/>
            <h2>Graphs with React</h2>
            <LineChart width={600} height={270} data={lineData}/>
            <button onClick={this.changeData}>Change Data</button>
            <BarChart width={600} height={400} data={this.state.barChartData} />
            </>
        )
    }
}
export default AnalyticDashboard;