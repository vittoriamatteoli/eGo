import { BrowserRouter as Router } from 'react-router-dom';
import { AppRoutes } from './routes/Routes';
import GlobalStyle  from "./Globalstyles";

export const App = () => {
  return (
<>
<GlobalStyle/>
       <AppRoutes/>
       </>
  )
}
