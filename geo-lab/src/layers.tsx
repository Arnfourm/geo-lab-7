export const pointLayer: any = {
    id: 'dtp-data-layer', 
    
    filter: [
        'all',
        [
            'match',
            ['sourceAttr', 'visible'],
            [true],
            true,
            false,
        ]
    ],
    
    type: 'point',

    style: {
        iconImage: 'circle',
        iconWidth: 15,
        textField: ['get', 'category'],
        textFont: ['Noto_Sans'],
        textColor: '#0098ea',
        textHaloColor: '#fff',
        textHaloWidth: 1,
        iconPriority: 100,
        textPriority: 100,
    },
};

export const heatmapLayer: any = {
    id: 'dtp-heatmap-layer',
    filter: [
        'match',
        ['sourceAttr', 'visible'],
        [true],
        true, 
        false,
    ],

    type: 'heatmap',

    style: {
    color: [
        'interpolate',
        ['linear'],
        ['heatmap-density'],
        0,
        'rgba(0, 0, 0, 0)',
        0.2,
        'rgba(172, 32, 135, 1)',
        0.4,
        'rgba(255, 154, 0, 1)',
        0.6,
        'rgba(255, 252, 0, 1)',
        0.8,
        'rgba(255, 255, 63, 1)',
        1,
        'rgba(255, 255, 255, 1)',
    ],
    radius: 20,
    intensity: 0.8,
    opacity: 0.8,
    downscale: 1,
    },
};