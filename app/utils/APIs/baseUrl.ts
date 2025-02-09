import axios from "axios";

export const useAxiosBaseURL = axios.create({
  baseURL: `https://v6.exchangerate-api.com/v6/${process.env.NEXT_PUBLIC_API_KEY}`,
});
