import React from 'react'
import { RingProgress } from '@ant-design/plots'
import axios from 'axios'
import _ from 'lodash'
import Logo from '../assets/Image 1.png'
import Mask from '../assets/MaskGroup 1.svg'
import { useCreateModal } from '../shared/Modal'
import AddModal from './modals/AddModal'
import BarChart from './BarChart'

type configType = {
    height: number
    width: number
    autoFit: boolean
    percent: number
    color: string[]
}

interface configInterface {
    positive: configType
    negative: configType
    overall: configType
}

const config: configInterface = {
    positive: {
        height: 70,
        width: 70,
        autoFit: false,
        percent: 0.35,
        color: ['#BD4F6C', '#E8EDF3'],
    },
    negative: {
        height: 70,
        width: 70,
        autoFit: false,
        percent: 0.65,
        color: ['#BD4F6C', '#E8EDF3'],
    },
    overall: {
        height: 70,
        width: 70,
        autoFit: false,
        percent: 0.8,
        color: ['#BD4F6C', '#E8EDF3'],
    },
}

interface response {
    response: {
        facebook?: string
    }
}

const Dashboard = () => {
    const [response, setResponse] = React.useState<any>({})

    console.log(response)

    console.log(response)

    const config: configInterface = {
        positive: {
            height: 70,
            width: 70,
            autoFit: false,
            percent: !_.isEmpty(response)
                ? (parseInt(response.comments_positive) /
                      parseInt(response.total_comments)) *
                  1
                : 0.35,
            color: ['#BD4F6C', '#E8EDF3'],
        },
        negative: {
            height: 70,
            width: 70,
            autoFit: false,
            percent: !_.isEmpty(response)
                ? (parseInt(response.comments_negative) /
                      parseInt(response.total_comments)) *
                  1
                : 0.35,
            color: ['#BD4F6C', '#E8EDF3'],
        },
        overall: {
            height: 70,
            width: 70,
            autoFit: false,
            percent: !_.isEmpty(response)
                ? (parseInt(response.comments_neutral) /
                      parseInt(response.total_comments)) *
                  1
                : 0.35,
            color: ['#BD4F6C', '#E8EDF3'],
        },
    }

    const createModal = useCreateModal('add_page')

    const handleModalAdd = () => {
        createModal({
            content: (close): any => (
                <AddModal close={close} setResponse={setResponse} />
            ),
        })
    }

    return (
        <div className="p-4 sm:ml-64">
            <div className=" mb-4">
                <h1 className="text-2xl mb-2">Facebook Page Analytics</h1>
                <button
                    onClick={handleModalAdd}
                    type="button"
                    className="text-white bg-primary hover:bg-secondary focus:ring-4  font-medium rounded-lg text-sm px-8 py-1 mr-2 mb-2 "
                >
                    Add Page
                </button>
            </div>
            <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg ">
                <div className="flex items-center gap-4 mb-10 rounded  ">
                    <img src={Logo} className="w-16 h-16" alt="" />
                    <div>
                        <p className="text-xl text-textPrimary font-bold ">
                            {!_.isEmpty(response)
                                ? response.facebook?.name
                                : 'Facebook Page Name'}
                        </p>
                        <div className="flex gap-4 text-textSecondary">
                            <p> 22k likes</p>
                            <p> 23k followers</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-3 grid-flow-col gap-4 mb-10">
                    <div className=" flex items-center justify-center  rounded  ">
                        <div className="w-[50rem] max-w-[50rem] bg-white border  border-gray-200 rounded-lg  ">
                            <div className="h-[7rem] max-h-[7rem] p-5 bg-secondary bg-divImg bg-no-repeat bg-right rounded-t-lg text-white bg-contain">
                                <a href="#">
                                    <h5 className="mb-2 text-xl ">
                                        Top five negative phrases
                                    </h5>
                                </a>
                                <p className="text-sm mb-5">
                                    Total negative comments contextualized
                                </p>
                                <p className="text-sm ">
                                    {!_.isEmpty(response)
                                        ? response.comments_negative
                                        : ''}
                                </p>
                            </div>
                            <div className="p-5">
                                <p className="flex justify-center mb-3 font-normal  text-gray-400">
                                    {/* {!_.isEmpty(response)
                                        ? response.top_negative_comments
                                        : 'Tempor dolor aute laboris dolor est enim laborum culpa veniam magna nulla ut. Dolor amet sit anim dolore. Excepteur aliqua est sit irure ex Lorem. Consectetur proident duis reprehenderit in proident id incididunt officia laboris ea officia est.'}
                               */}
                                    <BarChart
                                        topComments={
                                            response?.top_negative_comments
                                        }
                                    />
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2 items-center justify-center rounded ">
                        <div className=" flex items-center justify-center rounded h-full ">
                            <div className=" bg-white border h-[100%] max-w-[100%] border-gray-200 rounded-lg shadow ">
                                <div className="h-[7rem] max-h-[7rem] p-5 bg-secondary bg-divImg bg-no-repeat bg-right rounded-t-lg text-white bg-contain">
                                    <a href="#">
                                        <h5 className="mb-2 text-xl ">
                                            Most requested change
                                        </h5>
                                    </a>
                                </div>
                                <div className="p-4">
                                    <ul className=" p-4">
                                        <li>
                                            {!_.isEmpty(response) ? (
                                                response.suggestion
                                                    .split('\n')
                                                    .map(
                                                        (
                                                            value: string,
                                                            index: string
                                                        ) => (
                                                            <p
                                                                key={index}
                                                                className="mb-3 font-normal text-gray-400 "
                                                            >
                                                                {' '}
                                                                {value}
                                                            </p>
                                                        )
                                                    )
                                            ) : (
                                                <p className="mb-3 font-normal text-gray-400 ">
                                                    Lorem, ipsum dolor sit amet
                                                    consectetur adipisicing
                                                    elit. Placeat eligendi
                                                    provident molestiae, laborum
                                                    dolorum ab quam atque
                                                    asperiores, nisi incidunt
                                                    sint quisquam earum hic, ut
                                                    error repudiandae eveniet
                                                    culpa minus.
                                                </p>
                                            )}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center  h-24 rounded shadow-2xl ">
                        <div className=" flex gap-4 w-full p-6 bg-white border border-gray-200 rounded-lg shadow ">
                            <RingProgress {...config.positive} />
                            <div className="border-l-2 px-4">
                                <span className="block">Positive </span>
                                <span className="block text-textSecondary">
                                    {!_.isEmpty(response.comments_positive)
                                        ? parseInt(response.comments_positive)
                                        : 2232}{' '}
                                    <span>Total Positive Comments</span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center  h-24 rounded shadow-2xl ">
                        <div className=" flex gap-4 w-full p-6 bg-white border border-gray-200 rounded-lg shadow ">
                            <RingProgress {...config.negative} />
                            <div className="border-l-2 px-4">
                                <span className="block">Negative </span>
                                <span className="block text-textSecondary">
                                    {!_.isEmpty(response.comments_negative)
                                        ? parseInt(response.comments_negative)
                                        : 8832}{' '}
                                    <span>Total Negative Comments</span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center  h-24 rounded shadow-2xl ">
                        <div className=" flex gap-4 w-full p-6 bg-white border border-gray-200 rounded-lg shadow ">
                            <RingProgress {...config.overall} />
                            <div className="border-l-2 px-4">
                                <span className="block">Neutral </span>
                                <span className="block text-textSecondary">
                                    {!_.isEmpty(response.comments_neutral)
                                        ? parseInt(response.comments_neutral)
                                        : 924}{' '}
                                    <span>Total Neutral Comments</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
