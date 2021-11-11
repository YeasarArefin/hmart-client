import React from 'react';
import { useForm } from "react-hook-form";
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import Rating from 'react-rating';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';

const AddReview = () => {
    const [rating, setRating] = React.useState();
    const { register, handleSubmit, reset } = useForm();
    const { user } = useAuth();

    const onSubmit = data => {
        data['rating'] = rating;
        data['image'] = user.photoURL;
        data['email'] = user.email;
        fetch('http://localhost:5000/reviews', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    Swal.fire(
                        'Good job!',
                        'You clicked the button!',
                        'success'
                    );
                    reset();
                }
            });

    };

    return (
        <div>

            <div>

                <h1 className="text-center font-semibold text-3xl mb-2">Review</h1>
                <div className="w-16 h-1 bg-blue-600 rounded-full mx-auto"></div>

            </div>

            <form className="w-4/5 mx-auto" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col space--6 py-12">
                    <div className="flex flex-col space-y-6 items-center">
                        {/* name  */}
                        <input
                            className="input input-bordered h-14  w-full"
                            type="text"
                            value={user.displayName}
                            placeholder="Your Name"
                            {...register("name", { required: true })}
                        />
                        {/* write a review  */}
                        <textarea
                            className="input textarea h-48 textarea-bordered resize-none w-full"
                            placeholder="Write a review"
                            {...register("review", { required: true })}
                        >
                        </textarea>

                        {/* rating  */}
                        <div className="flex flex-col space-y-3">
                            <p className="text-gray-600 font-primary text-center font-semibold">Give a rating</p>
                            <Rating
                                onChange={(rate) => setRating(rate)}
                                emptySymbol={<AiOutlineStar className="text-gray-600 text-3xl" />}
                                fullSymbol={<AiFillStar className="text-yellow-500 text-3xl" />}
                            />
                        </div>
                        <button className="bg-blue-600 hover:bg-blue-800 w-24 mx-auto py-2 rounded-xl focus:ring-4 ring-offset-1 transition duration-500 text-white" type="submit">Add </button>

                    </div>

                </div>
            </form>
        </div>
    );
};

export default AddReview;