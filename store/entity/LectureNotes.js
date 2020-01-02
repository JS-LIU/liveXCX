import { baseUrl, commonAjax } from "../config/config";

export class LectureNotes {
  constructor(lectureNotesStatus, lectureNotes) {
    this.lectureNotesStatus = lectureNotesStatus;
    this.lectureNotes = lectureNotes;
    let fileUrlAjax = commonAjax.resource('/file/w/v1.0/:action');
    this._getFileUrl = function (postInfo) {
      return fileUrlAjax.save({ action: 'getFileUrl' }, postInfo);
    };
  }
  statusManager() {
    return {
      "0": {
        name: "不可查看",
        color: "#c7c7c7",
        url: baseUrl.getBaseUrl() + "/src/img/pdf_icon_cant_read.png",
        showLectureNotes: () => {
          return new Promise((resolve, reject) => {
            reject("")
          });
        }
      },
      "1": {
        name: "可查看",
        color: "#000000",
        url: baseUrl.getBaseUrl() + "/src/img/pdf_icon_can_read.png",
        showLectureNotes: (token) => {
          return this._getFileUrl({
            filename: this.lectureNotes
          }, { name: "token", value: token }).then((data) => {
            return new Promise((resolve, reject) => {
              resolve(data.data);
            })
          })
        }
      }
    }
  }
  setUrl(url){
    this.url = url;
  }
  getLectureNotesStatus() {
    return this.statusManager()[this.lectureNotesStatus];
  }
}