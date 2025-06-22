import React from 'react';

const HowItWorksCard = ({step}) => {
    const { title, description, icon: Icon } = step;

    return (
         <div className="card bg-base-200 shadow-md p-8 rounded-3xl hover:shadow-xl transition">
        <div className="flex flex-col items-start gap-4">
            <Icon className="text-4xl text-primary"/>
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="text-sm font-medium">{description}</p>
        </div>
        </div>
    );
};

export default HowItWorksCard;