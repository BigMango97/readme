import axios from "@/configs/axiosConfig";

export async function novelRankingFetch() {
  const response = await axios.get(`/batch-service/v1/rankings`);
  return response.data.data;
}

export async function keywordRankingFetch(){
  const response = await axios.get('batch-service/v1/rankings/search');
  return response.data.data;
}
export async function emojiFetch(episodeId: number) {
    const response = await axios.get(`/utils-service/v1/emoji/${episodeId}`);
    return response.data;
  }
  