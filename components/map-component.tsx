'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Card } from '@/components/ui/card';

const locations = {
    taiwan: { name: 'Taiwan', coords: [25.0330, 121.5654] as [number, number] },
    prague: { name: 'Prague', coords: [50.0755, 14.4378] as [number, number] }
};

// Fix for default marker icons
const DefaultIcon = L.icon({
    iconUrl: '/leaflet/marker-icon.png',
    iconRetinaUrl: '/leaflet/marker-icon-2x.png',
    shadowUrl: '/leaflet/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function MapComponent() {
    const mapRef = useRef<L.Map | null>(null);
    const mapContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mapContainerRef.current || mapRef.current) return;

        // Initialize map
        mapRef.current = L.map(mapContainerRef.current);

        // Add default OpenStreetMap tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19
        }).addTo(mapRef.current);

        // Add markers
        const taiwanMarker = L.marker(locations.taiwan.coords).addTo(mapRef.current);
        const pragueMarker = L.marker(locations.prague.coords).addTo(mapRef.current);

        // Add popups
        taiwanMarker.bindPopup('Taiwan').openPopup();
        pragueMarker.bindPopup('Prague');

        // Create bounds for both markers
        const bounds = L.latLngBounds([locations.taiwan.coords, locations.prague.coords]);

        // Fit map to show both markers with padding
        mapRef.current.fitBounds(bounds, {
            padding: [50, 50],
            maxZoom: 5
        });

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, []);

    return (
        <Card className="w-full max-w-[1200px] mx-auto h-[300px] bg-card/30 backdrop-blur-sm border border-border overflow-hidden">
            <div ref={mapContainerRef} className="w-full h-full" />
        </Card>
    );
} 