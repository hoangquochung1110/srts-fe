import React from "react";
import {
  MapContainer,
  TileLayer,
  MapConsumer,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useState } from "react/cjs/react.development";
import { useNavigate } from "react-router-dom";
import { MemoryForm } from "./MemoryForm";

const icon = L.icon({
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: "https://unpkg.com/leaflet@1.7/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7/dist/images/marker-shadow.png"
});

const Memories = () => {
    const [markers, setMarkers] = useState([]);
    const [form, setForm] = useState({
        'name': '',
        'comment': ''
    })
    const navigate = useNavigate();

    const changeHandler = (e) => {
        let newForm = form;
        newForm[e.target.name] = e.target.value;
        setForm(newForm);
    }
    const submitHandler = (e) => {
        const [lat, lng] = markers;
        const requestData = {
            'name': form['name'],
            'comment': form['comment'],
            'lat': lat,
            'long': lng,
        }
        const authToken = localStorage.getItem('authToken');
        fetch(
            process.env.REACT_APP_BACKEND_URL+'locations/', 
            {   
                method: 'POST',
                headers: {
                    'Authorization': 'Token ' + authToken,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData)
            }
        )
        .then(response => {
            console.log(response.status);
            if (response.status === 201){
                navigate('/');
            } else{
                alert('Fail to add new memory');
            }
        })
        e.preventDefault();
    }

    return (
        <div className="map-container">
            <MapContainer
                center={[50.5, 30.5]}
                zoom={13}
                style={{ height: "100vh" }}
                className="map"
            >
                <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MapConsumer>
                    {(map) => {
                        map.on("click", function (e) {
                            const { lat, lng } = e.latlng;
                            L.marker([lat, lng], { icon }).addTo(map);
                            setMarkers([lat, lng]);
                        });
                    return null;
                    }}
                </MapConsumer>
            </MapContainer>
            <MemoryForm onSubmit={submitHandler} onChange={changeHandler}/>
        </div>
    )
}

export { Memories };