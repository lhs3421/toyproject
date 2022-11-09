import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

export const GlobalStyle = createGlobalStyle`
  ${reset}
  html {
    box-sizing: border-box;
    font-size: 20px;
    min-width: 320px;
  }
  a { cursor: pointer; text-decoration: none; }
`
