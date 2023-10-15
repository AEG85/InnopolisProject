import React, { createContext } from 'react'

const Place = {
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            label: '# Загрязнения pm10',
            data: [],
            borderWidth: 1,
            backgroundColor: 'rgba(23, 162, 184, 1)',
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
}
const PlaceContetext = createContext(Place)
export default PlaceContetext