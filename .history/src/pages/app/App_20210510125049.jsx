import { useState, useEffect } from 'react';
import {
  Switch,
  Route,
  useRouteMatch,
  useHistory,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loading from 'react-loading-components';
import Navbar from '../../common/components/Navbar';
import History from './history';
import Progress from './progress';
import New from './new';
import More from './more';
import Menu from '../../common/components/Menu';
import { addRunningSession, fillList } from '../../actions';
import { userID, fetchUserData } from '../../api';

const App = (props) => {
  const {
    addRunningSession, username, fillList, runningSessions,
  } = props;
  const { path } = useRouteMatch();
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  const loadFromBackend = async () => {
    const id = await userID(username);
    const data = await fetchUserData(id);
    fillList(id, data);
    localStorage.setItem('id', JSON.stringify(id));
    localStorage.setItem('runningSessions', JSON.stringify(data));
    setIsLoading(false);
  };

  const loadFromLocalStorage = async () => {
    const id = await JSON.parse(localStorage.getItem('id'));
    const data = JSON.parse(localStorage.getItem('runningSessions'));
    fillList(id, data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (!localStorage.user) {
      history.push('/');
    } else if (localStorage.runningSessions) {
      loadFromLocalStorage();
    } else {
      loadFromBackend();
    }
  }, []);

  return (
    isLoading
      ? (
        <main style={{
          display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'var(--blue)', height: '100vh',
        }}
        >
          <Loading type="ball_triangle" width={100} height={100} fill="#fff" />
        </main>
      ) : (
        <div className="App">
          <Navbar />
          <Switch>
            <Route
              exact
              path={path}
              render={() => <New addRunningSession={addRunningSession} />}
            />
            <Route
              path={`${path}/history`}
              render={() => <History runningSessions={runningSessions} />}
            />
            <Route
              path={`${path}/progress`}
              render={() => <Progress runningSessions={runningSessions} />}
            />
            <Route
              path={`${path}/more`}
              render={() => <More />}
            />
          </Switch>
          <Menu />
        </div>
      )
  );
};

App.propTypes = {
  addRunningSession: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  fillList: PropTypes.func.isRequired,
  runningSessions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      user: PropTypes.string,
      start_time: PropTypes.number,
      distance: PropTypes.number,
      duration: PropTypes.number,
      avg_speed: PropTypes.number,
      avg_pace: PropTypes.number,
      goal: PropTypes.number,
    }),
  ).isRequired,
};

export default connect((state) => state, { addRunningSession, fillList })(App);
