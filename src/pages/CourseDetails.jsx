import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { buyCourse } from "../services/operations/studentFeaturesAPI";
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI";
import GetAvgRating from "../utils/avgRating";
import Error from "./Error";
import ConfirmationModal from "../components/common/ConfirmationModal";
import RatingStars from "../components/common/RatingStars";
import { formatDate } from "../services/formatDate";
import CourseDetailsCard from "../components/core/Course/CourseDetailsCard";
import { PiInfoBold, PiGlobeBold } from "react-icons/pi";

const CourseDetails = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.profile);
  const { paymentLoading } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseId } = useParams();

  const [courseData, setCourseData] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [avgReviewCount, setAverageReviewCount] = useState(0);
  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
  const [isActive, setIsActive] = useState(Array(0));

  useEffect(() => {
    const getCourseFullDetails = async () => {
      try {
        const result = await fetchCourseDetails(courseId);
        setCourseData(result);
      } catch (error) {
        console.log("Could not fetch coursse details");
      }
    };
    getCourseFullDetails();
  }, [courseId]);

  useEffect(() => {
    const count = GetAvgRating(
      courseData?.data?.courseDetails.ratingAndReviews
    );
    setAverageReviewCount(count);
  }, [courseData]);

  useEffect(() => {
    let lectures = 0;
    courseData?.data?.courseDetails?.courseContent?.forEach((sec) => {
      lectures += sec.subSection.length || 0;
    });
    setTotalNoOfLectures(lectures);
  }, [courseData]);

  const handleActive = (id) => {
    setIsActive(
      !isActive.includes(id)
        ? isActive.concat(id)
        : isActive.filter((e) => e !== id)
    );
  };

  const handleBuyCourse = () => {
    if (token) {
      buyCourse(token, [courseId], user, navigate, dispatch);
      return;
    }
    setConfirmationModal({
      text1: "you are not Logged in",
      text2: "Please login to purchase the course",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    });
  };

  if (loading || !courseData) {
    return <div>Loading...</div>;
  }

  if (!courseData.success) {
    return (
      <div>
        <Error />
      </div>
    );
  }

  const {
    _id: course_id,
    courseName,
    courseDescription,
    thumbnail,
    price,
    whatYouWillLearn,
    courseContent,
    ratingAndReviews,
    instructor,
    studentsEnrolled,
    createdAt,
  } = courseData?.data?.courseDetails;

  const { name } = courseData?.data?.courseDetails?.category;

  return (
    <div className="flex flex-col text-white">
      <div className="relative flex flex-col justify-start p-8 bg-richblack-800 px-24">
        <div className="w-[65%] flex flex-col gap-y-3 border-r-2 border-r-richblack-700 pr-5">
          <span className="text-richblack-300">
            Home / Learning / <span className="text-yellow-50">{name}</span>
          </span>
          <p className="text-richblack-5 my-3 text-3xl">{courseName}</p>
          <p className="text-richblack-200">{courseDescription}</p>
          <div className="flex gap-x-2 text-richblack-25">
            <span className="text-yellow-100 font-semibold text-lg">
              {avgReviewCount}
            </span>
            <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
            <span>{`(${ratingAndReviews.length} reviews)`}</span>
            <span>{`(${studentsEnrolled.length} students enrolled)`}</span>
          </div>

          <div className="text-richblack-25">
            <p>Created By {`${instructor.firstName}`}</p>
          </div>

          <div className="flex gap-x-3 text-richblack-25">
            <div className="flex items-center gap-2">
              <PiInfoBold size={18} />
              <p>Created At {formatDate(createdAt)}</p>
            </div>
            <div className="flex items-center gap-2">
              <PiGlobeBold size={18} />
              <p>English</p>
            </div>
          </div>
        </div>

        <div className="absolute right-24">
          <CourseDetailsCard
            course={courseData?.data?.courseDetails}
            setConfirmationModal={setConfirmationModal}
            handleBuyCourse={handleBuyCourse}
          />
        </div>
      </div>

      <div className="px-24 mt-8">
        <div className="w-[65%]">
          <div className="border border-richblack-700 p-8 flex flex-col gap-y-3 mb-12">
            <p className="text-richblack-5 text-3xl">What you will learn</p>
            <div className="flex flex-col gap-y-2 text-richblack-50">{whatYouWillLearn}</div>
          </div>

          <div>
            <div>
              <p className="text-richblack-5 text-2xl">Course Content:</p>
            </div>

            <div className="flex justify-between gap-x-3 text-richblack-50">
              <div className="flex gap-2">
                <span>{courseContent.length} section(s)</span>
                <span>⏺</span>
                <span>{totalNoOfLectures} lectures</span>
                <span>⏺</span>
                <span>{courseData.data?.totalDuration} total length</span>
              </div>
              <div>
                <button className="text-yellow-50" onClick={() => setIsActive([])}>
                  Collapse all sections
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
};

export default CourseDetails;
