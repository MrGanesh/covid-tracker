import React from 'react'
import './Map.css'
import { MapContainer, TileLayer } from 'react-leaflet'
import { showDataOnMaps } from './Util';
function Map({ countries, casesType, center, zoom }) {

    return (
        <div className="map">
            <MapContainer
                center={center}
                zoom={zoom}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />

                {showDataOnMaps(countries, casesType)}
            </MapContainer>
        </div>
    )
}

export default Map;
