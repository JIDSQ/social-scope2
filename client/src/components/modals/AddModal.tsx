import axios from 'axios'
import React from 'react'

interface state {
    token?: string
    id?: string
}

const AddModal = ({ close, setResponse }: any) => {
    const url = import.meta.env.VITE_BASE_URL
    const [form, setForm] = React.useState<state>({
        token: '',
        id: '',
    })
    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    const handleInputChange = (key: string) => (e: any) => {
        setForm((prev) => ({
            ...prev,
            [key]: e.target.value,
        }))
    }

    const handleAdd = async (event: any) => {
        event.preventDefault()

        setIsLoading(true)

        await axios
            .get(`${url}analysis`, {
                params: form,
            })
            .then((resp) => {
                setResponse(resp.data)
                setIsLoading(false)
                close()
            })
            .catch((error) => {
                setIsLoading(false)
            })
    }

    return (
        <div className="modal">
            <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
                <div className="relative bg-white rounded-lg shadow ">
                    <div className="flex justify-between items-center p-5 rounded-t   mx-2">
                        <div className="ml-[1.8rem]">
                            <h3 className=" mt-2 text-xl font-bold  text-black  w-full ">
                                Add a Facebook page to scope
                            </h3>
                            <p>Scope A Page</p>
                        </div>
                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-full shadow-[0_5px_10px_#00000033] text-sm p-1.5 ml-auto inline-flex items-center  "
                            data-modal-toggle="top-left-modal"
                            onClick={close}
                        >
                            <svg
                                aria-hidden="true"
                                className="w-5 h-5 text-primary"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>

                    <div className="flex justify-center gap-10 items-center px-12 p-10 w-full">
                        <div className="w-full">
                            <input
                                type="text"
                                id="token"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                placeholder="Token"
                                value={form.token}
                                onChange={handleInputChange('token')}
                                required
                            />
                        </div>
                        <div className="w-full">
                            <input
                                type="text"
                                id="last_name"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                placeholder="Facebook ID"
                                value={form.id}
                                onChange={handleInputChange('id')}
                                required
                            />
                        </div>
                    </div>
                    <div className="w-full flex justify-center pb-2">
                        <button
                            type="button"
                            className="text-white w-2/6 bg-primary hover:bg-gray-200 hover:text-black rounded-full shadow-[0_5px_10px_#00000033] focus:outline-none focus:ring-4  font-bold  text-sm px-5 py-1.5 text-center mr-2 mb-2 "
                            onClick={(event) => handleAdd(event)}
                        >
                            {isLoading ? 'Loading....' : 'Add'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddModal
