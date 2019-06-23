import axios from "axios";

const setAuthToken = token => {
  if (token) {
    // apply header
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // delete geader
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
