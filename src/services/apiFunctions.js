import axios from "axios";
import { toast } from "react-toastify";

let baseUrl = "https://localhost:5001";
//let baseUrl = "https://2s3dfyvsm0.execute-api.us-east-1.amazonaws.com";

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

export const getEndpoint = async (url) =>
  await axios
    .get(baseUrl + url, {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        customerId: 4,
      },
    })
    .then((res) => {
      return res.data;
    });

export const postEndpoint = async (url, body) =>
  await axios
    .post(baseUrl + url, body, {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        customerId: 4,
      },
    })
    .then((res) => {
      toast.success(res.data);
      return res;
    })
    .catch(errorHandler);

export const putEndpoint = async (url, body) =>
  await axios
    .put(baseUrl + url, body, {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
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
