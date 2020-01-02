/**
 * Created by Liudq on 2019-08-14
 */
export class LearnStatus {
  constructor(status, videoId, videoViewStatus) {
    this.status = status;
    this.videoId = videoId;
    this.videoViewStatus = videoViewStatus;
  }
  statusManager() {
    return {
      "0": {
        name: "未开课",
        background: "#FFFFFF",
        color: "#808080",
        pcName: "未开课",
        pcColor: "#808080",
        border: "0.01rem solid #808080"
      },
      "1": {
        name: "已结束",
        background: "#FFFFFF",
        color: "#808080",
        pcName: "课后复习",
        pcColor: "#61BF55",
        videoId: this.videoId,
        videoViewStatus: this.videoViewStatus
      },
      "2": {
        name: "正在学",
        background: "#61BF55",
        color: "#FFFFFF",
        pcName: "进入课堂",
        pcColor: "#FFFFFF",
      }
    }
  }
  getStatusInfo() {
    return this.statusManager()[this.status];
  }
}