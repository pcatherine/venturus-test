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
            "": <FontAwesome icon="trash"  />,

          });
        })}

        <DynamicTable
          data={dataTable}
          variant={"table-hover table-striped"}
        />
      </>
    )
  }
}