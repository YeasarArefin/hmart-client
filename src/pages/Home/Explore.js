import React, { useEffect, useState } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import Rating from 'react-rating';

const Explore = () => {

    const [laptops, setLaptops] = useState([]);
    useEffect(() => {

        fetch('https://boiling-mesa-63450.herokuapp.com/laptops')
            .then(res => res.json())
            .then(data => setLaptops(data));

    }, []);

    return (

        <div className="container mt-24">

            <div>
                <h1 className=" text-center text-3xl mb-3">Explore Laptops</h1>
                <div className="w-16 h-1 mx-auto bg-blue-600 mb-5 rounded-full"></div>
            </div >

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-20">

                {
                    laptops?.map(laptop => <div>

                        <div className="border shadow-xl border-gray-200 hover:shadow-2xl transition duration-300 w-4/6 h-full mx-auto p-3 rounded-lg">

                            <div>
                                <img width="150px" className="mx-auto" src={laptop?.img} alt="" />
                            </div>

                            <div className="flex flex-col gap-y-5 p-3">
                                <h1 className="text-xl h-28 font-semibold">{laptop?.name}</h1>
                                <h1 className="w-24 text-center text-white py-1 bg-blue-600 rounded-full">{laptop?.title}</h1>
                                <h1 className="text-xl font-bold">$ {laptop?.price}</h1>
                                <div className="flex">
                                    <Rating
                                        className="text-2xl"
                                        initialRating={laptop?.rating}
                                        emptySymbol={<AiOutlineStar className="text-yellow-500" />}
                                        fullSymbol={<AiFillStar className="text-yellow-500" />}
                                        readonly
                                    />
                                    <h1>({laptop?.rating})</h1>
                                </div>
                                <button className="bg-blue-600 py-2 rounded-xl focus:ring-4 ring-offset-1 transition duration-500 text-white">Order</button>
                            </div>

                        </div>

                    </div>)
                }

            </div>

        </div>

    );
};

export default Explore;
