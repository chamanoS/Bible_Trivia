import React from 'react';

const SelectFilter = ({ searchFilter, setSearchFilter }) => {
  return (
    <select className='' value={searchFilter} onChange={(e) => setSearchFilter(e.target.value)}>
      <option value={1}>All Book</option>
      <option value={2}>Old Testament</option>
      <option value={3}>New Testament</option>
    </select>
  );
};

export default SelectFilter;
