import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom";
import { Provider } from "react-redux";
import Navbar from "../../common/components/Navbar";
import History from "./history";
import Progress from "./progress";
import New from "./new";
import Menu from "../../common/components/Menu";
import store from "../../store/store";


function App() {
  let { path } = useRouteMatch();

  return (
    <Provider store={store}>
      <div className="App">
        <Navbar />
          <Switch>
            <Route exact path={path} component={New} />
            <Route path={`${path}/history`}  component={History} />
            <Route path={`${path}/progress`} component={Progress} />
          </Switch>
        <Menu />
      </div>
    </Provider>
  );
}

export default App;
