const FilterInput = ({ filter, onFilterChange }) => {
  return (
    <div className="filter">
      <input
        type="text"
        value={filter}
        onChange={onFilterChange}
        placeholder="Filter by name or symbol"
      />
    </div>
  );
};

export default FilterInput;
