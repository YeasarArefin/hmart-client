import React, { useEffect, useState } from 'react';
import Rating from 'react-rating';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import Swal from 'sweetalert2';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const MyOrders = () => {

    const [laptops, setLaptops] = useState([]);
    const { user } = useAuth();

    const loadData = async () => {

        const res = await fetch('http://localhost:5000/orders');
        const data = await res.json();
        setLaptops(data);

    };

    useEffect(() => {
        loadData();
    }, []);

    const handleDelete = (_id) => {

        Swal.fire({
            title: 'Are you sure to cancel this order?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {

            if (result.isConfirmed) {

                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                );

                fetch(`http://localhost:5000/orders/${_id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {

                        if (data.deletedCount > 0) {
                            const remainingOrders = laptops.filter(laptop => laptop?._id !== _id);
                            setLaptops(remainingOrders);
                        }

                    })
                    .catch((err) => {
                        console.log(err);
                    });

            }

        });

    };

    const myLaptop = laptops.filter(laptop => laptop?.data.email == user?.email);

    return (

        <div className="container">

            <div className="flex flex-col items-center gap-y-3 mb-8">
                <h1 className="text-4xl font-bold">My Orders</h1>
                <div className="w-16 h-1 bg-blue-500 rounded-full"></div>
            </div>

            <div className="flex flex-col gap-y-10">

                {

                    laptops.length !== 0 ? (

                        myLaptop?.map(laptop => <div key={laptop._id}>

                            <div className="w-4/5 h-full mx-auto flex items-center gap-x-4 p-4 border border-gray-300 rounded-xl hover:shadow-xl transition duration-300">

                                <div>
                                    <img width="300px" className="rounded-md" src={laptop?.laptop.img} alt="my-img" />
                                </div>

                                <div className="flex flex-col gap-y-4">

                                    <h1 className="text-xl font-bold">{laptop?.laptop.name}</h1>
                                    <p className="w-5/6 text-gray-600">{laptop?.laptop.discription}</p>

                                    <div className="flex  gap-x-3">

                                        <h1 className="text-2xl font-bold">${laptop?.laptop.price}</h1>

                                        <Rating className="text-2xl"
                                            emptySymbol={<AiOutlineStar className="text-yellow-500" />}
                                            fullSymbol={<AiFillStar className="text-yellow-500" />}
                                            initialRating={laptop?.laptop.rating}
                                            readonly
                                        />

                                        <span className="text-lg">({laptop?.laptop.rating})</span>
                                        <h1 className={`px-3 py-1 text-white rounded-full ${laptop?.status.type == "pending" ? " bg-yellow-500" : "bg-green-600"} w-24 text-center capitalize`}>{laptop?.status.type}</h1>

                                    </div>

                                </div>

                                <div>
                                    <button onClick={() => handleDelete(laptop?._id)} className="bg-blue-600 hover:bg-blue-800 w-20 mx-auto py-2 rounded-full focus:ring-4 ring-offset-1 transition duration-500 text-white" >Cancle</button>
                                </div>

                            </div>

                        </div>)

                    ) : (

                        <div className="flex flex-col h-full items-center justify-center">
                            <img width="300px" src="https://media.istockphoto.com/vectors/gift-box-vector-id525353196?k=20&m=525353196&s=612x612&w=0&h=shwWPYYYsnEdMSg6yiuW9jX9gztuMvHYKthGQY8mf1U=" alt="empty" />

                            <Link to="/home">
                                <button className="bg-blue-600 hover:bg-blue-800 w-48 gap-x-3 px-3 flex items-center mx-auto py-2 rounded-full focus:ring-4 ring-offset-1 transition duration-500 text-white" ><MdOutlineArrowBackIosNew /> Order From Home</button>
                            </Link>


                        </div>

                    )

                }

            </div>

        </div>
    );
};

export default MyOrders;