import React from 'react'
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import _ from 'lodash'

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip)

type BarProps = {
    topComments: string
}

const defaultLabelConfig: String[] = [
    'Red',
    'Blue',
    'Yellow',
    'Green',
    'Purple',
    'Orange',
]
const defaultDataConfig: number[] = [20, 30, 70, 100, 15, 55]

const BarChart = ({ topComments }: BarProps) => {
    const parseComments = JSON.parse(topComments ?? '[]')
    const dataSets: number[] = Object.values(parseComments)

    const data = {
        labels: _.isEmpty(topComments)
            ? defaultLabelConfig
            : Object.keys(parseComments),
        datasets: [
            {
                data: _.isEmpty(topComments)
                    ? defaultDataConfig
                    : Object.values(parseComments),
                backgroundColor: [
                    'red',
                    'blue',
                    'green',
                    'aqua',
                    'red',
                    'blue',
                ],
                borderColor: 'black',
                borderWith: 1,
            },
        ],
    }

    const options = {
        scales: {
            x: {
                max: _.isEmpty(dataSets) ? 100 : Math.max(...dataSets) + 10,
                min: 0,
            },
        },
        indexAxis: 'y' as const,
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
        responsive: true,
        plugins: {
            legend: {
                position: 'right' as const,
            },
        },
    }

    return <Bar className="w-full" data={data} options={options} />
}

export default BarChart
