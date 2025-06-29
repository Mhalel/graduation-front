/* eslint-disable prettier/prettier */
import axiosClient from "./axiosCLient";

const AiRequsts = {
  GptChat: ({ auth, data }) => {
    const url = "/gpt/gpt-chat";
    return axiosClient.post(
      url,
      { content: data },
      { headers: { token: auth || localStorage.getItem("authToken") } }
    );
  },
  GptChatHestory: ({ auth }) => {
    const url = "/gpt/gpt-chat-history";
    return axiosClient.get(url, {
      headers: { token: auth || localStorage.getItem("authToken") },
    });
  },
  GetAiScima: ({ lang }) => {
    const url = "/AiRequsts/GetAiScima";
    return axiosClient.get(url, {
      headers: { lang },
    });
  },
  DeleteAiScima: ({ lang }) => {
    const url = "/AiRequsts/deleteAiScima";
    return axiosClient.delete(url, {
      headers: { lang },
    });
  },
};

export default AiRequsts;
