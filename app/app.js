// Include the Main React Dependencies
import React from "react";
import ReactDOM from "react-dom";
import * as V from 'victory';

// Include the main Main Component
import routes from "./config/routes.js";

// This code here allows us to render our main component (in this case Main)
ReactDOM.render(routes, document.getElementById("app"));
