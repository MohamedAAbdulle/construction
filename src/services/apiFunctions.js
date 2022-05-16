import axios from "axios";
import { toast } from "react-toastify";

//let baseUrl = "https://localhost:5001";
let baseUrl = "https://ery9ct8r48.execute-api.ap-south-1.amazonaws.com";
const customerId = 4;
let headers = {
  accept: "application/json",
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  customerId,
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
  let a = { headers };
  if (responseType) a.responseType = responseType;
  return await axios.get(baseUrl + url, a).then((res) => {
    console.log(res);
    return res.data;
  });
};

export const postEndpoint = async (url, body) =>
  await axios
    .post(baseUrl + url, body, {
      headers,
    })
    .then((res) => {
      toast.success(res.data);
      return res;
    })
    .catch(errorHandler);

export const putEndpoint = async (url, body) =>
  await axios
    .put(baseUrl + url, body, {
      headers,
    })
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
