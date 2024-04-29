import { useEffect } from "react";
import { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

export default function Search() {
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const searchQuery = urlParams.get("search");

    if (searchQuery) {
      setSearchInput(searchQuery);
    }
  }, []);

  function handleInputSearch(e) {
    const { value } = e.target;
    setSearchInput(value);
  }

  function handleClickSearch() {
    // Get URL
    const currentUrl = window.location.href;

    const queryParams = searchInput;

    const urlParams = new URLSearchParams(window.location.search);
    urlParams.delete("search");

    urlParams.append("search", queryParams);

    const newUrl = `${currentUrl.split("?")[0]}?${urlParams.toString()}`;

    window.location.href = newUrl;
  }

  return (
    <>
      <div>
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Search Car Here"
            aria-label="Search Car Here"
            name="search"
            value={searchInput}
            onChange={handleInputSearch}
            aria-describedby="basic-addon2"
          />
          <Button
            onClick={handleClickSearch}
            variant="success"
            id="button-addon2"
          >
            Search
          </Button>
        </InputGroup>
      </div>
    </>
  );
}
