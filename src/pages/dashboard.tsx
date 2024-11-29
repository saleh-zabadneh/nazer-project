import ShippingForm from "@/components/ShippingForm";
import React from "react";

const Dashboard: React.FC = () => {
  return (
    <div className="container p-4 mx-auto ">
      <h1 className="mb-6 text-3xl font-bold text-right">ارسالية</h1>
      <ShippingForm />
    </div>
  );
};

export default Dashboard;
