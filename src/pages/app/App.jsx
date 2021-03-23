import { useState, useEffect } from 'react';
import {
  Switch,
  Route,
  useRouteMatch,
  useHistory
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
  const { addRunningSession, username, fillList, runningSessions } = props;
  let { path } = useRouteMatch();
  const [isLoading, setIsLoading] = useState(true);
  let history = useHistory();

  const loadFromBackend = async () => {
    const id = await userID(username);  
    const data = await fetchUserData(id);
    fillList(id,data);
    localStorage.setItem('id', JSON.stringify(id));
    localStorage.setItem('runningSessions', JSON.stringify(data));
    setIsLoading(false);
  }

  const loadFromLocalStorage = () => {
    const id = JSON.parse(localStorage.getItem('id'));
    const data = JSON.parse(localStorage.getItem('runningSessions'));
    fillList(id,data);
    setIsLoading(false);
  }

  useEffect(() => {
    if(!localStorage['user']){
      history.push('/');
    } else {
      if(localStorage['runningSessions']){
        loadFromLocalStorage();
      } else {
        loadFromBackend();
      }
    }    
  }, [])

  return (
    isLoading ?
      ( <main style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'var(--blue)', height: '100vh'}}>
          <Loading type='ball_triangle' width={100} height={100} fill='#fff' />
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
        render={props => <History {...props} runningSessions={runningSessions} /> }
        />
        <Route
        path={`${path}/progress`}
        render={props => <Progress {...props} runningSessions={runningSessions} /> }
        />
      </Switch>
      <Menu />
    </div>
    )
  );
}

export default connect(state => state, { addRunningSession, fillList })(App);

