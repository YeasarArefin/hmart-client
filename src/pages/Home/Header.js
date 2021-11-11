import React from 'react';
import laptop from '../../assets/laptop-bg.png';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div>

            <div className="bg flex mb-20">

                <div className="container items-center grid grid-cols-2">

                    <div className="flex flex-col gap-y-10">

                        <h1 className="text-white text-7xl font-bold">BesT Deals Here To Buy Laptops</h1>
                        <Link to="/explore">
                            <button className="border-2 border-white rounded-lg bg-transparent text-white w-44 py-3 hover:bg-white hover:text-gray-600">Shop All Device</button>
                        </Link>

                    </div>

                    <div>
                        <img className="w-5/6" src={laptop} alt="laptop" />
                    </div>

                </div>

            </div>

        </div>
    );
};

export default Header;
