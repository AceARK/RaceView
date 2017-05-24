# RaceView

## Realtime Dashboard using React, socket.io, Victory charting package, and web scraping tools.

- A dashboard that displays realtime data.
- Theme used for this demo - Presidential Election. 

- Uses three methods to display -> 
* A sorted Tile set with each candidate's name, pic and votes.
* Victory (npm package's) Bar and Pie charts.
* News Panel showing latest news using web scraping tools.

### Cool features

* Data updated in realtime with little to no lag or performance issues due to React's Virtual DOM updation.
* Tiles sorted according to voteCount and updated each time votes increase.
* Charts animate and change according to realtime data.
* News panel displays latest on the leading candidate as and when it changes.
* Additional feature for secure voting implemented using a login module.
* Registered user can login to vote and once cast, is immediately notified, and logged out. Successive attempts to vote by same user is made impossible.

----------------------

### Uses technologies 

### - ReactJS, HTML, CSS, JavaScript ###
### - Bootstrap, jQuery, Responsive design ###
### - Node.js, Express.js, Scraping tools - Cheerio, Request, Realtime updation - socket.io, Charting tool - Victory npm ###
### - MySQL, Sequelize ORM ###

----------------------

Check out the [OpenVote URL](https://raceview.herokuapp.com/openvote) on your secondary device (with RaceView dashboard opened up on primary device) and vote randomly to watch the dashboard update and react on data change. 