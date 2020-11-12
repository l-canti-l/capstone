import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function Pages({ pages, page, isAdmin = false, searchTerm = "" }) {
  //if multiple pages
  return (
    pages > 1 && (
      <Pagination>
        {/* take pages and map thru as array */}
        {[...Array(pages).keys()].map((p) => (
          <LinkContainer
            key={p + 1}
            to={
              !isAdmin
                ? searchTerm
                  ? `/search/${searchTerm}/page/${p + 1}`
                  : `/page/${p + 1}`
                : `/admin/productlist/${p + 1}`
            }
          >
            <Pagination.Item active={p + 1 === page}>{p + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
}

export default Pages;
