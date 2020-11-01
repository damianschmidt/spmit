import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Container } from "semantic-ui-react";
import HeaderBar from "./components/HeaderBar";
import RoadDetailForm from "./components/RoadDetailsForm";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import RoadInfo from "./components/RoadInfo";
import LoginForm from "./components/LoginPanel";
import Logout from "./components/Logout";

const App = () => {
  const [latitude, setLatitude] = useState(null);
  const [longtitude, setLongtitude] = useState(null);
  const [lockersResultList, setLockersResultList] = useState({});
  const [lockersDetails, setLockersDetails] = useState([]);
  const [isLogged, setIsLogged] = useState();

  useEffect(() => {
    if (localStorage.getItem("isLogged") === null) {
      // setting an empty string means false
      localStorage.setItem("isLogged", "");
    }

    if (!localStorage.getItem("isLogged")) {
      setIsLogged(false);
    } else {
      setIsLogged(true);
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <HeaderBar />
        <Switch>
          <Route exact path="/">
            {isLogged ? (
              <Container>
                <RoadDetailForm
                  setLockersDetails={setLockersDetails}
                  setLockersResultList={setLockersResultList}
                  setLatitude={setLatitude}
                  setLongtitude={setLongtitude}
                />
                <RoadInfo
                  lockersDetails={lockersDetails}
                  lockersResultList={lockersResultList}
                  latitude={latitude}
                  longtitude={longtitude}
                />
              </Container>
            ) : (
              <Container>
                <LoginForm />
              </Container>
            )}
          </Route>
          <PublicRoute exact path="/login">
            <Container>
              <LoginForm />
            </Container>
          </PublicRoute>
          <ProtectedRoute exact path="/logout">
            <Container>
              <Logout />
            </Container>
          </ProtectedRoute>
          <Route render={() => <Redirect to="/" />} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
