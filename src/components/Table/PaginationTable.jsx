import React from "react";
import PropTypes from "prop-types";
import DynamicTable from "./DynamicTable";

/**
 * Render a dynamic table with pagination
 * 
 * @param {dictionary} data Table data ex.: data={[{ id: 1, label: "sol", conf: 30 }, ]}
 * 
 * @param {boolean} isNew Flag to identify if it is a new search or just to get a new page
 * @param {func} getNextPage Function to get the next page
 * @param {int} lastOffset Last offset of table, if the variable is -1 then the last page wasn't found
 * @param {Array.int} offset Array of int with all offset
 * 
 * @param {string} [variant] Add *table-bordered*, *table-condensed*, *table-striped*, *table-hover* and other classes to table style
 * @param {func} [handleRowClick] Add an onClick event to table row
 * @param {int} [lines] Limit a numbers of lines that will be shown ex.: lines={25}
 * @param {string} [noData] Change the message that will be shown when the table is empty ex.: noData={<h2> Empty </h2>}
 * @param {boolean} [scroll] Add scroll bar to table
 * @param {string} [width] Change the colums width ex.: width="* 500px *" 
 * 
 * @example
 *  <PaginationTable data={data} isNew={this.state.isNew} offset={[26,51]} lastOffset={-1} getNextPage={this.getNextPage} />
 * 
 * @version 1.0.2
 * @author Paolla Agard
 * @see Tables - Bootstrap <https://getbootstrap.com/docs/4.3/content/tables/>
 * @see Pagination - Bootstrap <https://getbootstrap.com/docs/4.3/components/pagination/>
 */

export default class PaginationTable extends React.Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,

    isNew: PropTypes.bool.isRequired,
    getNextPage: PropTypes.func.isRequired,
    lastOffset: PropTypes.number.isRequired,
    offset: PropTypes.arrayOf(PropTypes.number).isRequired,

    variant: PropTypes.string,
    handleRowClick: PropTypes.func,
    lines: PropTypes.number,
    noData: PropTypes.string,
    scroll: PropTypes.bool,
    width: PropTypes.string,
  }

  static defaultProps = {
    isNew: false,
  }

  constructor(props) {
    super(props);
    this.state = {
      morePages: 5, //-> When this state was changed it's necessary to change the backend

      currentPage: 1,
      offset: [0],

      totalPages: 999999999, // DISABLED until find the last page
      isUpdating: false,
      isLoading: false,
    };
  }

  static getDerivedStateFromProps(props, state) {
    props.offset.forEach(pOffset => {
      const fOffset = state.offset.filter(sOffset =>
        sOffset === pOffset
      );

      //if didn't find the current props.offset in state.offset push it in
      if (fOffset.length === 0) {
        state.offset.push(pOffset);
      }
    });

    //if props.lastOffset >= 0 set state.totalPages 
    if (props.lastOffset >= 0) {
      state.offset.forEach((sOffset, index) => {
        if (sOffset === props.lastOffset) {
          state.totalPages = index + 1;
        }
      });
    }

    return {
      currentPage: (props.isNew && !state.isUpdating) ? 1 : state.currentPage,
      offset: state.offset,
      totalPages: state.totalPages,
      isUpdating: false,
      isLoading: state.isUpdating ? true : false,
    }
  }

  handlePageClick = (event) => {
    const name = event.currentTarget.name;

    this.setState({
      currentPage: parseInt(name, 10),
      isUpdating: true,
      isLoading: true,
    }, () => {
      this.props.getNextPage(this.state.offset[this.state.currentPage - 1]);
    });
  }

  handleNext = () => {

    if (this.state.currentPage < this.state.totalPages) {
      this.setState({
        currentPage: this.state.currentPage + 1,
        isUpdating: true,
        isLoading: true
      }, () => {
        this.props.getNextPage(this.state.offset[this.state.currentPage - 1]);
      });
    }
  }

  handlePrevious = () => {
    if (this.state.currentPage > 1) {
      this.setState({
        currentPage: this.state.currentPage - 1,
        isUpdating: true,
        isLoading: true,
      }, () => {
        this.props.getNextPage(this.state.offset[this.state.currentPage - 1]);
      });
    }
  }

  renderPagination() {
    let index = this.state.currentPage - 1;
    if (index + this.state.morePages > this.state.totalPages) {
      if (this.state.totalPages - this.state.morePages > 0) {
        index = this.state.totalPages - this.state.morePages;
      } else {
        index = 0;
      }
    }

    let pagination = [
      <li key="buttonPrevious" className={`page-item ${this.state.currentPage === 1 ? "disabled" : ""}`}>
        <button className="page-link arrow" aria-label="Previous" onClick={this.handlePrevious}>
          <span aria-hidden="true">&lt;</span>
        </button>
      </li>
    ];

    if (this.state.currentPage !== 1 && index !== 0) {
      pagination.push(
        <li key="buttonFirst" className="page-item">
          <button name="1" className="page-link" aria-label="First" onClick={this.handlePageClick}>
            <span aria-hidden="true">...</span>
          </button>
        </li>
      );
    }

    for (let indexOffset = 0; indexOffset < this.state.morePages && indexOffset < this.state.offset.length; index++ , indexOffset++) {
      pagination.push(
        <li key={index + 1} className={`page-item ${this.state.currentPage === index + 1 ? "active" : ""} `} >
          {this.state.currentPage === index + 1 ?
            <button className="page-link">
              {index + 1}
            </button>
            :
            <button name={index + 1} className="page-link" onClick={this.handlePageClick}>
              {index + 1}
            </button>
          }
        </li>
      );
    }

    // DISABLE until find the last page
    if (index !== this.state.totalPages || this.state.offset.length > this.state.totalPages) {
      pagination.push(
        <li key="buttonLast" className={`page-item ${this.state.totalPages === this.state.offset.length ? "" : "disabled"}`}>
          <button name={this.state.totalPages} className="page-link" aria-label="Last" onClick={this.handlePageClick}>
            <span aria-hidden="true">...</span>
          </button>
        </li>
      );
    }

    pagination.push(
      <li key="buttonNext" className={`page-item ${this.state.currentPage === this.state.totalPages ? "disabled" : ""}`}>
        <button className="page-link arrow" aria-label="Next" onClick={this.handleNext}>
          <span aria-hidden="true">&gt;</span>
        </button>
      </li>
    );

    return pagination;
  }

  render() {
    const pagination = (
      
      <ul className="pagination justify-content-end pagination-sm my-1">
        {this.renderPagination()}
      </ul>
    );

    return this.props.data.length === 0 ?
      (
        <DynamicTable  {...this.props} />
      )
      :
      (<>
        {/* {pagination} */}
        {
          this.state.isUpdating ?
            <center>
              <span
                className={`spinner-${this.props.spinnerType} spinner-${this.props.spinnerType}-sm ${this.props.variant ? this.props.variant : ""}`}
                role="status"
              >
              </span>
              <span className="align-middle">{this.props.text}</span>
            </center>
            :
            <DynamicTable {...this.props} isLoading={this.state.isLoading} />
        }
        {pagination}
      </>);
  }
} 