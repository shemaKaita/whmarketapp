import { AVAILABLE_TAGS_ENDPOINT } from "@/common/constants";
import { TagsRequestResponse } from "@/common/types";
import { HTTPClient } from "@/common/utils";

const serverGetTags = async (): Promise<TagsRequestResponse> => {
  const response = await HTTPClient.get<TagsRequestResponse>(
    AVAILABLE_TAGS_ENDPOINT
  );

  if (!response) {
    throw new Error("No response received from tags API");
  }

  if (!response.tags || !Array.isArray(response.tags)) {
    console.warn("Invalid response structure from tags API");
    return { tags: [] };
  }

  return response;
};

export default serverGetTags;
