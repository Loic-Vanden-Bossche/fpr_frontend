import { RoutingRouter } from "./features/routing";
import { BrowserRouter } from "react-router-dom";
import { CameraContextProvider } from "./lib";
import { Provider } from "react-redux";
import { store } from "./store";

function App() {
  return <BrowserRouter>
    <Provider store={store}>
      <CameraContextProvider>
        <RoutingRouter/>
      </CameraContextProvider>
    </Provider>
  </BrowserRouter>;
}

export default App;
