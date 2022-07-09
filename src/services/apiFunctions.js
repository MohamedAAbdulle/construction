import axios from "axios";
import { toast } from "react-toastify";

//let baseUrl = "https://localhost:5001";
let baseUrl = "https://ery9ct8r48.execute-api.ap-south-1.amazonaws.com";
const headerSetup = () => {
  let cachedJwt = JSON.parse(sessionStorage.getItem("cachedJwt"));
  let userInfo = (cachedJwt || {}).userInfo;
  const customerId = (userInfo || {})["custom:customerId"] || 0;
  return {
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      customerId,
    },
  };
};
const errorHandler = (res) => {
  //test 404
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
  const { headers } = headerSetup();
  if (responseType) headers.responseType = responseType;
  return await axios
    .get(baseUrl + url, { headers })
    .then((res) => {
      console.log(res);
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
      return res;
    })
    .catch(errorHandler);

export const putEndpoint = async (url, body) =>
  await axios
    .put(baseUrl + url, body, headerSetup())
    .then((res) => {
      toast.success(res.data);
      return res;
    })
    .catch(errorHandler);

export const deleteEndpoint = async (url) =>
  await axios
    .delete(baseUrl + url)
    .then((res) => toast.success(res.data))
    .catch(errorHandler);
