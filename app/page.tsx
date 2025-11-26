'use client';

import FloatingImage from '@/components/FloatingImage';
import { useEffect, useState } from 'react';

interface PinImage {
    url: string;
    board: string;
}

interface PinsData {
    images: PinImage[];
}

export default function Home() {
    const [pins, setPins] = useState<PinImage[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Load pins from JSON file
        fetch('/pins.json')
            .then((res) => res.json())
            .then((data: PinsData) => {
                setPins(data.images);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error loading pins:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-2xl text-white/70 animate-pulse">Loading your dreamy wall...</div>
            </div>
        );
    }

    if (pins.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <h1 className="text-3xl text-white/90 mb-4">No images found</h1>
                    <p className="text-white/60 mb-6">
                        Run the scraper to populate your wall with beautiful images
                    </p>
                    <code className="bg-white/10 px-4 py-2 rounded text-white/80">
                        npm run scrape
                    </code>
                </div>
            </div>
        );
    }

    return (
        <div className="relative w-full min-h-screen overflow-hidden">
            {pins.map((pin, index) => (
                <FloatingImage
                    key={`${pin.url}-${index}`}
                    src={pin.url}
                    alt={`Pin from ${pin.board}`}
                    index={index}
                />
            ))}
        </div>
    );
}
