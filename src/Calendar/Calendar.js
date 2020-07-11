import { render } from 'react-dom';
import './index.css';
import React from 'react';
import { ScheduleComponent, ResourcesDirective, ResourceDirective, ViewsDirective, ViewDirective, Inject, TimelineViews, Resize, DragAndDrop, TimelineMonth, Day } from '@syncfusion/ej2-react-schedule';

import { extend } from '@syncfusion/ej2-base';
import { SampleBase } from './sample-base';
import * as dataSource from './datasource.json';
/**
 * schedule block events sample
 */
export default class BlockEvents extends React.Component {
    constructor(props) {
	super(props)
        this.data = extend([], dataSource.blockData, null, true);
	console.log("The user data is", this.props.userObj)
        this.employeeData = [
            { Text: this.props.userObj.name, Id: 1, GroupId: 1, Color: '#bbdc00', Designation: this.props.userObj.branch }
        ];
    }

    initEmployeeDetails() {

	this.employeeData[0].Text = this.props.userObj.name
	this.employeeData[0].Designation = this.props.userObj.branch

    }	
    getEmployeeName(value) {
        return value.resourceData[value.resource.textField];
    }
    getEmployeeImage(value) {
        let resourceName = this.getEmployeeName(value);
        return resourceName.toLowerCase();
    }
    getEmployeeDesignation(value) {
        return value.resourceData.Designation;
    }
    resourceHeaderTemplate(props) {
        return (<div className="template-wrap"><div className="employee-category"><div className="employee-image"></div><div className="employee-name">
            {this.getEmployeeName(props)}</div><br/><br/><div className="employee-designation">{this.getEmployeeDesignation(props)}</div></div></div>);
    }
    render() {
        console.log("The user data is", this.props.userObj)
	this.initEmployeeDetails()
	 
        return (<div className='schedule-control-section'>
                <div className='col-lg-12 control-section'>
                    <div className='control-wrapper drag-sample-wrapper'>
                        <div className="schedule-container">
                            <ScheduleComponent ref={schedule => this.scheduleObj = schedule} cssClass='block-events' width='100%' height='360px' selectedDate={new Date(2018, 7, 1)} currentView='TimelineDay' resourceHeaderTemplate={this.resourceHeaderTemplate.bind(this)} eventSettings={{
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
            </div>);
    }
}
