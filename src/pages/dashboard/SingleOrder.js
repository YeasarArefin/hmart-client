import React from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsCheck2 } from 'react-icons/bs';

const SingleOrder = ({ order, handleDelete, handleStatus }) => {

    const { _id, data, laptop, status } = order;
    console.log(order);
    return (
        <div>

            <div className="grid grid-cols-6 items-center place-items-center p-3 border-b">

                <div>
                    <img width="100px" className="rounded-2xl" src={laptop?.img} alt="order-img" />
                </div>

                <h1 className="font-semibold">{laptop?.name}</h1>
                <h1>{data?.name}</h1>
                <h1>{data?.email}</h1>
                <h1 className={`px-4 py-1 text-white capitalize rounded-full ${status?.type == "pending" ? "bg-yellow-500" : "bg-green-600"} `}>{status?.type}</h1>

                <div className="flex gap-x-4">

                    <button title="Update" onClick={() => handleStatus(_id)} className="p-2 border rounded-full shadow-md bg-green-600 text-red-700 hover:text-white transition duration-300">
                        <BsCheck2 className="text-2xl text-white" />
                    </button>

                    <button title="Delete" onClick={() => handleDelete(_id)} className="p-2 border rounded-full shadow-md bg-red-600 text-white transition duration-300">
                        <AiOutlineDelete className="text-2xl" />
                    </button>

                </div>

            </div>

        </div>
    );
};

export default SingleOrder;