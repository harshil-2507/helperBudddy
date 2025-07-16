"use client";
import React from "react";
import Link from "next/link";

const SuccessPage = () => (
  <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-white">
    <h1 className="text-4xl font-bold text-green-600 mb-6">Request sent Successfully!</h1>
    <p className="text-lg text-gray-600">Your service request has been submitted. We&apos;ll notify you when itWe&apos;s accepted by a provider.</p>
    <Link
      href="/services"
      className="mt-8 px-6 py-3 border border-green-600 hover:bg-green-600 hover:text-white rounded-full"
    >
      Continue Shopping
    </Link>
  </div>
);

export default SuccessPage;