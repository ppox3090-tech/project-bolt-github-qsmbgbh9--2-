'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Tooltip, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export type MapPlace = {
  id: string;
  username: string;
  latitude: number;
  longitude: number;
  category: string;
};

// เลื่อนแผนที่ไปหาสถานที่ที่ถูกเลือก
function FlyToSelected({ place }: { place: MapPlace | undefined }) {
  const map = useMap();
  useEffect(() => {
    if (place) {
      map.flyTo([place.latitude, place.longitude], Math.max(map.getZoom(), 15));
    }
  }, [place, map]);
  return null;
}

export default function LeafletMap({
  places,
  selectedId,
  onSelect,
  colors,
  center,
}: {
  places: MapPlace[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  colors: Record<string, string>;
  center: [number, number];
}) {
  const selectedPlace = places.find((p) => p.id === selectedId);

  return (
    <MapContainer center={center} zoom={13} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FlyToSelected place={selectedPlace} />

      {places.map((place) => {
        const isSelected = place.id === selectedId;
        const showLabel = isSelected || places.length <= 8;
        return (
          <CircleMarker
            key={`${place.id}-${showLabel}`}
            center={[place.latitude, place.longitude]}
            radius={isSelected ? 11 : 8}
            pathOptions={{
              color: 'white',
              weight: 2,
              fillColor: colors[place.category],
              fillOpacity: 1,
            }}
            eventHandlers={{ click: () => onSelect(place.id) }}
          >
            <Tooltip permanent={showLabel} direction="top" offset={[0, -8]}>
              {place.username}
            </Tooltip>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
}