import {configureStore} from '@reduxjs/toolkit';
import musicSlice from './musicSlice';
import modalSlice from './modalSlice';

export default configureStore({
    reducer : {
        music : musicSlice,
        modal : modalSlice
    }
})