import axios from "@/configs/axiosConfig";

/**index */
export async function scheduleTitleFetch() {
  const response = await axios.get(`/sections-service/v1/schedules`);
  return response.data.data;
}

export async function BestNovelItemFetch(bestId: number) {
  const response = await axios.get(
    `/sections-service/v1/cards/novels/${bestId}`
  );
  return response.data.data;
}

export async function eventNovelItemFetch(eventId: number) {
  const response = await axios.get(
    `/sections-service/v1/cards/novels/${eventId}`
  );
  return response.data.data;
}

export async function mainScheduleFetch({
  queryKey,
}: {
  queryKey: [string, { id: number; name: string }];
}) {
  const [_key, { id }] = queryKey;
  const response = await axios.get(
    `/sections-service/v1/cards/novels/schedules?scheduleId=${id}`
  );
  return response.data.data;
}
