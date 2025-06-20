/* eslint-disable prettier/prettier */
import axiosClient from "./axiosCLient";

const GPTApis = {
  GptChat: ({ auth, data }) => {
    const url = "/gpt/gpt-chat";
    return axiosClient.post(
      url,
      { content: data },
      { headers: { token: auth } }
    );
  },
  GptChatHestory: ({ auth }) => {
    const url = "/gpt/gpt-chat-history";
    return axiosClient.get(url, {
      headers: { token: auth || localStorage.getItem("authToken") },
    });
  },
};

export default GPTApis;
