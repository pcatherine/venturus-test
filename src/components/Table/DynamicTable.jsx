import React from "react";
import PropTypes from "prop-types";

// import "./dynamicTable.css";
// import "./bosch-table.scss";

/**
 * Render a dynamic table
 * 
 * @param {dictionary} data Table data ex.: data={[{ id: 1, label: "sol", conf: 30 }, ]}
 * @param {string} [variant] Add *table-bordered*, *table-condensed*, *table-striped*, *table-hover* and other classes to table style
 * @param {func} [handleRowClick] Add an onClick event to table row
 * @param {int} [lines] Limit a numbers of lines that will be shown ex.: lines={25}
 * @param {string} [noData] Change the message that will be shown when the table is empty ex.: noData={<h2> Empty </h2>}
 * @param {boolean} [scroll] Add scroll bar to table
 * @param {string} [width] Change the colums width ex.: width="* 500px *" 
 * @example
 *  <DynamicTable variant="table-striped" scroll data={[{ id: 1, label: "sol", conf: 30 }, ]} lines={25} width="* 500px *"  />
 *  <DynamicTable data={data} /> 
 * 
 * @version 1.0.2
 * @author Paolla Agard
 * @see Tables - Bootstrap <https://getbootstrap.com/docs/4.3/content/tables/>
 */

export default class DynamicTable extends React.Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,

    handleRowClick: PropTypes.func,
    lines: PropTypes.number,
    noData: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
    scroll: PropTypes.bool,
    variant: PropTypes.string,
    width: PropTypes.string,
    isLoading: PropTypes.bool,
  }

  static defaultProps = {
    variant: "table-sm",
    noData: "Não há ocorrências",
    isLoading: false,
  }

  constructor(props) {
    super(props);
    this.state = {
      header: [],
      maxHeight: "100%",
      width: [],

      hasError: false,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.data === undefined) {
      return state.hasError = true;
    }

    // Lines and Scroll
    let maxHeight = (props.scroll ? `${document.documentElement.clientHeight * 0.715}px` : "100%")
    if (props.lines !== undefined) {
      maxHeight = `${props.lines * 50 + 75}px`;
    }

    return (props.data.length === 0 ? {
      hasError: true
    } : {
        hasError: false,
        header: Object.keys(props.data[0]),
        maxHeight: maxHeight,
        width: props.width ? props.width.split(" ") : [],
      }
    )
  }

  render() {
    if (this.state.hasError) {
      return (
        <center> {this.props.noData} </center>
      );
    }

    return (
      <div className="table-responsive" >
        <table className={`table ${this.props.variant}`} style={{ maxHeight: this.state.maxHeight }}>

          <thead style={{ borderBottom: "2px solid #dee2e6" }} >
            <tr
              key="tableHead"
              className="text-capitalize font-weight-bold"
            >
              {this.state.header.map((header, index) =>
                <th
                  className="border-0 border-bottom"
                  style={{ width: this.state.width[index] }}
                  key={`tableHead${index}`}
                >
                  {header.replace(/[_-]+/g, " ")}
                </th>
              )}
            </tr>
          </thead>

          <tbody >
            {this.props.data.map((data, indexX) =>
              <tr
                className={this.props.activeRow === indexX ? "table-active" : ""}
                key={`tableBody${indexX}`}
                style={{ cursor: this.props.handleRowClick ? "pointer" : "auto" }}
                onClick={() => this.props.handleRowClick ? this.props.handleRowClick(indexX) : null}
              >
                {this.props.isLoading ?
                  <td colSpan={this.state.header.length} key={`tableBody${indexX}`} className={this.props.activeRow === indexX ? "font-weight-bold" : ""}>
                    <div className="row-animation"></div >
                  </td>
                  :
                  this.state.header.map((header, indexY) =>
                    <td key={`tableBody${indexX}${indexY}`} className={this.props.activeRow === indexX ? "font-weight-bold" : ""}>
                      {data[header]}
                    </td>
                  )
                }
              </tr>
            )}
          </tbody>

        </table>
      </div>
    );
  }
} 