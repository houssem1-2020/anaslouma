import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import BackCard from '../Assets/backCard';
import InputLinks from '../Assets/linksData';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import GConf from '../../AssetsM/generalConf';
import axios from 'axios';
import { Popup } from 'semantic-ui-react';

function ClientPointage() {
    let [position, setPosition] = useState([36.17720,9.12337])
    let [clientPos, setClientPos] = useState([])
    let posi = [36.27720,9.22337]
    L.Icon.Default.mergeOptions({
        iconUrl: require('leaflet/dist/images/position.gif'),
        iconSize: [10,10],
        shadowSize: [0,0],
        shadowUrl: '',
         shadowSize:   [0,0],
         iconAnchor:   [0,0],
         shadowAnchor: [0,0],
         popupAnchor:  [0,0]
       });
    useEffect(() => {
        axios.get(`${GConf.ApiLink}/client/map`)
        .then(function (response) {
            setClientPos(response.data)
            console.log(response.data)
        })
    }, [])

    return ( <>
        <BackCard data={InputLinks.backCard.clPtg}/>
        <br />
        <div className='container'>
            <div className='card card-body shadow-sm mb-4 '></div>
            <MapContainer center={position} zoom={10} scrollWheelZoom={false} className="map-height-lg">
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {clientPos.map( (cord) => <Marker key={cord.id} position={[cord.Lat, cord.Lng]}> <Popup>{cord.Name}</Popup></Marker> )}
            </MapContainer>
        </div>
        </> );
}

export default ClientPointage