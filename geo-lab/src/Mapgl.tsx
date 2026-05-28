import { useEffect, useRef, useState } from 'react';
import { load } from '@2gis/mapgl';
import  mapgl from '@2gis/mapgl/types';
import { FeatureCollection, Geometry, GeoJsonProperties } from 'geojson'; 
import { useMapglContext } from './MapglContext.tsx';
import { useControlRotateClockwise } from './hooks/useControlRotateClockwise.tsx';
import { MapWrapper } from './MapWrapper.tsx';
import { ControlRotateCounterclockwise } from './ControlRotateCounterclockwise.tsx';
import { pointLayer,heatmapLayer } from './layers.tsx';

type MapglProps = {
    showAccidents: boolean;
    showHeatLayer: boolean;
};

export default function Mapgl({
    showAccidents,
    showHeatLayer
} : MapglProps) {
    const [geoData, setGeoData] = useState<FeatureCollection<Geometry, GeoJsonProperties> | null>(null);
    const map_center = [49.112374, 55.801715];
    const { setMapglContext } = useMapglContext();
    const mapRef = useRef<mapgl.Map | null>(null);
    const [styleLoaded, setStyleLoaded] = useState(false);

    useEffect(() => {
        async function loadData() {
            try {
                const response = await fetch('/geo-lab-7/respublika-tatarstan-tatarstan.json');
                const data: FeatureCollection<Geometry, GeoJsonProperties> = await response.json();
                setGeoData(data);
            } catch (e) {
                console.error("Ошибка загрузки:", e);
            }
        }

        loadData();
    }, []);

    useEffect(() => {
        let map: mapgl.Map;
        let cancelled = false;

        load().then((mapglAPI) => {
            if (cancelled) return

            map = new mapglAPI.Map('map-container', {
                center: map_center,
                zoom: 12,
                key: '0e501c0b-df43-4ead-b5f5-bf69b0ce7b97',
                style: '6ab1c10e-1101-4e58-9bc7-11ecd7d4e3e6'
            });
            
            mapRef.current = map;
            
            map.on('styleload', () => {
                if (!cancelled) setStyleLoaded(true);
            });

            setMapglContext({
                mapglInstance: map,
                mapgl: mapglAPI
            });
        })
        .catch((e) => {
            console.error('Ошибка инициализации', e);
        });

        return () => {
            cancelled = true;
            map?.destroy();
            mapRef.current = null;
            setStyleLoaded(false);
            setMapglContext({ mapglInstance: undefined, mapgl: undefined});
        };
    }, [setMapglContext]);

    useEffect(() => {
        const map = mapRef.current;
        if (!map || !styleLoaded || !geoData) return;

        const source = new (window as any).mapgl.GeoJsonSource(map, {
        data: geoData,
        attributes: { visible: true },
        });

        return () => {
            source?.destroy();
        };
    }, [styleLoaded, geoData]);

    useEffect(() => {
        const map = mapRef.current;

        if (!map || !styleLoaded) return;

        if (showAccidents) {
            map.addLayer(pointLayer);
        } else {
            map.removeLayer('dtp-data-layer');
        }
        
    }, [showAccidents, styleLoaded]);

    useEffect(() => {
        const map = mapRef.current;

        if (!map || !styleLoaded) return;

        if (showHeatLayer) {
            map.addLayer(heatmapLayer);
        } else {
            map.removeLayer('dtp-heatmap-layer');
        }
    }, [showHeatLayer, styleLoaded]);

    useControlRotateClockwise();

    return (
        <>
            <MapWrapper />
            <ControlRotateCounterclockwise />
        </>
    );
}