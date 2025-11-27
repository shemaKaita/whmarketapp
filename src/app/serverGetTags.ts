import { AVAILABLE_TAGS_ENDPOINT } from "@/common/constants";
import { TagsRequestResponse } from "@/common/types";
import { HTTPClient } from "@/common/utils";

const serverGetTags = async () => {
  const response = await HTTPClient.get<TagsRequestResponse>(
    AVAILABLE_TAGS_ENDPOINT
  );
  if (!response) {
    return { tags: [] };
  }
  return response;
};

export default serverGetTags;
