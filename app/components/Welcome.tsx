
"use client";

import { useState } from "react";
import { IoMdCube } from "react-icons/io";
import { MdOutlineInventory } from "react-icons/md";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { TbReportSearch } from "react-icons/tb";

import SigninForm from "./SigninForm";
import SignupForm from "./SignupForm";

export default function Welcome() {
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");

  return (
    <div className="min-h-screen bg-white md:flex">

      {/* ================= LEFT - WELCOME ================= */}
      <div className="w-full bg-blue-950 px-10 py-12 md:w-1/2 md:px-16 lg:px-20">
        
        {/* Header */}
        <div className="flex flex-col items-center justify-center text-center">
          <span className="flex h-24 w-24 items-center justify-center rounded-full bg-white/10 shadow-2xl">
            <IoMdCube className="text-7xl text-white" />
          </span>

          <h1 className="mt-4 font-sans text-3xl font-bold text-white">
            Inventory & Sales
          </h1>

          <p className="font-sans text-2xl text-gray-400">
            Management System
          </p>

          <p className="mt-6 max-w-md text-center font-sans text-lg text-gray-400">
            Manage your products, sales, purchases, and inventory — all in one
            place.
          </p>
        </div>

        {/* Features */}
        <div className="mx-auto mt-12 flex max-w-md flex-col gap-6">

          {/* Track Inventory */}
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10 shadow-2xl">
              <MdOutlineInventory className="text-2xl text-white" />
            </span>

            <div>
              <h2 className="font-sans text-sm font-bold text-white">
                Track Inventory
              </h2>

              <p className="font-sans text-xs text-gray-400">
                Keep your stock updated
              </p>
            </div>
          </div>

          {/* Manage Sales */}
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10 shadow-2xl">
              <MdOutlineProductionQuantityLimits className="text-2xl text-white" />
            </span>

            <div>
              <h2 className="font-sans text-sm font-bold text-white">
                Manage Sales
              </h2>

              <p className="font-sans text-xs text-gray-400">
                Process orders quickly
              </p>
            </div>
          </div>

          {/* Generate Reports */}
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10 shadow-2xl">
              <TbReportSearch className="text-2xl text-white" />
            </span>

            <div>
              <h2 className="font-sans text-sm font-bold text-white">
                Generate Reports
              </h2>

              <p className="font-sans text-xs text-gray-400">
                Make better decisions
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= RIGHT - AUTH ================= */}
      <div className="flex w-full items-center justify-center bg-gray-50 px-6 py-4 md:w-1/2">
        <div className="w-full max-w-md">

          {/* Conditional Form */}
          {authMode === "signin" ? (
            <SigninForm />
          ) : (
            <SignupForm />
          )}

          {/* Switch Auth Mode */}
          <div className=" text-center text-sm text-gray-500 mt-4">
            {authMode === "signin" ? (
              <>
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => setAuthMode("signup")}
                  className="font-semibold text-blue-700 hover:underline cursor-pointer"
                >
                  Create account
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setAuthMode("signin")}
                  className="font-semibold text-blue-700 hover:underline cursor-pointer"
                >
                  Sign in
                </button>
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

