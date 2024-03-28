import React from "react";
import { IoIosSearch } from "react-icons/io";

const SearchDialog = ({CloseEvent}) => {
  return (
    <>
      <div className="search-dialog-container">
        <div className="search-input">
          <input type="search" placeholder="Search here.." />
          <IoIosSearch />

        </div>
        <div className="products-container"></div>
        <div className="close" onClick={()=>CloseEvent(false)}>X</div>
      </div>
    </>
  );
};

export default SearchDialog;
