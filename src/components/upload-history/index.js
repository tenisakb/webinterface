import React, { Component } from "react";
import { connect } from "react-redux";
import FileSaver from "file-saver";

import downloadUploadHistoryActions from "../../redux/actions/download-upload-history-actions";

const mapStateToProps = state => ({
  uploadHistory: state.upload.history
});

const mapDispatchToProps = dispatch => ({
  beginDownloadUploadHistoryFn: (items) =>
    dispatch(downloadUploadHistoryActions.beginDownloadUploadHistoryAction(items))
});

class DownloadUploadHistoryButton extends Component {
  render() {
    const { beginDownloadUploadHistoryFn, uploadHistory } = this.props;
    return (
      <div>
        <button
          onClick={() => {
            beginDownloadUploadHistoryFn(uploadHistory);
          }}
        >
          Download upload history
        </button>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DownloadUploadHistoryButton);