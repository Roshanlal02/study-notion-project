import React from "react";
import { useSelector } from "react-redux";
import { LuEdit } from "react-icons/lu";
import CTAButton from "../HomePage/Button";

const MyProfile = () => {
  const { user } = useSelector((state) => state.profile);
  return (
    <div className="text-white">
      <h1 className="font-medium text-3xl mb-6">My Profile</h1>

      <div className="p-8">
        {/* section 1 */}
        <div className="border border-richblack-700 p-8 rounded-lg mb-8 flex justify-between items-center bg-richblack-800">
          <div className="flex gap-6 items-center">
            <img
              src={user?.image}
              alt={`profile-${user?.firstName}`}
              className="aspect-square w-[78px] rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-lg text-richblack-5">
                {" "}
                {user?.firstName + " " + user?.lastName}{" "}
              </p>
              <p className="font-normal text-sm text-richblack-300">
                {" "}
                {user?.email}
              </p>
            </div>
          </div>
          <CTAButton active linkTo={"/dashboard/settings"}>
            <div className="flex items-center gap-3">
              <LuEdit /> Edit
            </div>
          </CTAButton>
        </div>

        {/* section 2 */}
        <div className="border border-richblack-700 p-8 rounded-lg mb-8 bg-richblack-800">
          <div className="flex justify-between items-center pb-6">
            <p className="font-semibold text-lg text-richblack-5">About</p>
            <CTAButton active linkTo={"/dashboard/settings"}>
              <div className="flex items-center gap-3">
                <LuEdit /> Edit
              </div>
            </CTAButton>
          </div>
          <p className="font-medium text-sm text-richblack-5">
            {" "}
            {user?.additionalDetails?.about ?? "Write Something about Yourself"}
          </p>
        </div>

        {/* section 3 */}
        <div className="border border-richblack-700 p-8 rounded-lg bg-richblack-800">
          <div className="flex justify-between items-center pb-6">
            <p className="font-semibold text-lg text-richblack-5">
              Personal Details
            </p>
            <CTAButton active linkTo={"/dashboard/settings"}>
              <div className="flex items-center gap-3">
                <LuEdit /> Edit
              </div>
            </CTAButton>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <p className="font-normal text-sm text-richblack-600">
                First Name
              </p>
              <p className="font-medium text-sm text-richblack-5">
                {user?.firstName}
              </p>
            </div>
            <div>
              <p className="font-normal text-sm text-richblack-600">Email</p>
              <p className="font-medium text-sm text-richblack-5">
                {user?.email}
              </p>
            </div>
            <div>
              <p className="font-normal text-sm text-richblack-600">Gender</p>
              <p className="font-medium text-sm text-richblack-5">
                {user?.additionalDetails?.gender ?? "Add Gender"}
              </p>
            </div>
            <div>
              <p className="font-normal text-sm text-richblack-600">
                Last Name
              </p>
              <p className="font-medium text-sm text-richblack-5">
                {user?.lastName}
              </p>
            </div>
            <div>
              <p className="font-normal text-sm text-richblack-600">
                Phone Number
              </p>
              <p className="font-medium text-sm text-richblack-5">
                {user?.additionalDetails?.contactNumber ?? "Add Contact Number"}
              </p>
            </div>
            <div>
              <p className="font-normal text-sm text-richblack-600">
                Date of Birth
              </p>
              <p className="font-medium text-sm text-richblack-5">
                {user?.additionalDetails?.dateOfBirth ?? "Add Date of Birth"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
