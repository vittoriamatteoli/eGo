import { createGlobalStyle } from 'styled-components';

const AdminStyle = createGlobalStyle`
  :root {
    --ego-white: #fff;
    --ego-green:#5d8602;
    --ego-drk-green: #687943;
    --ego-wcag-drk-green:#526032;
    --ego-lgt-green: #CCE0A1;
    --ego-beige: #DCDED0;
    --ego-purple: #C590FB;
    --ego-error: #C590FB;
    --ego-light: #fefff9;
    --ego-light-tint:#FDFFF1;
    --ego-dark: #242B17;
    --ego-brown:#504401;
    --ego-gradient: linear-gradient(100deg, rgba(220,222,208,1) 0%, rgba(204,224,161,1) 100%);
    --ego-gradient-reversed: linear-gradient(100deg, rgba(204,224,161,1) 0%, rgba(220,222,208,1) 100%);
   --ego-gradient-cutoff-dt: linear-gradient(90deg, rgba(220,222,208,1) 0%, rgba(204,224,161,1) 80%, #fff 20%);
    --ego-gradient-cutoff-mob: linear-gradient(180deg, rgba(220,222,208,1) 0%, rgba(204,224,161,1) 90%, #fff 10%);
    --ego-gradient-trans: linear-gradient(100deg, rgba(220,222,208,0.4) 0%, rgba(204,224,161,0.4) 100%);


  }

.gradient{
  background: rgb(220,222,208);
background: -moz-linear-gradient(180deg, rgba(220,222,208,1) 0%, rgba(204,224,161,1) 100%);
background: -webkit-linear-gradient(180deg, rgba(220,222,208,1) 0%, rgba(204,224,161,1) 100%);
background: linear-gradient(180deg, rgba(220,222,208,1) 0%, rgba(204,224,161,1) 100%);
filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#dcded0",endColorstr="#cce0a1",GradientType=1);}

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

    .h1{
      color: var(--ego-dark);
      font-size: 2.5rem;
      font-weight: 700;
      font-style: normal;
      font-variation-settings:
        "wdth" 100;
    }

    .error{
    font-weight: 700;
    font-size: 1rem;
    margin-bottom: 15px;
    color: var(--ego-dark);
    border-radius: 7px;
    border: 3px solid var(--ego-error);
    padding:3px 20px 3px 20px;
    }

    .h4{
    font-weight: 400;
    font-size: 1rem;
    }


    .a{
    font-weight: 700;
    }

    .shadow{
    box-shadow: 1px 1px 3px rgba(104, 121, 67, 0.55)}
  }

.input{
  outline: none;
  border: none;
  width: 100%;
  padding: 10px 10px 10px 24px;
  color: var(--ego-dark);
  box-sizing: border-box;
  border-radius: 20px;
  border: 1px solid transparent;
  background: var(--ego-gradient-reversed);
  font-size: 1.3rem;
  font-weight: 400;
  &:focus,
  &:active {
    background-color: var(--ego-lgt-green);
    border: 1px solid var(--ego-green);
  }

const Header{
display: flex;
margin:0 auto;
justify-content: space-between;
align-items: left;
padding: 1em;

}

`;


export default AdminStyle;