import { useState, useEffect } from 'react';
import {
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom";
import { connect } from 'react-redux';
import Navbar from "../../common/components/Navbar";
import History from "./history";
import Progress from "./progress";
import New from "./new";
import Menu from "../../common/components/Menu";
import { addRunningSession, fillList } from '../../actions';
import { userID, fetchUserData } from '../../api';
import Loading from 'react-loading-components';


const App = props => {
  const { addRunningSession, username, fillList } = props;
  let { path } = useRouteMatch();
  const [isLoading, setIsLoading] = useState(true);
  
  const load = async () => {
    const id = await userID(username);  
    const data = await fetchUserData(id);
    fillList(id,data);
    setIsLoading(false);
}

  useEffect(() => {
    load();
    }, [])

  return (
    isLoading ?
      ( <main style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'var(--blue)', height: '100vh'}}>
          <Loading type='ball_triangle' width={200} height={200} fill='#fff' />
        </main>
      ):(
      <div className="App">
      <Navbar />
      <Switch>
        <Route 
        exact path={path}
        render={props => <New {...props} addRunningSession={addRunningSession} /> }
        />
        <Route 
        path={`${path}/history`}
        render={props => <History {...props} /> }
        />
        <Route
        path={`${path}/progress`}
        render={props => <Progress {...props} /> }
        />
      </Switch>
      <Menu />
    </div>
    )
  );
}

export default connect(state => state, { addRunningSession, fillList })(App);

