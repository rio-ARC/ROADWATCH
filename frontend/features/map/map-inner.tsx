"use client";

import L from "leaflet";
import { Circle, MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { complaints } from "@/lib/mock-data";
import { severityColor } from "@/lib/utils";
import "leaflet/dist/leaflet.css";

function markerIcon(color: string) {
  return L.divIcon({
    className: "roadwatch-marker",
    html: `<div style="width:18px;height:18px;border-radius:999px;background:${color};"></div>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9]
  });
}

export function MapInner({ compact = false }: { compact?: boolean }) {
  const center: [number, number] = [12.9898, 80.2345];
  return (
    <MapContainer center={center} zoom={compact ? 12 : 13} scrollWheelZoom className="h-full min-h-[420px] rounded-md">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {complaints.map((complaint) => {
        const color = severityColor(complaint.analysis.severityScore);
        return (
          <div key={complaint.id}>
            <Circle
              center={[complaint.location.lat, complaint.location.lng]}
              radius={compact ? 500 : 300}
              pathOptions={{ color, fillColor: color, fillOpacity: 0.18, weight: 1 }}
            />
            <Marker position={[complaint.location.lat, complaint.location.lng]} icon={markerIcon(color)}>
              <Popup>
                <strong>{complaint.title}</strong>
                <br />
                {complaint.location.ward}
                <br />
                Severity: {complaint.analysis.severityScore}
              </Popup>
            </Marker>
          </div>
        );
      })}
    </MapContainer>
  );
}
