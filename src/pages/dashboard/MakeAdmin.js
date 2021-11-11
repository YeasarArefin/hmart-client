import React, { useRef } from 'react';
import Swal from 'sweetalert2';

const MakeAdmin = () => {

    const emailRef = useRef('');

    const handleAdminSubmit = (e) => {
        e.preventDefault();

        const email = emailRef.current.value;
        const user = { email };

        fetch('https://boiling-mesa-63450.herokuapp.com/users/admin', {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {

                if (data.modifiedCount > 0) {
                    Swal.fire(
                        'Done',
                        'You Successfully Made Admin!',
                        'success'
                    );
                }

            });

        emailRef.current.value = '';

    };


    return (
        <div className="mt-36">

            <div className="flex flex-col justify-center items-center">

                <div>

                    <h1 className="text-3xl font-semibold mb-3">Make An Admin</h1>
                    <div className="w-16 h-1 mx-auto bg-blue-600 rounded-full mb-14"></div>

                </div>

                <form className="flex flex-col gap-y-10 w-2/5 mx-auto" onSubmit={handleAdminSubmit}>

                    <input ref={emailRef} className="px-3 py-3 rounded-lg border-2 border-gray-200 focus:ring-4 outline-none ring-offset-2  transition duration-500 bg-gray-50" type="email" placeholder="Enter Email" required />

                    <button className="bg-blue-600 hover:bg-blue-800 w-20 mx-auto py-2 rounded-xl focus:ring-4 ring-offset-1 transition duration-500 text-white" type="submit">Submit</button>

                </form>

            </div>

        </div>
    );
};

export default MakeAdmin;
