import * as React from 'react'
import styled from 'styled-components'
import { REACT_FLOW_CHART } from '@mrblenny/react-flow-chart'

const Outer = styled.div`
  padding: 20px 30px;
  font-size: 14px;
  border: 1px solid cornflowerblue;
  background: white;
  cursor: move;
`



export const SidebarItem = ({ type, ports, properties }) => {
  return (
    <Outer
      draggable={true}
      onDragStart={ (event) => {
        event.dataTransfer.setData(REACT_FLOW_CHART, JSON.stringify({ type ,ports, properties }))
      } }
    >
      {type}
    </Outer>
  )
}
