import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetOrderByIdQuery } from "../Api/ProjectApi";

const ETA: React.FC = () => {
  const { orderId } = useParams(); // order kommer från url
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetOrderByIdQuery({ id: orderId! }); // orderid blir använt
  const [eta, setEta] = useState<number | null>(null);

  useEffect(() => {
    if (data && data.eta) {
      setEta(data.eta);
      setTimeout(() => {
        navigate(`/receipt/${orderId}`);
      }, data.eta * 1000); // millisekunds konvertering
    }
  }, [data, navigate, orderId]);

  if (isLoading) return <p>Fetching ETA...</p>;
  if (isError) return <p>Error fetching ETA.</p>;
  if (!eta) return <p>Estimating time...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-2xl font-bold">Estimated Time of Arrival</h1>
      <p className="text-lg mt-2">Your order will be ready in approximately {eta} minutes.</p>
      <p className="mt-4">You will be redirected to your receipt once it's ready.</p>
    </div>
  );
};

export default ETA;
