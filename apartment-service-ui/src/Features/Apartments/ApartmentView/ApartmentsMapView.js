import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import L from "leaflet";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

export function ApartmentsMapView({ apartments }) {
  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
    });
  }, []);

  return (
    <div className="mapContainer">
      <MapContainer center={[51.0, 19.0]} zoom={2} maxZoom={18}>
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/vijayprwyd/cknrfvya10r9z17qry40gainq/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoidmlqYXlwcnd5ZCIsImEiOiJja25yY3Uza2QwZWVlMnBvNzBvNTMwaDdsIn0.eBKs_YeyzFMUGXBzHGG7IQ`}
          attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
        />

        {apartments.map((apartment) => (
          <Marker
            key={apartment._id}
            position={apartment.location.cordinates}
          >
            <Popup>{apartment.location.description}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
