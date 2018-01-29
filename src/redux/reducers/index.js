import { combineReducers } from "redux";

import upload from "redux/reducers/upload-reducer";
import uploadHistory from "redux/reducers/upload-history-reducer";

export default combineReducers({ upload, uploadHistory });
