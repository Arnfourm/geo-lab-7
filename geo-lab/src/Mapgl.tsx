import { useEffect, useRef, useState } from 'react';
import { load } from '@2gis/mapgl';
import  mapgl from '@2gis/mapgl/types';
import { FeatureCollection, Geometry, GeoJsonProperties } from 'geojson'; 
import { useMapglContext } from './MapglContext.tsx';
import { useControlRotateClockwise } from './hooks/useControlRotateClockwise.tsx';
import { MapWrapper } from './MapWrapper.tsx';
import { ControlRotateCounterclockwise } from './ControlRotateCounterclockwise.tsx';
import { pointLayer,heatmapLayer } from './layers.tsx';

export default function Mapgl() {
    const [geoData, setGeoData] = useState<FeatureCollection<Geometry, GeoJsonProperties> | null>(null);
    const map_center = [49.112374, 55.801715];
    const { setMapglContext } = useMapglContext();
    const mapRef = useRef<mapgl.Map | null>(null);
    const [styleLoaded, setStyleLoaded] = useState(false);

    useEffect(() => {
        async function loadData() {
            try {
                const response = await fetch('/geo-lab-7/respublika-tatarstan-tatarstan.json');
                const data = await response.json();
                setGeoData(data);
            } catch (e) {
                console.error("Ошибка загрузки GeoJSON:", e);
            }
        }
        loadData();
    }, []);

    useEffect(() => {
        let map: mapgl.Map | undefined = undefined;

        load().then((mapglAPI) => {
            map = new mapglAPI.Map('map-container', {
                center: map_center,
                zoom: 12,
                key: '0e501c0b-df43-4ead-b5f5-bf69b0ce7b97',
                style: '6ab1c10e-1101-4e58-9bc7-11ecd7d4e3e6'
            });
            
            mapRef.current = map;

            map.on('styleload', () => {
                setStyleLoaded(true);
            });
            
            setMapglContext({
                mapglInstance: map,
                mapgl: mapglAPI
            });
        });

        return () => {
            map?.destroy();
            mapRef.current = null;
            setMapglContext({ mapglInstance: undefined, mapgl: undefined});
        };
    }, []);

    useEffect(() => {
        const map = mapRef.current;

        if (!map || !styleLoaded || !geoData) return;

        const source = new (window as any).mapgl.GeoJsonSource(map, {
            data: geoData,
            attributes: {
                visible: true,
            },
        });

        map.addLayer(heatmapLayer as any);
        map.addLayer(pointLayer as any);

        return () => {
            map && map.destroy();
            setMapglContext({ mapglInstance: undefined, mapgl: undefined });
        };
    }, [styleLoaded, geoData]);

    useControlRotateClockwise();

    return (
        <>
            <MapWrapper />
            <ControlRotateCounterclockwise />
        </>
    );
}