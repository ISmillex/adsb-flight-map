import * as Cesium from 'cesium';


export const ALTITUDE_COLORS = {
	"0": Cesium.Color.ORANGE.brighten(0.3, new Cesium.Color()),
	"4000": Cesium.Color.YELLOW.brighten(0.3, new Cesium.Color()),
	"8000": Cesium.Color.DARKGREEN.brighten(0.3, new Cesium.Color()),
	"20000": Cesium.Color.CYAN.brighten(0.3, new Cesium.Color()),
	"30000": Cesium.Color.BLUE.brighten(0.2, new Cesium.Color()),
	"40000": Cesium.Color.PURPLE.brighten(0.2, new Cesium.Color()),
	"50000": Cesium.Color.BLACK.brighten(0.1, new Cesium.Color()),
}


export const NEW_AIRCRAFT = 'new_aircraft';
export const UPDATE_AIRCRAFT = 'update_aircraft';
export const SELECTED_AIRCRAFT_IN_SCOPE = 'selected_aircraft_in_scope';
export const NEW_SELECTED_AIRCRAFT = 'new_selected_aircraft';
export const CHANGED_SELECTED_AIRCRAFT = 'changed_selected_aircraft';
export const UPDATE_SELECTED_AIRCRAFT =  'update_selected_aircraft';
export const REMOVE_SELECTED_AIRCRAFT = 'remove_selected_aircraft';
export const NO_SELECTED_AIRCRAFT = 'no_selected_aircraft';



export const APIS = {
	'exchange': 'globe.adsbexchange.com',
	'fi': 'globe.adsb.fi',
	'lol': 'adsb.lol',
	'one': 'globe.adsb.one',
	'aal': 'globe.airplanes.live'
}


export const AIRCRAFT_MAP = [
	{raw_key: "hex", key: "hex", title: "ICAO address", unit: "", group: "Identification", description: "A unique code for each aircraft"},
	{raw_key: "type", key: "messageType", title: "Type of ADS-B message", unit: "", group: "Identification", description: "The kind of information the aircraft is sending"},
	{raw_key: "flight", key: "flightId", title: "Flight identification", unit: "", group: "Identification", description: "The identification code of the flight"},
	{raw_key: "r", key: "registration", title: "Registration number", unit: "", group: "Identification", description: "The unique number assigned to the aircraft"},
	{raw_key: "t", key: "aircraftType", title: "Aircraft type", unit: "", group: "Identification", description: "The category or type of the aircraft"},
	{raw_key: "squawk", key: "transponderCode", title: "Transponder code", unit: "", group: "Identification", description: "A code transmitted by the aircraft's transponder"},
	{raw_key: "category", key: "category", title: "Aircraft category", unit: "", group: "Identification", description: "The general category the aircraft falls into"},
	{raw_key: "version", key: "adsbVersion", title: "ADS-B version", unit: "", group: "Identification", description: "The version of the ADS-B communication protocol used"},

	{raw_key: "lat", key: "latitude", title: "Latitude", unit: "°", group: "Spatial", description: "The north-south position of the aircraft on the Earth"},
	{raw_key: "lon", key: "longitude", title: "Longitude", unit: "°", group: "Spatial", description: "The east-west position of the aircraft on the Earth"},

	{raw_key: "wd", key: "windDirection", title: "Wind direction", unit: "°", group: "Direction", description: "The direction from which the wind is blowing"},
	{raw_key: "track", key: "trackAngle", title: "Track angle", unit: "°", group: "Direction", description: "The angle of the aircraft's path over the ground"},
	{raw_key: "track_rate", key: "trackRate", title: "Track rate", unit: "dps", group: "Direction", description: "The rate at which the aircraft's track angle is changing"},
	{raw_key: "roll", key: "rollAngle", title: "Roll angle", unit: "°", group: "Direction", description: "The angle at which the aircraft is tilted to one side"},
	{raw_key: "mag_heading", key: "magneticHeading", title: "Magnetic heading", unit: "°", group: "Direction", description: "The compass heading based on magnetic north"},
	{raw_key: "true_heading", key: "trueHeading", title: "True heading", unit: "°", group: "Direction", description: "The actual heading of the aircraft, corrected for magnetic variation"},

	{raw_key: "gs", key: "groundSpeed", title: "Ground speed", unit: "kn", group: "Speed", description: "The speed of the aircraft relative to the ground"},
	{raw_key: "ias", key: "indicatedAirspeed", title: "Indicated airspeed", unit: "kn", group: "Speed", description: "The speed of the aircraft as indicated by its airspeed indicator"},
	{raw_key: "tas", key: "trueAirspeed", title: "True airspeed", unit: "kn", group: "Speed", description: "The actual speed of the aircraft through the air"},
	{raw_key: "mach", key: "machNumber", title: "Mach number", unit: "", group: "Speed", description: "The speed of the aircraft as a fraction of the speed of sound"},
	{raw_key: "ws", key: "windSpeed", title: "Wind speed", unit: "kn", group: "Speed", description: "The speed of the wind relative to the aircraft"},

	{raw_key: "oat", key: "outsideAirTemperature", title: "Outside air temperature", unit: "°C", group: "Temperature", description: "The temperature outside the aircraft"},
	{raw_key: "tat", key: "totalAirTemperature", title: "Total air temperature", unit: "°C", group: "Temperature", description: "The total air temperature around the aircraft"},

	{raw_key: "baro_rate", key: "barometricRate", title: "Barometric rate", unit: "fpm", group: "Altitude", description: "The rate at which the barometric altitude is changing"},
	{raw_key: "geom_rate", key: "geometricRate", title: "Geometric rate", unit: "fpm", group: "Altitude", description: "The rate at which the geometric altitude is changing"},
	{raw_key: "nav_qnh", key: "altimeterSetting", title: "Altimeter setting", unit: "hPa", group: "Altitude", description: "The setting of the altimeter, used to measure altitude"},
	{raw_key: "nav_altitude_mcp", key: "altitudeSelected", title: "Altitude selected", unit: "ft", group: "Altitude", description: "The altitude selected by the aircraft's autopilot or pilot"},
	{raw_key: "alt_baro", key: "barometricAltitude", title: "Barometric altitude", unit: "ft", group: "Altitude", description: "The altitude calculated based on barometric pressure"},
	{raw_key: "alt_geom", key: "geometricAltitude", title: "Geometric altitude", unit: "ft", group: "Altitude", description: "The altitude calculated based on geometric measurements"},

	{raw_key: "alert", key: "alertFlag", title: "Alert flag", unit: "", group: "Status", description: "A flag indicating an alert condition"},
	{raw_key: "spi", key: "specialPositionIndicatorFlag", title: "Special position indicator flag", unit: "", group: "Status", description: "A flag indicating a special position condition"},

	{raw_key: "mlat", key: "multilaterationFields", title: "Multilateration fields", unit: "", group: "Source", description: "Fields related to multilateration technology"},
	{raw_key: "tisb", key: "trafficInformationServiceBroadcastFields", title: "Traffic information service-broadcast fields", unit: "", group: "Source", description: "Fields related to traffic information service-broadcast technology"},

	{raw_key: "messages", key: "messagesReceived", title: "Messages received", unit: "", group: "Source", description: "The number of messages received by the aircraft"},
	{raw_key: "seen", key: "timeSinceLastMessage", title: "Time since last message", unit: "s", group: "Source", description: "The time elapsed since the last received message"},
	{raw_key: "seen_pos", key: "timeSinceLastPosition", title: "Time since last position", unit: "s", group: "Source", description: "The time elapsed since the last position update"},

	{raw_key: "nic", key: "navigationIntegrityCategory", title: "Navigation integrity category (NIC)", unit: "", group: "Accuracy", description: "The category indicating navigation integrity for the aircraft"},
	{raw_key: "rc", key: "radiusOfContainment", title: "Radius of containment", unit: "m", group: "Accuracy", description: "The radius within which the aircraft's position is contained"},
	{raw_key: "nic_baro", key: "navigationIntegrityCategoryForBarometricAltitude", title: "NIC for barometric altitude", unit: "", group: "Accuracy", description: "The navigation integrity category for barometric altitude"},
	{raw_key: "nac_p", key: "navigationAccuracyCategoryForPosition", title: "NIC for position", unit: "", group: "Accuracy", description: "The navigation accuracy category for position"},
	{raw_key: "nac_v", key: "navigationAccuracyCategoryForVelocity", title: "NAC for velocity", unit: "", group: "Accuracy", description: "The navigation accuracy category for velocity"},
	{raw_key: "sil", key: "surveillanceIntegrityLevel", title: "Surveillance integrity level (SIL)", unit: "", group: "Accuracy", description: "The level indicating the surveillance integrity of the aircraft"},
	{raw_key: "sil_type", key: "surveillanceIntegrityLevelType", title: "SIL level type", unit: "", group: "Accuracy", description: "The type of surveillance integrity level"},
	{raw_key: "gva", key: "geometricVerticalAccuracy", title: "Geometric vertical accuracy", unit: "", group: "Accuracy", description: "The accuracy of the geometric vertical position of the aircraft"},
	{raw_key: "sda", key: "systemDesignAssurance", title: "System design assurance", unit: "", group: "Accuracy", description: "The level of assurance in the design of the aircraft's system"},

	{raw_key: "rssi", key: "receivedSignalStrengthIndicator", title: "Received signal strength", unit: "db", group: "Signal", description: "The strength of the signal received from the aircraft's transmission"}
];


