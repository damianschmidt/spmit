import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ path, children, ...rest }) => {
  return (
    <div>
      <Route
        {...rest}
        render={(props) => {
          if (!!localStorage.getItem("isLogged")) {
            return children;
          } else {
            return (
              <Redirect
                to={{
                  pathname: "/",
                  state: {
                    from: props.location,
                  },
                }}
              />
            );
          }
        }}
      />
    </div>
  );
};

export default ProtectedRoute;
