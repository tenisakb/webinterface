import uploadHistoryActions from "redux/actions/upload-history-actions";

const initialState = {
  items: []
}

const UploadHistoryReducer = (state = initialState, action) => {
  const {items} = state;
  const {type, payload} = action;
  switch (type) {
    case uploadHistoryActions.ADD:
      return {
        ...state,
        items: [payload, ...items]
      };
    default:
      return state;
  }
};

export default UploadHistoryReducer;
