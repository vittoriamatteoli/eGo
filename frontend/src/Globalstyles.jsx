import { createGlobalStyle } from 'styled-components';


const GlobalStyle = createGlobalStyle`
  :root {
    --primary-color: #fff;
    --secondary-color: #6c757d;
    --success-color: #28a745;
    --danger-color: #dc3545;
    --warning-color: #ffc107;
    --info-color: #17a2b8;
    --light-color: #f8f9fa;
    --dark-color: #343a40;
    --ego-gradient: linear-gradient(100deg, rgba(220,222,208,1) 0%, rgba(204,224,161,1) 100%);
    --ego-gradient-reversed: linear-gradient(100deg, rgba(204,224,161,1) 0%, rgba(220,222,208,1) 100%);
  }

  body {
    background:  var(--primary-color);
    font-family: 'Open Sans Hebrew', sans-serif;
  }



`;



export default GlobalStyle;