const createUser = async (name) => {
  const data = { name };
  try {
    const req = await fetch('https://track-it-api.herokuapp.com/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const res = await req.json();
    return res.id;
  } catch (err) {
    return err;
  }
};

const userID = async (user) => {
  try {
    const req = await fetch(`https://track-it-api.herokuapp.com/users/find?${new URLSearchParams({
      name: user,
    })}`);
    const res = await req.json();
    let id = 0;

    if (res) {
      id = res.id;
    } else {
      id = await createUser(user);
    }

    return id;
  } catch (err) {
    return err;
  }
};

const fetchUserData = async (id) => {
  try {
    const req = await fetch(`https://track-it-api.herokuapp.com/users/${id}/running_sessions`, { mode: 'cors' });
    const res = await req.json();
    return res;
  } catch (err) {
    return err;
  }
};

const postRunningSession = async (userID, session) => {
  try {
    const req = await fetch(`https://track-it-api.herokuapp.com/users/${userID}/running_sessions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(session),
    });
    console.log('')
    const oldLocalData = JSON.parse(localStorage.getItem('runningSessions'));
    const newLocalData = oldLocalData.concat(session);
    localStorage.setItem('runningSessions', JSON.stringify(newLocalData));
    const res = await req.json();
    return res;
  } catch (err) {
    return err;
  }
};

export {
  userID, createUser, fetchUserData, postRunningSession,
};
