import { RoutingRouter } from "./features/routing";
import { BrowserRouter } from "react-router-dom";
import { CameraContextProvider } from "./lib";

function App() {
  return <BrowserRouter>
    <CameraContextProvider>
      <RoutingRouter/>
    </CameraContextProvider>
  </BrowserRouter>;
}

export default App;
