import React, { FC, MouseEvent } from "react";
import styles from "./SearchSuggestionsList.module.scss";
import type { MinimalProductDetail } from "@/common/types";
import Link from "next/link";
import { ROUTES } from "@/common/constants";
import Image from "next/image";

type SearchSuggestionsListProps = {
  suggestions: MinimalProductDetail[];
  onSuggestionMouseDown?: (event: MouseEvent<HTMLLIElement>) => void;
  onSuggestionMouseUp?: (event: MouseEvent<HTMLLIElement>) => void;
};

const SearchSuggestionsList: FC<SearchSuggestionsListProps> = ({
  suggestions,
  onSuggestionMouseDown,
  onSuggestionMouseUp,
}) => {
  return (
    <ul className={styles.suggestionsList}>
      {suggestions.map((suggestion) => (
        <li
          key={suggestion.id}
          className={styles.suggestionItem}
          onMouseDown={onSuggestionMouseDown}
          onMouseUp={onSuggestionMouseUp}
        >
          <Link
            href={`${ROUTES.PRODUCT_DETAIL}/${suggestion.id}`}
            className={styles.suggestionLink}
          >
            <Image
              src={suggestion.imageUrl}
              alt={suggestion.name}
              width={40}
              height={40}
              className={styles.suggestionImage}
            />
            {suggestion.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SearchSuggestionsList;
