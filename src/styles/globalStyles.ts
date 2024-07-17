import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  /* Reset CSS */
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  /* Custom Global Styles */
  * {
    box-sizing: border-box;
  }
  body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f9;
    color: #333;
  }



 .diagram-component {
  width: auto;
  height: auto;
  border: solid 1px black;
  background-color: white;
}


/* Conditional Styling */
.circular-progress {
  color: blue; /* Example color for 'saving' state */
}

.save-icon {
  color: green; /* Example color for 'saved' state */
}

.open {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}
.option {
  padding: 10px;
  font-size: 16px;
  background: white;
  color: black;
}

 .option:hover {
    background-color: #f1f1f1;
  }

  #saved {
    width: 4rem !important;
    top: -8px;
    height: 4rem !important;
    position: relative;
  }

`;

export const theme = {
  colors: {
    primary: '#3498db',
    secondary: '#2ecc71',
    background: '#f5f5f5',
    text: '#333',
  },
};
