import { createGlobalStyle } from "styled-components";
import variables from "./Variables";

const GlobalStyle = createGlobalStyle`
  ${variables};
  html {
    box-sizing: border-box;
    width: 100%;
    font-family: 'Roboto', sans-serif;
  }
  *,
  *:before,
  *:after {
    box-sizing: inherit;
    padding: 0;
    margin: 0;
        font-family: 'Roboto', sans-serif;
  }
  /* Scrollbar Styles */
  html {
    scrollbar-width: thin;
    scrollbar-color: var(--dark-slate) var(--navy);
  }
  body::-webkit-scrollbar {
    width: 12px;
  }
  body::-webkit-scrollbar-track {
    background: var(--navy);
  }
  body::-webkit-scrollbar-thumb {
    background-color: var(--dark-slate-green);
    border: 3px solid var(--navy);
    border-radius: 10px;
  }
  body {
    margin: 0;
    width: 100%;
    min-height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-x: hidden;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    background-color: var(--dark-slate-green);
    color: var(--gold-crayola);
    font-family: 'Roboto', sans-serif;
    font-size: var(--fz-xl);
    line-height: 1.3;
    @media (max-width: 480px) {
      font-size: var(--fz-lg);
    }
    &.hidden {
      overflow: hidden;
    }
    &.blur {
      overflow: hidden;
      header {
        background-color: transparent;
      }
      #content > * {
        filter: blur(5px) brightness(0.7);
        transition: var(--transition);
        pointer-events: none;
        user-select: none;
      }
    }
  }
  #root {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    width: 100%;
  }
`;

export default GlobalStyle;
