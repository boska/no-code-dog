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

        // Initialize map with disabled interactions
        mapRef.current = L.map(mapContainerRef.current, {
            dragging: false,      // Disable pan/drag
            touchZoom: false,     // Disable touch zoom
            doubleClickZoom: false, // Disable double click zoom
            scrollWheelZoom: false, // Disable scroll wheel zoom
            boxZoom: false,       // Disable box zoom
            keyboard: false,      // Disable keyboard navigation
            zoomControl: false,   // Remove zoom control buttons
        });

        // Add default OpenStreetMap tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19
        }).addTo(mapRef.current);

        // Add markers
        const taiwanMarker = L.marker(locations.taiwan.coords).addTo(mapRef.current);
        const pragueMarker = L.marker(locations.prague.coords).addTo(mapRef.current);

        // Add connecting line with custom style
        const connectionLine = L.polyline(
            [locations.taiwan.coords, locations.prague.coords],
            {
                color: '#FF6B6B',  // Line color
                weight: 2,         // Line thickness
                opacity: 0.8,      // Line opacity
                dashArray: '10, 10', // Creates a dashed line
                smoothFactor: 1
            }
        ).addTo(mapRef.current);

        // Add animation to the line (optional)
        const animate = () => {
            const offset = (Date.now() / 100) % 20;
            connectionLine.setStyle({ dashOffset: offset.toString() });
            requestAnimationFrame(animate);
        };
        animate();

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