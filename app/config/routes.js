// Inclue React
var React = require("react");

// Include react-router 
var router = require("react-router");

// Include Route component to display individual routes
var Route = router.Route;

// Include Router component to contain all Routes
var Router = router.Router;

// Include browserHistory prop to handle routing client side without a server
var browserHistory = router.browserHistory;

// Include IndexRoute (catch-all route)
var IndexRoute = router.IndexRoute;

// Reference high-level components
var Main = require("../components/Main");
var DashboardPage = require("../components/DashboardPage");
var PopularityDiv = require("../components/PopularityDiv");
var UserPortal = require("../components/UserPortal");
var Error404 = require("../components/Error404");

// Export the Routes
module.exports = (

  // The high level component is the Router component
  <Router history={browserHistory}>
    {/* Routing for Main component */}
    <Route path="/" component={Main}>
      <IndexRoute component={DashboardPage} />
      <Route path="openvote" component={UserPortal} />
    </Route>
    <Route path="*" component={Error404} />
  </Router>
);
