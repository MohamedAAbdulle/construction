import axios from "axios";
import { toast } from "react-toastify";

let testCustomerId;
let baseUrl;
let testUserId;
baseUrl = "https://ery9ct8r48.execute-api.ap-south-1.amazonaws.com";

/* local test parameters */
//testCustomerId = 2;
//testUserId = 1;
baseUrl = "https://localhost:5001";

if (window.location.hostname !== "localhost") {
  testCustomerId = undefined;
  testUserId = undefined;
  baseUrl = "https://ery9ct8r48.execute-api.ap-south-1.amazonaws.com";
}
const headerSetup = () => {
  let userInfo = JSON.parse(sessionStorage.getItem("userInfo")) || {};
  const customerId = testCustomerId || userInfo["custom:customerId"] || 0;
  const userId = testUserId || userInfo.sub;
  return {
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      customerId,
      userId,
    },
  };
};
const errorHandler = (res) => {
  //test 404
  //console.log(res);
  let errorMessage = "Unknown Error Occured";
  if (res.response) {
    console.log(res.response);
    if (res.response.status === 400) {
      const { title, errors } = res.response.data || {};
      errorMessage = title ? title : "400: Bad Request";
      if (errors) {
        toast.error(errorMessage);
        return { errors };
      }
    }
  }
  toast.error(errorMessage);
};

export const getEndpoint = async (url, responseType) => {
  const extra = headerSetup();
  if (responseType) extra.responseType = responseType;
  return await axios
    .get(baseUrl + url, extra)
    .then((res) => {
      //console.log(res);
      return res.data;
    })
    .catch((error) => {
      console.log(error.response);
      return { failed: true };
    });
};

export const postEndpoint = async (url, body) =>
  await axios
    .post(baseUrl + url, body, headerSetup())
    .then((res) => {
      toast.success(res.data);
      return { ...res, success: true };
    })
    .catch(errorHandler);

export const putEndpoint = async (url, body) =>
  await axios
    .put(baseUrl + url, body, headerSetup())
    .then((res) => {
      //console.log(res);
      toast.success(res.data);
      return { ...res, success: true };
    })
    .catch(errorHandler);

export const deleteEndpoint = async (url) =>
  await axios
    .delete(baseUrl + url, headerSetup())
    .then((res) => {
      toast.success(res.data);
      return { ...res, success: true };
    })
    .catch(errorHandler);
