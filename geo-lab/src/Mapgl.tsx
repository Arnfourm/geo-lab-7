import { useEffect } from 'react';
import { load } from '@2gis/mapgl';
import  mapgl from '@2gis/mapgl/types';
import { FeatureCollection, Geometry, GeoJsonProperties } from 'geojson'; 
import geoData from "./data/respublika-tatarstan-tatarstan.json";
import { useMapglContext } from './MapglContext.tsx';
import { useControlRotateClockwise } from './hooks/useControlRotateClockwise.tsx';
import { MapWrapper } from './MapWrapper.tsx';
import { ControlRotateCounterclockwise } from './ControlRotateCounterclockwise.tsx';


export default function Mapgl() {
    const map_center = [49.112374, 55.801715];

    const { setMapglContext } = useMapglContext();

    useEffect(() => {
        let map: mapgl.Map | undefined = undefined;

        load().then((mapgl) => {
            map = new mapgl.Map('map-container', {
                center: map_center,
                zoom: 12,
                key: '0e501c0b-df43-4ead-b5f5-bf69b0ce7b97',
                style: '6ab1c10e-1101-4e58-9bc7-11ecd7d4e3e6'
            });

            const data: FeatureCollection<Geometry, GeoJsonProperties> = geoData as FeatureCollection<Geometry, GeoJsonProperties>;

            const source = new mapgl.GeoJsonSource(map, {
                data,
                attributes: {
                    visible: true,
                },
            });

            setMapglContext({
                mapglInstance: map,
                mapgl
            });
        });

        return () => {
            map && map.destroy();
            setMapglContext({ mapglInstance: undefined, mapgl: undefined});
        };
    }, [setMapglContext]);

    useControlRotateClockwise();

    return (
        <>
            <MapWrapper />
            <ControlRotateCounterclockwise />
        </>
    );
}