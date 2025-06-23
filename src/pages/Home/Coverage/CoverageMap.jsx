import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet icon URLs for React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});


const FlyToDistrict = ({ district }) => {
  const map = useMap();

  useEffect(() => {
    if (district) {
      map.flyTo([district.latitude, district.longitude], 10, { duration: 1.5 });
    }
  }, [district, map]);

  return null;
};

const CoverageMap = ({ data,search }) => {
  const center = [23.685, 90.3563]; // Bangladesh center
  const matchedDistrict = data.find((d) =>
    d.district.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto h-[700px] overflow-hidden shadow-lg my-12">
      <MapContainer
        center={center}
        zoom={7}
        scrollWheelZoom={true}
        className="w-full h-full rounded-xl z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {data.map((loc, i) => (
          <Marker key={i} position={[loc.latitude, loc.longitude]}>
            <Popup>
              <div className="text-sm">
                <strong>{loc.district}</strong> ({loc.region})<br />
                <span className="text-xs">
                  <strong>Areas:</strong> {loc.covered_area.join(", ")}
                </span>
              </div>
            </Popup>
          </Marker>
        ))}

        {matchedDistrict && <FlyToDistrict district={matchedDistrict} />}
      </MapContainer>
    </div>
  );
};

export default CoverageMap;
