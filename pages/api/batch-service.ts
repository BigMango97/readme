import axios from "@/configs/axiosConfig";

export async function novelRankingFetch() {
  const response = await axios.get(`/batch-service/v1/rankings`);
  return response.data.data;
}
