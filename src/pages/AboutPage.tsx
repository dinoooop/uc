import React from "react";

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800">
      <h1 className="text-3xl font-bold mb-4">About UC-Collection</h1>
      <p className="text-lg max-w-lg text-center">
        UC-Collection is a platform for buying and selling high-quality used cars.
        We aim to connect trusted sellers with genuine buyers through a transparent,
        easy-to-use interface powered by Django and React.
      </p>

      <p className="mt-6 text-sm text-gray-500">
        Version 1.0 — Built with ❤️ using Django REST Framework & React.
      </p>
    </div>
  );
};

export default AboutPage;
