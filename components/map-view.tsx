'use client';

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { Card } from '@/components/ui/card';

interface MapViewProps {
    location: string;
}

// Dynamically import Leaflet with no SSR
const MapComponent = dynamic(() => import('./map-component'), {
    ssr: false,
    loading: () => (
        <Card className="w-full h-[300px] bg-card/30 backdrop-blur-sm border border-border overflow-hidden">
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                Loading map...
            </div>
        </Card>
    )
});

export function MapView({ location }: MapViewProps) {
    return <MapComponent location={location} />;
} 