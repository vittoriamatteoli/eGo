import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --ego-white: #fff;
    --ego-green: #687943;
    --ego-lgt-green: #CCE0A1;
    --ego-beige: #DCDED0;
    --ego-purple: #C590FB;
    --ego-error: #794343;
    --ego-light: #fefff9;
    --ego-light-tint:#FDFFF1;
    --ego-dark: #242B17;
    --ego-gradient: linear-gradient(100deg, rgba(220,222,208,1) 0%, rgba(204,224,161,1) 100%);
    --ego-gradient-reversed: linear-gradient(100deg, rgba(204,224,161,1) 0%, rgba(220,222,208,1) 100%);
    --ego-gradient-cutoff-dt: linear-gradient(90deg, rgba(220,222,208,1) 0%, rgba(204,224,161,1) 40%, #fefff9 0%);
    --ego-gradient-cutoff-mob: linear-gradient(180deg, rgba(220,222,208,1) 0%, rgba(204,224,161,1) 40%, #fefff9 0%);
  }

  body {
    background:  var(--primary-color);
    font-family: 'open-sans-regular', sans-serif;

    .open-sans-regular {
      font-family: "Open Sans", sans-serif;
      font-optical-sizing: auto;
      font-weight: <weight>;
      font-style: normal;
      font-variation-settings:
        "wdth" 100;
    }

  }



`;



export default GlobalStyle;