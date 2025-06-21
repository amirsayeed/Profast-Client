import React from 'react';
import location from '../../../assets/location-merchant.png'
const BeMerchant = () => {
    return (
        <div data-aos="zoom-in-up" className="my-20 bg-[url('assets/be-a-merchant-bg.png')] bg-no-repeat bg-[#03373D] p-20 rounded-4xl">
        <div className="hero-content flex-col lg:flex-row-reverse">
            <img
            src={location}
            className="max-w-sm rounded-lg shadow-2xl"
            />
            <div>
            <h1 className="text-5xl font-bold">Merchant and Customer Satisfaction is Our First Priority</h1>
            <p className="py-6">
                We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.
            </p>
            <div className='flex gap-5'>
                <button className="btn 
                btn-primary
                text-black rounded-full">Become a Merchant</button>
                <button className="btn rounded-full text-primary btn-outline">Earn with Profast Courier</button>
            </div>
            </div>
        </div>
        </div>
    );
};

export default BeMerchant;