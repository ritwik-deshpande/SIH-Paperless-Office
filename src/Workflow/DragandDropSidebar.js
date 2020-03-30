import * as React from 'react'
import styled from 'styled-components'
import { FlowChartWithState } from '@mrblenny/react-flow-chart';
import {  Page, SidebarItem } from './WorkflowComponents';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
`
const Sidebar = styled.div`
  width: 300px;
  background: white;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
`

const DragAndDropSidebar = (props) => {return(
  <Page>
    <Content>
      <FlowChartWithState initialValue={props.chartSimple} />
    </Content>
    <Sidebar>
      <div>
        Drag and drop these items onto the canvas.
      </div> 
      <SidebarItem
        type="top/bottom"
        ports={ {
          port1: {
            id: 'port1',
            type: 'top',
            properties: {
              custom: 'property',
            },
          },
          port2: {
            id: 'port1',
            type: 'bottom',
            properties: {
              custom: 'property',
            },
          },
        } }
        properties={ {
          custom: 'property',
        }}
      />
      <SidebarItem
        type="bottom-only"
        ports={ {
          port1: {
            id: 'port1',
            type: 'bottom',
            properties: {
              custom: 'property',
            },
          },
        }}
      />
      <SidebarItem
        type="left-right"
        ports={ {
          port1: {
            id: 'port1',
            type: 'left',
            properties: {
              custom: 'property',
            },
          },
          port2: {
            id: 'port2',
            type: 'right',
            properties: {
              custom: 'property',
            },
          },
        }}
      />
      <SidebarItem
        type="all-sides"
        ports={ {
          port1: {
            id: 'port1',
            type: 'left',

          },
          port2: {
            id: 'port2',
            type: 'right',
          },
          port3: {
            id: 'port3',
            type: 'top',
          },
          port4: {
            id: 'port4',
            type: 'bottom',
          },
        }}
      />
      <SidebarItem
        type="lots-of-ports"
        ports={ {
          port1: {
            id: 'port1',
            type: 'left',

          },
          port2: {
            id: 'port2',
            type: 'right',
          },
          port3: {
            id: 'port3',
            type: 'top',
          },
          port4: {
            id: 'port4',
            type: 'bottom',
          },
          port5: {
            id: 'port5',
            type: 'left',
          },
          port6: {
            id: 'port6',
            type: 'right',
          },
          port7: {
            id: 'port7',
            type: 'top',
          },
          port8: {
            id: 'port8',
            type: 'bottom',
          },
          port9: {
            id: 'port9',
            type: 'left',
          },
          port10: {
            id: 'port10',
            type: 'right',
          },
          port11: {
            id: 'port11',
            type: 'top',
          },
          port12: {
            id: 'port12',
            type: 'bottom',
          },
        }}
      />
    </Sidebar>
  </Page>
)}

export default DragAndDropSidebar;