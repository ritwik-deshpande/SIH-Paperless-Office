import * as React from 'react'
import styled, { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0px;
    max-width: 100vw;
    max-height: 100vh;
    overflow-y: scroll;
    overflow-x: hidden;
    box-sizing: border-box;
  
  }
  *, :after, :before {
    box-sizing: inherit;
  }
`

const PageContent = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  font-family: 'Titillium Web';
  max-width: 100vw;
  max-height: 100vh;
`

export const Page = ({ children }) => (
  <PageContent>
    {children}
    <GlobalStyle />
  </PageContent>
)