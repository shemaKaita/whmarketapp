import SearchClient from "@/client/Search";
import QueryString from "qs";
import { serverGetSearch } from "../serverGetSearch";
import { SearchRequestBody } from "@/common/types";
import { normalizeQueryParams } from "@/common/utils";
import serverGetTags from "../serverGetTags";

// Force dynamic rendering to avoid build-time static generation
export const dynamic = "force-dynamic";

type SearchProps = {
  searchParams: Promise<SearchRequestBody>;
};

const Search = async ({ searchParams }: SearchProps) => {
  const searchParamsResolved = await searchParams;
  const qsString = QueryString.stringify(searchParamsResolved);
  const queryBody = normalizeQueryParams(
    QueryString.parse(qsString)
  ) as SearchRequestBody;

  const searchResults = await serverGetSearch(queryBody);
  if (!searchResults) {
    return <div>No results found.</div>;
  }
  const availableTags = await serverGetTags();
  return (
    <div>
      <SearchClient
        searchResults={searchResults}
        queryBody={queryBody}
        availableTags={availableTags}
      />
    </div>
  );
};

export default Search;
