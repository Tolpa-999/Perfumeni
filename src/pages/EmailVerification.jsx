import React, { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { verifyEmailReq } from "../utils/api"; // Adjust the import path as needed
import { toast } from "react-toastify";

const EmailVerification = () => {
  const [searchParams] = useSearchParams();
  const [verificationStatus, setVerificationStatus] = useState("verifying"); // States: verifying, success, error
  
  

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setVerificationStatus("error");
      toast.error("Invalid verification link. No token provided.");
      return;
    }

    const verifyEmail = async () => {
      try {
        const response = await verifyEmailReq(token);
        setVerificationStatus("success");
        toast.success(response.message || "Email verified successfully!");
      } catch (error) {
        if (error.message == "user already verified") {
          setVerificationStatus("success");
          toast.success("Email already verified successfully!");
          return
        } else {
            setVerificationStatus("error");
        toast.error(error.message || "Email verification failed. Please try again.");
        }
        
        
    }
    };

    verifyEmail();
  }, [searchParams]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-20 rounded-lg text-center">
        {verificationStatus === "verifying" && (
          <p className="text-xl font-bello font-semibold">Verifying your email...</p>
        )}
        {verificationStatus === "success" && (
          <div>
            <p className="text-xl font-bello font-semibold">Email verified <i className="text-green-600">successfully</i> !</p>
            <p className="text-base font-normal font-yasb"><Link to="/signin" className=" underline text-base text-blue-700 ">Login </Link> now</p>
          </div>
        )} 
        {verificationStatus === "error" && (
          <p className="text-xl font-bello font-semibold">Email verification <i className="text-red-600">failed.</i> Please try again.</p>
        )}
      </div>
    </div>
  );
};

export default EmailVerification;