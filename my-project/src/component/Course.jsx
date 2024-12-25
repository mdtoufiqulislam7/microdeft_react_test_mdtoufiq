import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getcourse } from "../redux_toolkit/course_slice";

function CourseCard() {
  const dispatch = useDispatch();
  const { course, status, error } = useSelector((state) => state.course);

  useEffect(() => {
    if (status === "idle") {
      dispatch(getcourse());
    }
  }, [dispatch, status]);


  if (status === "loading") {
    return <div className="text-center mt-6 text-gray-500">Loading...</div>;
  }


  if (status === "failed") {
    return <div className="text-center mt-6 text-red-500">{error}</div>;
  }

 
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {Array.isArray(course) && course.length > 0 ? (
        course.map((item, idx) => (
          <div key={idx} className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
           
            <img
              className="w-full h-48 object-cover object-center"
              src={item?.image || 'default-image-url.jpg'} 
              alt={item?.title || 'Course image'}
            />
            <div className="p-6">
             
              <h2 className="text-xl font-semibold text-gray-800">{item?.title}</h2>

            
              {item?.badge_text && (
                <span
                  className={`inline-block text-sm px-3 py-1 mt-2 rounded-full text-white ${item?.badge_color === 'red' ? 'bg-red-500' : 'bg-blue-500'}`}
                >
                  {item?.badge_text}
                </span>
              )}

              
              <p className="mt-2 text-gray-600">{item?.description || 'No description available.'}</p>

              
              <p className="mt-2 text-gray-500">Instructor: {item?.instructor_name}</p>

              
              <p className="mt-2 text-gray-500">Author: {item?.author?.name}</p>

             
              <p className="mt-2 text-gray-500">Created at: {new Date(item?.created_at).toLocaleString()}</p>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center mt-6 text-gray-500">No courses available</div>
      )}
    </div>
  );
}

export default CourseCard;
