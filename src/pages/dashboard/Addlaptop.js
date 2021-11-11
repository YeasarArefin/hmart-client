import React from 'react';
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';

const Addlaptop = () => {

    const { register, handleSubmit, reset } = useForm();
    const onSubmit = data => {

        fetch('https://boiling-mesa-63450.herokuapp.com/laptops', {

            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)

        })
            .then(res => res.json())
            .then(data => {

                if (data) {
                    Swal.fire(
                        'Good job!',
                        'Your Meal Has Been Added',
                        'success',
                        reset()
                    );
                }
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            });

    };

    return (
        <div>

            <div className="container">

                <h1 className="text-4xl text-center mb-10">
                    Add Laptops
                    <div className="w-20 h-1 bg-blue-700 rounded-full mx-auto mt-3"></div>
                </h1>

                <form className="w-full lg:w-5/6 mx-auto" onSubmit={handleSubmit(onSubmit)}>

                    <div className="flex flex-col gap-y-7 mb-5 ">
                        <input className="input" {...register("name", { required: true })} placeholder="Name" />
                        <textarea className="input h-52" {...register("discription", { required: true })} placeholder="Discription" />

                    </div>

                    <div className="flex flex-col gap-y-7">

                        <input className="input" type="text"{...register("title", { required: true })} placeholder="Title" />
                        <input className="input" type="text"{...register("img", { required: true })} placeholder="Img URL" />
                        <input className="input" type="number" {...register("price", { required: true })} placeholder="Price" />
                        <input className="input" type="number" {...register("rating", { required: true })} placeholder="Rating" step="any" />
                        <button className="w-40 mx-auto px-10 py-3 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition duration-500 focus:ring-4 ring-offset-1" type="submit">Submit</button>

                    </div>

                </form>

            </div>

        </div>


    );
};

export default Addlaptop;
