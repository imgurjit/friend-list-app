import "./sort-pagination.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortAmountDown, faSortAmountUp } from "@fortawesome/free-solid-svg-icons";

function SortPagination(props) {
  return (
    <div className="pagination">
      <button disabled={props.pageNumber === 1} onClick={props.handlePrev}>
        prev
      </button>
      <div className="pagenumber">Page {props.pageNumber}</div>
      <button disabled={!props.isNextPageAvailable} onClick={props.handleNext}>
        next
      </button>
      <div className="sorting">
        {props.isSorted ? (
          <FontAwesomeIcon icon={faSortAmountUp} className="sort-icon" onClick={props.sortData} />
        ) : (
          <FontAwesomeIcon icon={faSortAmountDown} className="sort-icon" onClick={props.sortData} />
        )}
      </div>
    </div>
  );
}

export default SortPagination;
