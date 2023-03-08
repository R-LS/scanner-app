import { useMutation, useQuery } from "react-query";
import axios from "axios";
const mainUrl = "https://wavescan-internship.saurabhmudgal.repl.co"

//POST
export const useSubmitInput = () => {
    return useMutation((details) => {
      return axios.post(mainUrl + `/submitForm`, details)
        .then(resp => resp.data);
    });
  };

  //GET
export const useGetAllScanners = () => {
return useQuery("useGetAllScanners", () => {
    return axios.get(mainUrl+"/success").then((resp) => resp.data);
});
};

