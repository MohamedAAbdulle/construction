import React from "react";
import "react-toastify/dist/ReactToastify.css";
import "assests/bootstrap-styles/bootstrap-styles.css";
import "./app.sass";
import { CircularProgress } from "@material-ui/core";
import { checkJwtStatus, getAccessToken, redirectToLogin } from "services/auth";
import AppContent from "AppContent";

export default function App() {
  const [appContent, setAppContent] = React.useState(<CircularProgress />);

  const setUp = async () => {
    const status = checkJwtStatus();
    if (status === "VALID") {
      setAppContent(<AppContent />);

      //} else if (status === "EXPIRED" || status === "MISSING") {
      //handle REFRESH separately
    } else {
      var urlParams = new URLSearchParams(window.location.search);
      var code = urlParams.get("code");
      if (!code) {
        redirectToLogin();
      } else {
        await getAccessToken()
          .then(() => {
            setAppContent(<AppContent />);
          })
          .catch(() => {
            setAppContent(<p>Failed to load</p>);
          });
      }
    }
  };
  React.useEffect(() => {
    setUp();
  }, []);
  return (
    <div className="app" id="mine">
      {appContent}
    </div>
  );
}
