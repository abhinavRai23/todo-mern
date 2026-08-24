import axios from "axios";

export const isRateLimitError = (error: unknown) =>
  axios.isAxiosError(error) && error.response?.status === 429;

export const isApiStatusError = (error: unknown, status: number) =>
  axios.isAxiosError(error) && error.response?.status === status;
