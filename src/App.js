import Navbar from "./common/components/Navbar";
import History from "./pages/history";
import Menu from "./common/components/Menu";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Navbar />
        <History />
        <Menu />
      </div>
    </Provider>
  );
}

export default App;
