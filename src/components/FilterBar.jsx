import styles from "../styles/index.module.css";

const FilterBar = ({ selectedRating, onFilterChange }) => {
  const filterOptions = [
    { value: "all", label: "All Ratings" },
    { value: "5", label: "5 Stars" },
    { value: "4", label: "4 Stars" },
    { value: "3", label: "3 Stars" },
    { value: "2", label: "2 Stars" },
    { value: "1", label: "1 Star" },
  ]

  return (
    <div className={styles.filterBar}>
      <label htmlFor="rating-filter">Filter by rating:</label>
      <select
        id="rating-filter"
        value={selectedRating}
        onChange={(e) => onFilterChange(e.target.value)}
        className="filter-select"
      >
        {filterOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default FilterBar
