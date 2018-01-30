const BEGIN_UPLOAD_HISTORY_DOWNLOAD = "oyster/upload_history/begin_download";
const DOWNLOAD_UPLOAD_HISTORY_SUCCESS = "oyster/upload_history/download_success";

const ACTIONS = Object.freeze({
  // actions
  BEGIN_UPLOAD_HISTORY_DOWNLOAD,
  DOWNLOAD_UPLOAD_HISTORY_SUCCESS,

  // actionCreators
  beginDownloadUploadHistoryAction: items => ({
    type: ACTIONS.BEGIN_UPLOAD_HISTORY_DOWNLOAD,
    payload: items
  }),

  downloadUploadHistorySuccessAction: () => ({
    type: ACTIONS.DOWNLOAD_UPLOAD_HISTORY_SUCCESS
  })
});

export default ACTIONS;
