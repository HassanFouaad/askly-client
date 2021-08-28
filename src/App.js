import Main from "./Main";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
  return (
    <div className="App" style={{ overflowX: "hidden" }}>
      <Provider store={store}>
        <Main />
      </Provider>
    </div>
  );
}

export default App;
