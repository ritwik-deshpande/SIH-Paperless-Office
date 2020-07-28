import { render } from 'react-dom';
import './index.css';
import React from 'react';
import { ScheduleComponent, ResourcesDirective, ResourceDirective, ViewsDirective, ViewDirective, Inject, TimelineViews, Resize, DragAndDrop, TimelineMonth, Day } from '@syncfusion/ej2-react-schedule';
import CalendarHeader from '../Headers/CalendarHeader'
import { extend } from '@syncfusion/ej2-base';
import { SampleBase } from './sample-base';
import * as dataSource from './datasource.json';
import EmployeeData from './employees.json'
/**
 * schedule block events sample
 */
export default class BlockEvents extends React.Component{ 
constructor() {
    super(...arguments);
    this.data = extend([], dataSource.blockData, null, true);
    this.employeeData = EmployeeData["employeeData"]
}
getEmployeeName(value) {
    return value.resourceData[value.resource.textField];
}

getEmployeeID(value){
    return value.resourceData.userID;
}
getEmployeeImage(value) {
   
    let resourceName = this.getEmployeeID(value);
    console.log("The value is "+resourceName)
    return resourceName.toLowerCase();
}
getEmployeeDesignation(value) {
    return value.resourceData.Designation;
}
resourceHeaderTemplate(props) {
    return (<div className="template-wrap"><div className="employee-category"><div className={"employee-image " + this.getEmployeeImage(props)}></div><div className="employee-name">
        {this.getEmployeeName(props)}</div><div className="employee-designation">{this.getEmployeeDesignation(props)}</div></div></div>);
}
render() {
    return (<div><CalendarHeader title={'Schedule A Meet'} /> <br/>
  <div className='schedule-control-section'>
            <div className='col-lg-12 control-section'>
                <div className='control-wrapper drag-sample-wrapper'>
                    <div className="schedule-container">
                        <ScheduleComponent ref={schedule => this.scheduleObj = schedule} cssClass='block-events' width='100%' height='650px' selectedDate={new Date(2018, 7, 1)} currentView='TimelineDay' resourceHeaderTemplate={this.resourceHeaderTemplate.bind(this)} eventSettings={{
        dataSource: this.data
    }} group={{ enableCompactView: false, resources: ['Employee'] }}>
                            <ResourcesDirective>
                                <ResourceDirective field='EmployeeId' title='Employees' name='Employee' allowMultiple={true} dataSource={this.employeeData} textField='Text' idField='Id' colorField='Color'>
                                </ResourceDirective>
                            </ResourcesDirective>
                            <ViewsDirective>
                                <ViewDirective option='Day'/>
                                <ViewDirective option='TimelineDay'/>
                                <ViewDirective option='TimelineMonth'/>
                            </ViewsDirective>
                            <Inject services={[Day, TimelineViews, TimelineMonth, Resize, DragAndDrop]}/>
                        </ScheduleComponent>
                    </div>
                </div>
            </div>
        </div></div>);
}
}
