import React from "react";
import DynamicTable from "../components/Table/DynamicTable";
import API from "../commons/Api";
import FontAwesome from "../components/Icon/FontAwesome";
import "./home.scss";

export default class Home extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      users: [],
      posts: [],
      values: {
        dayOfTheWeek: {},
      },

    };
  };

  componentDidMount() {
    API.getAll().then((results, err) => {
      if (err) {
        console.log(`cannot connect to database: ${err}`);
        throw err;
      };

      let posts = results[1].reduce((r, a) => {
        r[a.userId] = [...r[a.userId] || [], a];
        return r;
      }, {});

      let photos = results[2].reduce((r, a) => {
        r[a.albumId] = [...r[a.albumId] || [], a];
        return r;
      }, {});


      let tmpAlbums = results[3];

      tmpAlbums.map((album, index) => {
        return album.photos = photos[index + 1];
      });

      let albums = tmpAlbums.reduce((r, a) => {

        r[a.userId] = [...r[a.userId] || [], a];
        return r;
      }, {});

      let users = results[0].map((user, index) => {

        return user = {
          ...user,
          albums: albums[index + 1],
          posts: posts[index + 1],
        }
      });

      this.setState({
        users: users
      });
    });

  }

  handleInputChange(event) {
    const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
    const name = event.target.type === "radio" ? event.target.name : event.target.id;

    this.setState({
      values: {
        ...this.state.values,
        [name]: value
      }
    });
  }

  handleDayWeekChange(event) {
    const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
    const name = event.target.id;

    this.setState({
      values: {
        ...this.state.values,
        dayOfTheWeek: {
          ...this.state.values.dayOfTheWeek,
          [name]: value
        }
      }
    });
  }

  rideInGroup = () => {
    const ride = [
      "Always",
      "Sometimes",
      "Never"
    ];

    return ride[Math.floor(Math.random() * ride.length)];
  }

  dayOfTheWeek = () => {
    const day = [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun",
    ];

    return day[Math.floor(Math.random() * day.length)];
  }

  render() {
    let dataTable = [];

    console.log(this.state.values);

    return (
      <>
        {this.state.users.forEach(user => {

          let photos = 0;

          user.albums.forEach(album =>
            photos += album.photos.length
          );

          dataTable.push({
            "Username": user.username,
            "Name": user.name,
            "E-mail": user.email,
            "City": user.address.city,
            "Ride in Group": this.rideInGroup(),
            "Day of the week": this.dayOfTheWeek(),
            "Posts": user.posts.length,
            "Albums": user.albums.length,
            "Photos": photos,
            "": <FontAwesome icon="trash" />,

          });
        })}

        <DynamicTable
          data={dataTable}
          variant={"table-hover table-striped"}
        />

        <form className="mx-4">

          <div className="row ">
            <div className="col-md-6 mb-3">
              <label htmlFor="username">Username</label>
              <input type="text" className="form-control" id="username" value={this.state.values.username || ""} onChange={(e) => this.handleInputChange(e)} required />
              <small>
                Instructions to show on input focus.
            </small>
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="city">City</label>
              <input type="text" className="form-control" id="city" value={this.state.values.city || ""} required onChange={(e) => this.handleInputChange(e)} />
            </div>
          </div>

          <div className="row ">
            <div className="col-md-6 mb-3">
              <label htmlFor="name">Name</label>
              <input type="text" className="form-control" id="name" value={this.state.values.name || ""} required onChange={(e) => this.handleInputChange(e)} />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="rideInGroup">Ride In Group?</label> <br />
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="rideInGroup" id="inlineRadio1" value="always" onChange={(e) => this.handleInputChange(e)} />
                <label className="form-check-label" htmlFor="inlineRadio1">Always</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="rideInGroup" id="inlineRadio2" value="sometimes" onChange={(e) => this.handleInputChange(e)} />
                <label className="form-check-label" htmlFor="inlineRadio2">Sometimes</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="rideInGroup" id="inlineRadio3" value="never" onChange={(e) => this.handleInputChange(e)} />
                <label className="form-check-label" htmlFor="inlineRadio3">Never</label>
              </div>
            </div>
          </div>

          <div className="row ">
            <div className="col-md-6 mb-3">
              <label htmlFor="email">E-mail</label>
              <input type="text" className="form-control" id="email" value={this.state.values.email || ""} onChange={(e) => this.handleInputChange(e)} required />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="dayOfTheWeek">Day of the week</label> <br />
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox" name="dayOfTheWeek" id="sun" checked={this.state.values.dayOfTheWeek.sun || false} onChange={(e) => this.handleDayWeekChange(e)} />
                <label className="form-check-label" htmlFor="sun">Sun</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox" name="dayOfTheWeek" id="mon" checked={this.state.values.dayOfTheWeek.mon || false} onChange={(e) => this.handleDayWeekChange(e)} />
                <label className="form-check-label" htmlFor="mon">Mon</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox" name="dayOfTheWeek" id="tue" checked={this.state.values.dayOfTheWeek.tue || false} onChange={(e) => this.handleDayWeekChange(e)} />
                <label className="form-check-label" htmlFor="tue">Tue</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox" name="dayOfTheWeek" id="wed" checked={this.state.values.dayOfTheWeek.wed || false} onChange={(e) => this.handleDayWeekChange(e)} />
                <label className="form-check-label" htmlFor="tue">Wed</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox" name="dayOfTheWeek" id="thu" checked={this.state.values.dayOfTheWeek.thu || false} onChange={(e) => this.handleDayWeekChange(e)} />
                <label className="form-check-label" htmlFor="thu">Thu</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox" name="dayOfTheWeek" id="fri" checked={this.state.values.dayOfTheWeek.fri || false} onChange={(e) => this.handleDayWeekChange(e)} />
                <label className="form-check-label" htmlFor="fri">Fri</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox" name="dayOfTheWeek" id="sat" checked={this.state.values.dayOfTheWeek.sat || false} onChange={(e) => this.handleDayWeekChange(e)} />
                <label className="form-check-label" htmlFor="sat">Sat</label>
              </div>
            </div>
          </div>

          <div className="row ">
            <div className="col-md-6 mb-3">
              <button type="button" className="btn btn-primary mr-2">Save</button>
              <button type="button" className="btn btn-light">Discard</button>
            </div>
          </div>

        </form>
      </>
    )
  }
}