import { useEffect, useRef } from "react";
import Map from "ol/Map.js";
import View from "ol/View.js";
import TileLayer from "ol/layer/Tile.js";
import OSM from "ol/source/OSM.js";
import { fromLonLat } from "ol/proj.js";
import Feature from "ol/Feature.js";
import Point from "ol/geom/Point.js";
import { Vector as VectorLayer } from "ol/layer.js";
import { Vector as VectorSource } from "ol/source.js";
import { Style, Icon } from "ol/style.js";
import "ol/ol.css";

type Location = {
  id: string;
  lat: number;
  lng: number;
  title: string;
  price: string;
  image: string;
};

type Props = {
  locations: Location[];
  onMarkerClick?: (location: Location) => void;
  center?: [number, number];
  zoom?: number;
};

function OpenLayersMap({
  locations,
  onMarkerClick = () => {},
  center = [-17.4677, 14.7167],
  zoom = 12,
}: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat(center),
        zoom,
      }),
    });

    mapInstanceRef.current = map;

    const markersSource = new VectorSource();
    const markersLayer = new VectorLayer({
      source: markersSource,
    });

    map.addLayer(markersLayer);

    locations.forEach((location) => {
      const marker = new Feature({
        geometry: new Point(fromLonLat([location.lng, location.lat])),
        properties: location,
      });

      marker.setStyle(
        new Style({
          image: new Icon({
            src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23000000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z'/%3E%3Ccircle cx='12' cy='10' r='3'/%3E%3C/svg%3E",
            scale: 1.5,
            anchor: [0.5, 1],
          }),
        }),
      );

      markersSource.addFeature(marker);
    });

    map.on("click", (event) => {
      map.forEachFeatureAtPixel(event.pixel, (feature) => {
        const properties = feature.get("properties");
        if (properties) {
          onMarkerClick(properties);
        }
      });
    });

    return () => {
      map.setTarget(undefined);
    };
  }, [locations, center, zoom, onMarkerClick]);

  return (
    <div ref={mapRef} className="w-full h-full rounded-lg overflow-hidden" />
  );
}

export default OpenLayersMap;
