const getUserPoolId = () => {
  let { iss } = JSON.parse(sessionStorage.getItem("userInfo")) || {};
  let index = (iss || "").search("[^/]+$");
  let userPoolId = iss.slice(index);
  return userPoolId || "";
};

export default getUserPoolId;
