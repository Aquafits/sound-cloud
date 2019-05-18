import { qq_service } from "./request";

export function get_qq_hot_comment(song_id, size) {
  return qq_service.get("/base/fcgi-bin/fcg_global_comment_h5.fcg",{
    params: {
      reqtype: "2",
      biztype: "1",
      topid: song_id,
      cmd: "6",
      pagenum: "0",
      pagesize: size
    }
  });
}
