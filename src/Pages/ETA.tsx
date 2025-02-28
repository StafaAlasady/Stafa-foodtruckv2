import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import backgroundImage from "../assets/black-thread--light--1920x1080.png";
import { useGetOrderByIdQuery } from "../Api/ProjectApi";

const ETA: React.FC = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const { data: orderResponse, error, isLoading } = useGetOrderByIdQuery({ id: orderId || "" });


  const order = orderResponse?.order;

  useEffect(() => {
    if (error) {
      console.error("Error fetching order data:", error);
    }

    if (order) {
      console.log("Order data:", order);
    }
  }, [order, error]);

  useEffect(() => {
    if (order && order.eta) {
      const etaTime = new Date(order.eta).getTime();
      const timer = setTimeout(() => {
        console.log("Navigating to receipt with order:", order);
        navigate(`/receipt/${orderId}`, { state: order });
      }, etaTime);

      return () => clearTimeout(timer);
    }
  }, [order, navigate, orderId]);

  if (isLoading) return <p className="text-center text-white">Loading ETA...</p>;
  if (error) return <p className="text-center text-red-500">Error fetching ETA.</p>;
  if (!order) return <p className="text-center text-white">Order not found.</p>;

  const localTimestamp = new Date(order.timestamp).toLocaleString("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const localETA = new Date(order.eta).toLocaleString("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  return (
    <div
      className="min-h-screen flex justify-center items-center p-6 text-white"
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="w-full max-w-2xl bg-gray-800 shadow-xl rounded-2xl p-8 min-h-[500px] flex flex-col justify-center">
        <h2 className="text-xl font-semibold text-center text-gray-300">Order ID: {order.id}</h2>

        <p className="text-center text-gray-400 mt-2">
          Order placed at: {localTimestamp}
        </p>

        <h1 className="text-2xl font-bold text-center mt-4">Estimated Time of Arrival</h1>
        <p className="text-lg mt-4 text-center">Your order will be ready at: {localETA}</p>

        <div className="mt-8">
          <button
            onClick={() => navigate("/")}
            className="w-full px-4 py-3 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Start New Order
          </button>

          <button
            onClick={() => {
              console.log("Navigating to receipt with order:", order);
              navigate(`/receipt/${orderId}`, { state: order });
            }}
            className="mt-4 w-full px-4 py-3 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            SE KVITTO
          </button>
        </div>
      </div>
    </div>
  );
};

export default ETA;