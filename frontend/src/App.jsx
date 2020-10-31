import React, { useState } from "react";
import { Container } from "semantic-ui-react";
import HeaderBar from "./components/HeaderBar";
import RoadDetailForm from "./components/RoadDetailsForm";
import Route from "./components/Route";
import RoadInfo from "./components/RoadInfo";
import LoginForm from "./components/LoginPanel";
import AdminPanel from "./components/AdminPanel";
import AddUser from "./components/AddUser";

const App = () => {
  const [latitude, setLatitude] = useState(null);
  const [longtitude, setLongtitude] = useState(null);
  const [lockersResultList, setLockersResultList] = useState({});
  const [lockersDetails, setLockersDetails] = useState([]);

  return (
    <>
      <HeaderBar />
      <Route path="/">
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
      </Route>
      <Route path="/login">
        <Container>
          <LoginForm />
        </Container>
      </Route>
      <Route path="/admin">
        <Container>
          <AdminPanel />
        </Container>
      </Route>
      <Route path="/add-user">
        <Container>
          <AddUser />
        </Container>
      </Route>
    </>
  );
};

export default App;
