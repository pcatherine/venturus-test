import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
// import Layout from "./components/Layout/Layout"

import Home from "./pages/Home";

export default class App extends React.Component {

  render() {
    const navigationItems = {
      top: [{
        link: "/",
        label: "Home",
        iconName: "server",
        component: () => <Home />,
      },]
    }

    return (
      <BrowserRouter>
          {/* <Layout navigationItems={navigationItems} applicationName="My Model Manager"> */}
            <Switch>

              {navigationItems.top.map(item =>
                <Route key={item.link} exact path={item.link} render={(props) => item.component(props)} />
              )}

              <Redirect to="/" />
            </Switch>
          {/* </Layout> */}
      </BrowserRouter>

    );

  }
}