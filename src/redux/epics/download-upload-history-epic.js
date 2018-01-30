import { Observable } from "rxjs";
import { combineEpics } from "redux-observable";
import FileSaver from "file-saver";

import downloadUploadHistoryActions from "redux/actions/download-upload-history-actions";

const beginDownloadUploadHistory = (action$, store) => {
	console.log("halo");
  return action$.ofType(downloadUploadHistoryActions.BEGIN_UPLOAD_HISTORY_DOWNLOAD).map(action => {
    const items = action.payload;
    console.log(items);
    let output = "";
  	if(items.length) {
  	  const items_map =  items.map((e, i) => (e));
      Object.keys(items_map).forEach((key) => {
        output += items_map[key].handle + "\n";
      });
      let blob = new Blob([output], {type: "text/plain;charset=utf-8"});
      FileSaver.saveAs(blob, "uploadHistory.txt");
	    return downloadUploadHistoryActions.downloadUploadHistorySuccessAction();
  	}
  });
};

export default combineEpics(beginDownloadUploadHistory);
