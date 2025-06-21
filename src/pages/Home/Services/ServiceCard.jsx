import React from "react";

const ServiceCard = ({ service }) => {
    const {title, description, icon:Icon} = service;

    return (
        <div className="bg-white shadow-md hover:shadow-lg transition duration-300 rounded-3xl px-6 py-10 flex flex-col items-center justify-center text-center gap-4 hover:bg-[#CAEB66]">
        <div className="text-primary text-3xl">
            <Icon />
        </div>
        <h3 className="text-lg font-semibold text-primary">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
        </div>
    );
};

export default ServiceCard;