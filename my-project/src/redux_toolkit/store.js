import { configureStore } from "@reduxjs/toolkit";
import authslice from './auth_slice'
import data from './course_slice'
export const store = configureStore({

    reducer:{
       user: authslice,
       course: data
    }
})


export default store