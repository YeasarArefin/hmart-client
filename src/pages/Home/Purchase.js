import React, { useEffect, useState } from 'react';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import { useForm } from "react-hook-form";
import useAuth from '../../hooks/useAuth';
import { Link, useParams, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import Rating from 'react-rating';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

const Purchase = () => {

    const { register, handleSubmit, reset } = useForm();
    const { _id } = useParams();
    const [laptop, setLaptop] = useState({});
    const { user } = useAuth();
    const history = useHistory();

    const onSubmit = data => {
        const newData = { data, laptop: laptop };
        newData.status = { type: "pending" };

        fetch('http://localhost:5000/orders', {

            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newData)

        })
            .then(res => res.json())
            .then(data => {

                if (data) {

                    Swal.fire(
                        'Good job!',
                        'Your Order Has Been Placed',
                        'success',
                        reset()
                    );
                }
                history.push('/');
            })
            .catch((err) => {
                console.log(err);
            });

    };

    useEffect(() => {

        fetch(`http://localhost:5000/laptops/${_id}`)
            .then(res => res.json())
            .then(data => setLaptop(data))
            .catch((err) => {
                console.log(err);
            });

    }, []);

    console.log(laptop);
    return (

        <>

            <section class="text-gray-600 body-font overflow-hidden">
                <div class="container px-5 py-24 mx-auto">
                    <div class="lg:w-4/5 mx-auto flex flex-wrap">
                        <img alt="ecommerce" class="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src={laptop?.img} />
                        <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h2 class="text-sm title-font text-gray-500 tracking-widest">BRAND NAME</h2>
                            <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">{laptop?.title}</h1>
                            <div class="flex mb-4">
                                <span class="flex items-center">
                                    <Rating
                                        className="text-2xl"
                                        initialRating={laptop?.rating}
                                        emptySymbol={<AiOutlineStar className="text-yellow-500" />}
                                        fullSymbol={<AiFillStar className="text-yellow-500" />}
                                        readonly
                                    />
                                    <span class="text-gray-600 ml-3">{laptop?.rating} Reviews</span>
                                </span>
                                <span class="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                                    <a class="text-gray-500">
                                        <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                                        </svg>
                                    </a>
                                    <a class="text-gray-500">
                                        <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                                        </svg>
                                    </a>
                                    <a class="text-gray-500">
                                        <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                                        </svg>
                                    </a>
                                </span>
                            </div>
                            <p class="leading-relaxed">{laptop?.name},{laptop?.discription}</p>
                            <div class="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                                <div class="flex">
                                    <span class="mr-3">Color</span>
                                    <button class="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
                                    <button class="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
                                    <button class="border-2 border-gray-300 ml-1 bg-blue-500 rounded-full w-6 h-6 focus:outline-none"></button>
                                </div>
                                <div class="flex ml-6 items-center">
                                    <span class="mr-3">Size</span>
                                    <div class="relative">
                                        <select class="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 text-base pl-3 pr-10">
                                            <option>SM</option>
                                            <option>M</option>
                                            <option>L</option>
                                            <option>XL</option>
                                        </select>
                                        <span class="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                                            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4" viewBox="0 0 24 24">
                                                <path d="M6 9l6 6 6-6"></path>
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="flex">
                                <span class="title-font font-medium text-2xl text-gray-900">${laptop?.price}</span>
                                <button class="flex ml-auto text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded">Purchse</button>
                                <button class="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                                    <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                                        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <h1 className="text-5xl text-center mb-16">
                Place Order
                <div className="w-20 h-1 bg-blue-500 rounded-full mx-auto mt-3"></div>
            </h1>

            <form className="w-3/6 mx-auto flex flex-col items-center gap-y-8 mb-20" onSubmit={handleSubmit(onSubmit)}>

                <input className="input w-full" {...register("name", { required: true })} defaultValue={user?.displayName} placeholder="Name" />
                <input className="input w-full" {...register("email", { required: true })} defaultValue={user?.email} placeholder="Email" />
                <input className="input w-full"  {...register("adress", { required: true })} placeholder="Adress" />
                <input className="bg-blue-600 hover:bg-blue-800 w-36 mx-auto py-2 rounded-full focus:ring-4 ring-offset-1 transition duration-500 text-white" type="submit" />

            </form>

        </>

    );

};

export default Purchase;