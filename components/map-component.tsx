'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Card } from '@/components/ui/card';

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

interface MapComponentProps {
    location: string;
}

export default function MapComponent({ location }: MapComponentProps) {
    const mapRef = useRef<L.Map | null>(null);
    const mapContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mapContainerRef.current || mapRef.current) return;

        // Default coordinates (Taipei)
        const defaultCoords: [number, number] = [25.0330, 121.5654];

        // Initialize map
        mapRef.current = L.map(mapContainerRef.current).setView(defaultCoords, 13);

        // Add default OpenStreetMap tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19
        }).addTo(mapRef.current);

        // Add marker
        const marker = L.marker(defaultCoords).addTo(mapRef.current);
        marker.bindPopup(location).openPopup();

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, [location]);

    return (
        <Card className="w-full h-[300px] bg-card/30 backdrop-blur-sm border border-border overflow-hidden">
            <div ref={mapContainerRef} className="w-full h-full" />
        </Card>
    );
} 