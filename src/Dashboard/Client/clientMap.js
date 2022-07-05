import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import GConf from '../../AssetsM/generalConf';
import axios from 'axios';
import BreadCrumb from '../Assets/breadCrumb';
import { Select } from 'semantic-ui-react';
import useGetClientMap from '../Assets/Hooks/fetchClientMap';

function ClientMap() {
     /* ############################### Const ################################*/
    const [centerPosition, setCenterPosition] = useState([36.17720,9.12337])
    const [clientsPositions, setClientsPositions] = useState([])
    const [clientMap] = useGetClientMap() 

    L.Icon.Default.mergeOptions(GConf.LeafleftIcon );

     /* ############################### UseEffect ################################*/
    useEffect(() => {
        axios.get(`${GConf.ApiLink}/client`)
        .then(function (response) {
            setClientsPositions(response.data)
        })
    }, [])

    /* ############################### Function ################################*/
    const GetSelectedClients = (value)=>{
        axios.post(`${GConf.ApiLink}/client/position`,{
            gouv : value
        })
        .then(function (response) {
            setClientsPositions(response.data)
            console.log(response.data)
        })
    }

    return ( <>
    <BreadCrumb links={GConf.BreadCrumb.ClientMap} />
    <br />

    <div className='row'>
        <div className='col-12 col-lg-10'>
            <MapContainer center={centerPosition} zoom={8} scrollWheelZoom={false} className="map-height-lg" >
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {clientsPositions.map( (cord) => <Marker key={cord.PK} position={[cord.Lat, cord.Lng]}> <Popup>{cord.Name}</Popup></Marker> )}
            </MapContainer>
        </div>
        <div className='col-12 col-lg-2'>
                <h5 className='mb-1'>Selectionez Une Region:</h5>
                <Select placeholder='Choisir Une Region' options={clientMap}  className='w-100 shadow-sm rounded mb-3' onChange={(e, data) => GetSelectedClients(data.value)} />  
        </div>
    </div>
    <br />
    </> );
}

export default ClientMap;