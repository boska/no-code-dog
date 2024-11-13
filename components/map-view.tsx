'use client';

import dynamic from 'next/dynamic';
import { Card } from '@/components/ui/card';

const MapComponent = dynamic(() => import('./map-component'), {
    ssr: false,
    loading: () => (
        <Card className="w-full max-w-[1200px] mx-auto h-[300px] bg-card/30 backdrop-blur-sm border border-border overflow-hidden">
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                Loading map...
            </div>
        </Card>
    )
});

export function MapView() {
    return (
        <div className="w-full">
            <MapComponent />
        </div>
    );
} 