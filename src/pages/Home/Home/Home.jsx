import React from 'react';
import Banner from '../Banner/Banner';
import Services from '../Services/Services';
import Brands from '../Brands/Brands';
import Benefits from '../Benefits/Benefits'
import BeMerchant from '../BeMerchant/BeMerchant';
import HowItWorks from '../HowItWorks/HowItWorks';

const Home = () => {
    return (
        <div>
            <Banner/>
            <HowItWorks/>
            <Services/>
            <Brands/>
            <div className="divider"></div>
            <Benefits/>
            <div className="divider"></div>
            <BeMerchant/>
            
        </div>
    );
};

export default Home;