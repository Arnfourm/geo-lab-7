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
        textField: ['get', 'weather'],
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
        'rgb(135, 10, 102)',
        0.4,
        'rgb(161, 0, 189)',
        0.6,
        'rgb(252, 51, 255)',
        0.8,
        'rgb(246, 117, 255)',
        1,
        'rgb(255, 219, 252)',
    ],
    radius: 20,
    intensity: 0.8,
    opacity: 0.8,
    downscale: 1,
    },
};