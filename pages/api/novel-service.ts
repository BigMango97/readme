import axios from "@/configs/axiosConfig";

export async function bestNovelIdFetch() {
  const response = await axios.get(`/novels-service/v1/main`);
  return response.data;
}

export async function eventNovelFetch() {
  const response = await axios.get(`/novels-service/v1/main/event`);
  return response.data;
}
