import React, { FC } from "react";
import Multiselect from "multiselect-react-dropdown";
import { useRouter } from "next/navigation";
import { SearchRequestBody } from "@/common/types";
import QueryString from "qs";
import styles from "./Filters.module.scss";

type FiltersProps = {
  queryBody: SearchRequestBody;
  availableTags: string[];
};

const Filters: FC<FiltersProps> = ({ queryBody, availableTags }) => {
  const router = useRouter();
  const [tags, setTags] = React.useState<string[]>(
    queryBody?.filterBy?.tags || []
  );
  const [priceSort, setPriceSort] = React.useState<
    SearchRequestBody["sortBy"] | null
  >(queryBody?.sortBy || null);

  const handleFilterChange = (newFilters: Partial<SearchRequestBody>) => {
    const updatedQueryBody = {
      ...queryBody,
      ...newFilters,
      page: 1,
      filterBy: {
        ...(queryBody?.filterBy || {}),
        ...(newFilters.filterBy || {}),
      },
    };
    const queryString = QueryString.stringify(updatedQueryBody);
    router.push(`/search?${queryString}`);
  };

  return (
    <div className={styles.filters}>
      <div className={styles.filterGroup}>
        <span>Filter by Tag:</span>
        <Multiselect
          options={availableTags.map((tag) => ({ name: tag, id: tag }))}
          selectedValues={tags.map((tag) => ({ name: tag, id: tag }))}
          displayValue="name"
          onSelect={(selectedList: Array<{ name: string; id: string }>) => {
            const newTags = selectedList.map((item) => item.name);
            setTags(newTags);
            handleFilterChange({
              filterBy: { ...(queryBody?.filterBy || {}), tags: newTags },
            });
          }}
          onRemove={(selectedList: Array<{ name: string; id: string }>) => {
            const newTags = selectedList.map((item) => item.name);
            setTags(newTags);
            handleFilterChange({
              filterBy: { ...(queryBody?.filterBy || {}), tags: newTags },
            });
          }}
          isObject
          showCheckbox
          className={styles.multiSelect}
        />
      </div>
      <div className={styles.filterGroup}>
        <label htmlFor="price-sort">Sort by Price:</label>
        <select
          id="price-sort"
          className={styles.select}
          value={priceSort || ""}
          onChange={(e) => {
            const sortValue = e.target.value as SearchRequestBody["sortBy"];
            setPriceSort(sortValue);
            handleFilterChange({ sortBy: sortValue });
          }}
        >
          <option value="">None</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
