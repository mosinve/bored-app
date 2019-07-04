import axios from "axios";
import qs from "qs";

const instance = axios.create({
  baseURL: "https://www.boredapi.com/api",
  paramsSerializer: function(params) {
    return qs.stringify(params, { strictNullHandling: true });
  }
});

export default {
  getActivity(params) {
    return instance.get("activity", {
      params: { ...params }
    });
  }
};
