import { Checkbox } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { ifSelected, selectData } from "../../../utils/dataSelection";

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

interface Expansion {
  location: string;
  longitude: number;
  latitude: number;
}

interface ExpansionPlansProps {
  expansions: Expansion[];
  selectedData: any;
}

const ExpansionPlans: React.FC<ExpansionPlansProps> = ({
  expansions,
  selectedData,
}) => {
  const [hoveredMarker, setHoveredMarker] = useState<string | null>(null);
  // console.log(expansions, "+++");

  const fakeExpansions = [
    {
      state: "State 1",
      legend: "Legend 1",
      long: 71.57,
      lat: 22.67,
    },
    {
      state: "State 2",
      legend: "Legend 2",
      long: 35.68,
      lat: 139.69,
    },
    {
      state: "State 3",
      legend: "Legend 3",
      long: -104.99,
      lat: 39.74,
    },
    // Add more fake expansion objects as needed
  ];

  function convertArray(expansions: Expansion[]): {
    markerOffset: number;
    name: string;
    legend: string;
    coordinates: [number, number];
  }[] {
    const newArray = expansions
      .filter((expansion) => expansion.location)
      .map((expansion) => ({
        markerOffset: 0,
        name: expansion.location,
        legend: expansion.location,
        coordinates: [expansion.latitude, expansion.longitude] as [
          number,
          number
        ],
      }));

    return newArray;
  }

  const markers = convertArray(expansions);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setIsChecked(ifSelected("expansionPlans"));
  }, [selectedData]);

  return (
    <>
      <div
        className="mt-5 text-center flex align-items-center justify-content-center"
        style={{ fontSize: "22px", fontWeight: 700 }}
      >
        <h3>Expansion plans (Product/geographic/service)</h3>
        <Checkbox
          checked={isChecked}
          onChange={(e) => {
            setIsChecked(selectData("expansionPlans", expansions));
          }}
        />
      </div>
      <ComposableMap>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#EEEFEF"
                stroke="#868686"
              />
            ))
          }
        </Geographies>
        {markers.map(({ name, coordinates, markerOffset, legend }) => (
          <Marker key={name} coordinates={coordinates}>
            <rect
              x={25}
              y={-3}
              width={250}
              height={20}
              fill="#fff"
              style={{ borderRadius: "10px" }}
              stroke="#5D5A6D"
              strokeWidth={0.5}
              visibility={hoveredMarker === name ? "visible" : "hidden"}
            />
            <circle
              r={4}
              fill="var(--OneLinkColor)"
              stroke="#fff"
              strokeWidth={0.5}
              onMouseEnter={() => setHoveredMarker(name)}
              onMouseLeave={() => setHoveredMarker(null)}
            />
            <text
              textAnchor="middle"
              y={markerOffset}
              style={{
                stroke: "#090909",
                fontFamily: "system-ui",
                fill: "#000",
                visibility: hoveredMarker === name ? "visible" : "hidden",
              }}
            >
              {name}
            </text>
            <text
              x={35}
              y={10}
              style={{
                fontFamily: "system-ui",
                fill: "#5D5A6D",
                fontSize: "8px",
                backgroundColor: "pink",
              }}
              visibility={hoveredMarker === name ? "visible" : "hidden"}
            >
              {legend}
            </text>
          </Marker>
        ))}
      </ComposableMap>
    </>
  );
};

export default ExpansionPlans;
