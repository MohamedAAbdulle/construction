import axios from "axios";
import { toast } from "react-toastify";

let baseUrl = "https://localhost:5001";

const errorHandler = (res) => {
  let errorMessage = "Unknown Error Occured";
  if (res.response) {
    //console.log(res.response);
    if (res.response.status === 400) {
      const { title, errors } = res.response.data || {};
      errorMessage = title ? title : "400: Bad Request";
      if (errors) {
        console.log(res.response);
        toast.error(errorMessage);
        return errors;
      }
    }
  }
  toast.error(errorMessage);
};

export const getEndpoint = async (url) =>
  await axios.get(baseUrl + url).then((res) => {
    return res.data;
  });

export const postEndpoint = async (url, body) =>
  await axios
    .post(baseUrl + url, body, {
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
