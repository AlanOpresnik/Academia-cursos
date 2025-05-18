import axios from "axios";

export const publishCourse = async (courseId: string, state: boolean) => {
  try {
    await axios.patch(`/api/course/${courseId}`, {
      isPublished: state,
    });

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
};