import React from 'react';

const Demo = () => {
    return (
        <div>

            <div className="container mb-20">

                <div>
                    <h1 className="text-center text-4xl mb-3">Starter</h1>
                    <div className="w-16 mx-auto h-1 bg-blue-700 rounded-full mb-10"></div>
                </div>


                <div className="grid grid-cols-2 gap-x-16">

                    <div className="p-3">

                        <div>
                            <img className="w-3/6 mx-auto" src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-gold-select-201810?wid=904&hei=840&fmt=jpeg&qlt=80&.v=1633027804000" alt="" />
                        </div>

                        <div>
                            <h1 className="text-center text-gray-400 text-4xl">Mac Book 13 inc</h1>
                            <h1 className="text-center  text-4xl">From $600</h1>
                        </div>

                    </div>

                    <div className="flex flex-col justify-between">

                        <div className="p-3 flex items-center">

                            <div>
                                <h1 className="text-2xl w-40">Realme Book</h1>
                                <h1 className="text-lg font-semibold">$200</h1>
                            </div>

                            <div>
                                <img className="w-3/6" src="https://images.news18.com/ibnlive/uploads/2021/09/realme-book-slim-main-163118253016x9.jpg" alt="" />
                            </div>

                        </div>

                        <div className="p-3 flex items-center">

                            <div>
                                <h1 className="text-2xl w-40">Rebmi Book</h1>
                                <h1 className="text-lg font-semibold">$200</h1>
                            </div>

                            <div>
                                <img className="w-3/6" src="https://www.notebookcheck.net/fileadmin/Notebooks/Xiaomi/Mi_Notebook_Pro_i5/4zu3mipro.jpg" alt="" />
                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Demo;
