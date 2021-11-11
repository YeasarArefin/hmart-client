import React, { useEffect, useState } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import Rating from 'react-rating';
import { Link } from 'react-router-dom';

const Products = () => {

    const [laptops, setLaptops] = useState([]);

    useEffect(() => {

        fetch('http://localhost:5000/laptops')
            .then(res => res.json())
            .then(data => setLaptops(data));

    }, []);
    console.log(laptops);
    return (
        <div>

            <div className="container mb-20">

                <div>
                    <h1 className="text-center text-4xl mb-2">Products</h1>
                    <div className="w-16 h-1 bg-blue-700 mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 gap-y-20 lg:grid-cols-3 my-10">

                    {

                        laptops?.slice(0, 6).map(laptop => <div key={laptop?._id}>

                            <div className="border border-gray-200 hover:shadow-2xl transition duration-300 w-full lg:w-4/6 h-full mx-auto p-3 rounded-lg">

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
                                    <Link to={`/purchase/${laptop?._id}`} className="bg-blue-600 py-2 rounded-xl focus:ring-4 ring-offset-1 transition duration-500 text-white text-center">
                                        <button>Order</button>
                                    </Link>
                                </div>

                            </div>

                        </div>)

                    }


                </div>

            </div>

            <div className="bg2">

                <div className="flex flex-col items-center justify-center h-full text-white gap-y-10">

                    <h1 className="text-3xl font-semibold">Smart Fashion</h1>
                    <h1 className="text-3xl lg:text-5xl font-extrabold">With Smart Devices</h1>

                </div>

            </div>

        </div >
    );
};

export default Products;
