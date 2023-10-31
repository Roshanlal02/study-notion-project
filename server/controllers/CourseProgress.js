const SubSection = require("../models/SubSection");
const CourseProgress = require("../models/CourseProgress");

exports.updateCourseProgress = async (req, res) => {
  const { courseId, subSectionId } = req.body;
  const userId = req.user.id;

  try {
    const subSection = await SubSection.findById(subSectionId);

    if (!subSectionId) {
      return res.status(404).json({ error: "Invalid Subsection" });
    }

    let courseProgress = await CourseProgress.findOne({
      courseID: courseId,
      userId: userId,
    });

    if (!courseProgress) {
        return res.status(404).json({ success: false, error: "Course Progress does not exist" });
    } else {
        if (courseProgress.completedVideos.includes(subSection)) {
            return res.status(400).json({
                error: "Subsection already completed"
            })
        }
    }

    await courseProgress.save();

    return res.status(200).json({
        success: true,
        message: "Course progress updated successfully"
    })
  } catch (error) {
    console.log(error);
    return res.status(400).json({error: "Internal Server error"})
  }
};
