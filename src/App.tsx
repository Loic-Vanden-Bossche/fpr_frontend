import { RoutingRouter } from "./features/routing";
import { BrowserRouter } from "react-router-dom";
import { CameraContextProvider } from "./lib";
import { Provider } from "react-redux";
import { store } from "./store";
import { IntlProvider } from "react-intl";
import { Toaster } from "react-hot-toast";

function App() {
  return <BrowserRouter>
    <Toaster position={"top-right"} reverseOrder={false}/>
    <IntlProvider locale={navigator.language}>
      <Provider store={store}>
        <CameraContextProvider>
          <RoutingRouter/>
        </CameraContextProvider>
      </Provider>
    </IntlProvider>
  </BrowserRouter>;
}

export default App;
