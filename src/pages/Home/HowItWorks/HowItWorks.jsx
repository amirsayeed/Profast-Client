import React from 'react';
import { FaTruck, FaMoneyBillWave } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";
import { RiBuilding2Line } from "react-icons/ri";
import HowItWorksCard from './HowItWorksCard';

const howItWorksData = [
  {
    id: 1,
    title: "Booking Pick & Drop",
    description: "From personal packages to business shipments — we deliver on time, every time.",
    icon: FaTruck
  },
  {
    id: 2,
    title: "Cash On Delivery",
    description: "Receive payments securely at your doorstep with our reliable COD service.",
    icon: FaMoneyBillWave
  },
  {
    id: 3,
    title: "Delivery Hub",
    description: "Easily manage parcel logistics through our smart, local delivery hubs.",
    icon: MdLocalShipping
  },
  {
    id: 4,
    title: "Booking SME & Corporate",
    description: "Tailored logistics solutions designed to support your growing business needs.",
    icon: RiBuilding2Line
  }
];

const HowItWorks = () => {
    return (
        <section className="my-16">
        <div data-aos="zoom-in-right" className="container mx-auto p-10">
            <h2 className="text-3xl font-bold text-center mb-10 text-primary">How It Works</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {howItWorksData.map(step => (
                <HowItWorksCard
                key={step.id}
                step={step}
                />
            ))}
            </div>
        </div>
        </section>
    );
};

export default HowItWorks;