import React from "react";
import Marquee from "react-fast-marquee";
import logo1 from '../../../assets/brands/amazon.png';
import logo2 from '../../../assets/brands/casio.png';
import logo3 from '../../../assets/brands/moonstar.png';
import logo4 from '../../../assets/brands/randstad.png';
import logo5 from '../../../assets/brands/start-people 1.png';
import logo6 from '../../../assets/brands/start.png';
import logo7 from '../../../assets/brands/amazon_vector.png';

const brandsLogo = [logo1,logo2,logo3,logo4,logo5,logo6,logo7];

const Brands = () => {
  return (
    <section className="my-20 bg-base-100">
      <h2 className="text-2xl font-bold text-primary text-center mb-6">We've helped thousands of sales teams</h2>
      <Marquee
        pauseOnHover
        speed={50}
        gradient={false}
        direction="left"
        className="flex gap-10"
      >
        {brandsLogo.map((src, idx) => (
          <div key={idx} className="mx-24 flex items-center">
            <img
            src={src}
            alt=''
            className="h-6 object-contain"
            />
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default Brands;
