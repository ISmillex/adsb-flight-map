# adsb-flight-map

adsb-flight-map is a real-time aircraft tracking application that fetches aircraft data within the camera's scope from a server and renders them on a 3D map. You can interact with the map, see the positions and details of all aircrafts in real time, select an aircraft from either the map or the table, search and sort the table by any filter, and more.


## Table of Contents

- [Features](#features)
- [Road Map](#road-map)
- [Installation](#installation)
- [How It Works](#how-it-works)
- [Contributing](#contributing)
- [License](#license)

## Features

adsb-flight-map includes the following features:

- Ability to interact with the 3D map: You can zoom in and out, rotate, tilt, and pan the map to explore different regions and perspectives.
- Ability to see all aircrafts and their positions in real time: You can see the aircrafts as entities on the map, with their altitude, speed, and direction indicated by their size, color, and orientation. You can also see their flight paths as trails behind them.
- Ability to select an aircraft from either the map or the table to see detailed information: You can click on an aircraft on the map or on a row in the table to see more information about it, such as its ICAO address, flight identification, aircraft type, transponder code, and more. The selected aircraft will be highlighted on both the map and the table, and the information will be updated in real time.
- Ability to search specific aircraft by any filter in the table: You can use the search box above the table to filter the aircraft by any column, such as flight identification, aircraft type, altitude, speed, etc. The table will show only the matching aircraft.
- Ability to sort every column in the table: You can click on any column header in the table to sort the aircraft by that column, either in ascending or descending order. The table will show the sorted aircraft.
## Road Map

adsb-flight-map is currently in its **version 1.0.0**. The current version includes the basic functionality of fetching and rendering the aircraft data, as well as the features listed above.

The future versions of adsb-flight-map will include the following improvements and additions:

- **Version 1.1.0**: Add more options for customizing the map, such as changing the base layer, the terrain, the lighting, and the camera mode.
- **Version 1.2.0**: Add more options for customizing the aircraft trails, such as changing the color, the width, the length, and the shape.
- **Version 1.3.0**: Add more features for interacting with the aircraft, such as clicking on them to see a popup window with more details, hovering over them to see a tooltip with basic information.
- **Version 1.4.0**: Add trails from starting point to current position with colors that specify altitude
- **Version 1.5.0**: Add 3D aircraft models.
- **Version 2.0.0**: Add more sources for fetching the aircraft data, such as other ADS-B servers, FlightAware, OpenSky Network, etc. Add more options for selecting the data source, such as choosing the server, the region, the frequency, and the format.

## Installation

To install adsb-flight-map, follow these steps:

1. Clone the repository from GitHub:

```bash
git clone https://github.com/ISmillex/adsb-flight-map.git
```

2. Navigate to the project directory:

```bash
cd adsb-flight-map
```

3. Install the dependencies:

```bash
npm install
```

4. Start the server:

```bash
npm run dev
```

5. Open the browser and go to http://localhost:5173

## How It Works

adsb-flight-map works by creating a World using CesiumJS, which is a JavaScript library for creating 3D globes and maps. CesiumJS provides various features and options for rendering and interacting with the World, such as the base layer, the terrain, the lighting, the camera, the entities, and the primitives.

adsb-flight-map then calculates the camera position and the camera's scope, which are the coordinates of the corners of the visible area on the map. It uses these coordinates to fetch the aircraft data within the camera's scope from a server, which is an ADS-B exchange server that provides real-time aircraft data in JSON format. ADS-B stands for Automatic Dependent Surveillance-Broadcast, which is a system that allows aircraft to broadcast their position and other information to other aircraft and ground stations.

adsb-flight-map then parses the JSON data and creates an array of aircraft objects, each containing the properties and values of the aircraft, such as the ICAO address, the flight identification, the aircraft type, the latitude, the longitude, the altitude, the speed, the heading, and more. It also creates a table element to display the aircraft data in a tabular format, with each row corresponding to an aircraft object and each column corresponding to a property.

adsb-flight-map then renders the aircraft objects on the map as entities, using the CesiumJS bilboards, which allows loading and rendering Images in jpg or png format, then adsb-flight-map modifies aircrafts properties, such as the position, the orientation, the color, and the scale, according to the values of the aircraft object.

adsb-flight-map then updates the rendering periodically to reflect the current positions and information of the aircraft, by fetching new data from the server, updating the aircraft objects and the table element, and updating the models and the polylines on the map.

adsb-flight-map also allows the user to interact with the map and the table, by providing various features and options, such as zooming, rotating, tilting, panning, selecting, searching, sorting, and more. These features and options are implemented using the CesiumJS API, which provides various classes and methods for manipulating and controlling the World, the camera, the entities, the primitives, and the events.

The advantages of adsb-flight-map are:

- It provides a realistic and immersive visualization of the aircraft data
- It provides a comprehensive and detailed information of the aircraft data, using a table, a selection, and a filter.
- It provides a dynamic and interactive experience of the aircraft data, using a real-time update, a zoom, a rotate, a tilt, a pan, a sort, and more.

The disadvantages of adsb-flight-map are:

- It requires a high-performance browser and device to run smoothly, as it uses a lot of resources and computations for rendering and updating  the aircraft data.
- It may not be fully accurate or complete, as it relies on the accuracy and the completeness of the ADS-B data source, which may vary depending on the location, the coverage, the frequency, and the format of the data.

## Contributing

adsb-flight-map is an open-source project, and we welcome contributions from anyone who is interested in improving or expanding it. If you want to contribute to adsb-flight-map, you can follow these steps:

1. Fork the repository from GitHub.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them with a clear and descriptive message.
4. Push your branch to your forked repository.
5. Create a pull request from your branch to the main repository.
6. Wait for the review and feedback from the maintainers.

Before you contribute, please make sure that you follow the code style and the conventions of the project, and that you test your changes thoroughly.

## License
This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
