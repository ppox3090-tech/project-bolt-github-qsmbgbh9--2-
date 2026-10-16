'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Tooltip, useMap } from 'react-leaflet';

const MAP_STYLES = {
  street: {
    label: 'แผนที่ถนน',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  },
  satellite: {
    label: 'ดาวเทียม',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri',
  },
  terrain: {
    label: 'ภูมิประเทศ',
    url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, SRTM | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a>',
  },
} as const;

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
  const [mapStyle, setMapStyle] = useState<keyof typeof MAP_STYLES>('street');
  const selectedPlace = places.find((p) => p.id === selectedId);
  const activeMapStyle = MAP_STYLES[mapStyle];

  return (
    <div className="relative h-full w-full">
      <label htmlFor="map-style" className="sr-only">รูปแบบแผนที่</label>
      <select
        id="map-style"
        value={mapStyle}
        onChange={(event) => setMapStyle(event.target.value as keyof typeof MAP_STYLES)}
        className="absolute right-3 top-3 z-[1000] max-w-[calc(100%-1.5rem)] rounded-md border border-stone-300 bg-white px-3 py-2 text-sm font-medium text-stone-800 shadow-lg focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
      >
        {Object.entries(MAP_STYLES).map(([value, style]) => (
          <option key={value} value={value}>{style.label}</option>
        ))}
      </select>
      <MapContainer center={center} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          key={mapStyle}
          attribution={activeMapStyle.attribution}
          url={activeMapStyle.url}
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
    </div>
  );
}