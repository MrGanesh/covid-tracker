import React from 'react'
import numeral from 'numeral'
import { Circle, Popup } from 'react-leaflet'


const casesTypeColor = {
    cases: {
        hex: "#CC1034",
        rgb: "rgb(204, 16, 52)",
        half_op: "rgba(204, 16, 52, 0.5)",
        multiplier: 800,
    },
    recovered: {
        hex: "#7dd71d",
        rgb: "rgb(125, 215, 29)",
        half_op: "rgba(125, 215, 29, 0.5)",
        multiplier: 1200,
    },
    deaths: {
        hex: "#fb4443",
        rgb: "rgb(251, 68, 67)",
        half_op: "rgba(251, 68, 67, 0.5)",
        multiplier: 2000,
    },
};


export const sortData = (data) => {
    const sortedData = [...data]
    return sortedData.sort((a, b) => a.cases > b.cases ? -1 : 1)
}
//draw circle on the map
export const showDataOnMaps = (data, casesType = "cases") => (

    data.map(country => (

        <Circle
            center={[country.countryInfo.lat, country.countryInfo.long]}
            fillOpacity={0.4}
            color={casesTypeColor[casesType].hex}
            fillColor={casesTypeColor[casesType].hex}
            fillOpacity={0.4}
            radius={
                Math.sqrt(country[casesType]) * casesTypeColor[casesType].multiplier
            }
        >
            <Popup>
                <div className="info_container">
                    <div className="info_flag" style={{ backgroundImage: `url(${country.countryInfo.flag})` }}></div>
                    <div className="info_name">{country.country}</div>
                    <div className="info_confirmed">Cases : {numeral(country.cases).format("0,0")}</div>
                    <div className="info_recovered">Recovered : {numeral(country.recovered).format("0,0")}</div>
                    <div className="info_death">Deaths : {numeral(country.deaths).format("0,0")}</div>

                </div>

            </Popup>
        </Circle>
    ))
)

export const prettyPrintStat = (stat) => (
    stat ? `+${numeral(stat).format("0,0a")}` : +0
)