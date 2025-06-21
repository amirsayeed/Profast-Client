import React from 'react';

const BenefitCard = ({benefit}) => {
    const {image,title,description} = benefit;
    return (
        <div className="card bg-base-200 shadow-md rounded-xl overflow-hidden flex flex-col gap-6 md:flex-row p-6">
            <div>
              <img
                src={image}
                alt={title}
                className="object-cover"
              />
            </div>
            <div className="border border-dashed border-gray-400"></div>
            <div className="flex-1 flex flex-col justify-center p-6">
              
              <h3 className="text-xl text-primary font-semibold mb-3">{title}</h3>
              <p className="text-gray-600">{description}</p>
            </div>
        </div>
    );
};

export default BenefitCard;