import {useRoutes} from "react-router-dom";
import {ROUTES} from "./router/Routes";

function App() {
  return(
      useRoutes(ROUTES)
  )
}
export default App
