import axios from "axios";
import jwt_decode from "jwt-decode";

const getRedirectURIOrigin = () => {
  if (window.location.host === "localhost:3000") {
    return "http://localhost:3000/";
  } else {
    //return "https://master.d2bjs3tgdzol7q.amplifyapp.com/";
    return "https://www.urrdan-builders.com/";
  }
};
const auth_base_url = "https://construction.auth.ap-south-1.amazoncognito.com";
const client_id = "7lt3eklrmteuqrcmqp3rl9itbk";
let redirect_uri = getRedirectURIOrigin();

const getTokens = async (params) => {
  return await axios.post(
    auth_base_url + "/oauth2/token?" + params,
    JSON.stringify({}),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "*/*",
      },
    }
  );
};

export const getAccessToken = async (status) => {
  var urlParams = new URLSearchParams(window.location.search);
  var code = urlParams.get("code");
  let parrMm = {
    code,
    client_id,
    grant_type: "authorization_code",
    redirect_uri,
  };
  let formattedParrM = new URLSearchParams(parrMm).toString();

  return getTokens(formattedParrM).then((res) => {
    console.log(res);
    const {
      access_token,
      expires_in,
      id_token: idToken,
      refresh_token,
    } = res.data;
    const userInfo = jwt_decode(idToken);

    const expiresAt = new Date(Date.now() + expires_in * 1000);

    const refreshAt = new Date(
      // Upon user's activity, refresh 5 minutes before token actually expires.
      // User inactivity till the access token expires will force re-authentication
      Date.now() + (expires_in - 20 * 60) * 1000
    );

    const jwt = {
      accessToken: access_token,
      // userId: userid,
      expiresIn: expires_in,
      idToken,
      refreshToken: refresh_token,
      expiresAt,
      refreshAt,
      userInfo,
      //userInfo: { ...userInfo, ["custom:customerId"]: 2 },
    };
    sessionStorage.setItem("cachedJwt", JSON.stringify(jwt));
  });
};

export const checkJwtStatus = () => {
  let cachedJwt = JSON.parse(sessionStorage.getItem("cachedJwt"));
  if (cachedJwt) {
    if (cachedJwt.refreshAt > new Date().toISOString()) return "VALID";
    else if (cachedJwt.expiresAt <= new Date().toISOString()) return "EXPIRED";
    else return "REFRESH";
  } else {
    return "MISSING";
  }
};

export async function redirectToLogin() {
  let parrMm = {
    client_id,
    response_type: "code",
    scope: "openid",
    redirect_uri,
  };
  let formattedParrM = new URLSearchParams(parrMm).toString();
  window.location = auth_base_url + "/oauth2/authorize?" + formattedParrM;
}

export function logoutRedirect(url) {
  let logout_uri = "https://www.google.com/";

  if (url && typeof url === "string") {
    logout_uri = getRedirectURIOrigin() + url;
  }

  let s = {
    client_id: "7lt3eklrmteuqrcmqp3rl9itbk",
    logout_uri,
  };

  sessionStorage.removeItem("cachedJwt");
  let c = new URLSearchParams(s).toString();
  window.location = `https://construction.auth.ap-south-1.amazoncognito.com/logout?${c}`;
}
