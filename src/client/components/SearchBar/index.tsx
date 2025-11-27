"use client";

import React, { FC, FormEvent, useEffect, useState } from "react";
import qs from "qs";
import useSearchSuggestions from "@/common/hooks/useSearchSuggestions";
import useDebounce from "@/common/hooks/useDebounce";
import SearchSuggestionsList from "../SearchSuggestionsList";
import { useRouter } from "next/navigation";
import { ROUTES, SEARCH_PARAMS } from "@/common/constants";
import styles from "./SearchBar.module.scss";
import Link from "next/link";

const SearchBar: FC = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [inputInFocus, setInputInFocus] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const { suggestions, fetchSuggestions, clearSuggestions } =
    useSearchSuggestions();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchTerm(query);
  };

  const handleFocus = () => {
    setInputInFocus(true);
  };

  const suggestionMouseDownRef = React.useRef(false);
  const handleBlur = () => {
    if (!suggestionMouseDownRef.current) {
      setInputInFocus(false);
    }
  };
  const handleSuggestionMouseDown = () => {
    suggestionMouseDownRef.current = true;
  };
  const handleSuggestionMouseUp = () => {
    suggestionMouseDownRef.current = false;
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const queryString = qs.stringify({
      [SEARCH_PARAMS.SEARCH_TERM]: searchTerm,
    });
    router.push(`${ROUTES.SEARCH_RESULTS}?${queryString}`);
  };

  useEffect(() => {
    if (debouncedSearchTerm && debouncedSearchTerm.length >= 3) {
      fetchSuggestions(debouncedSearchTerm);
    } else {
      clearSuggestions();
    }
  }, [debouncedSearchTerm, fetchSuggestions, clearSuggestions]);

  return (
    <div className={styles.searchBar}>
      <div className={styles.formWrapper}>
        <form action="#" className={styles.form} onSubmit={handleFormSubmit}>
          <Link href={ROUTES.HOME} className={styles.homeNav}>
            whMarket
          </Link>
          <label htmlFor="search-input" className={styles.visuallyHidden}>
            Search Products
          </label>
          <input
            id="search-input"
            type="text"
            placeholder="Search...(example: shirt)"
            className={styles.searchInput}
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <button type="submit" className={styles.searchButton}>
            Search
          </button>
        </form>
      </div>
      <div className={styles.links}>
        <Link href={ROUTES.SEARCH_RESULTS} className={styles.link}>
          All Products
        </Link>
        <Link href={ROUTES.SAVED} className={styles.link}>
          Saved Products
        </Link>
      </div>
      {inputInFocus && suggestions.length > 0 && (
        <div className={styles.suggestionsWrapper}>
          <SearchSuggestionsList
            suggestions={suggestions}
            onSuggestionMouseDown={handleSuggestionMouseDown}
            onSuggestionMouseUp={handleSuggestionMouseUp}
          />
        </div>
      )}
    </div>
  );
};
export default SearchBar;
