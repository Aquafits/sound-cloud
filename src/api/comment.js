import { qq_service, itool_service } from "./request";

export function get_qq_hot_comments(song_id) {
  return qq_service.get("/base/fcgi-bin/fcg_global_comment_h5.fcg", {
    params: {
      reqtype: "2",
      biztype: "1",
      topid: song_id,
      cmd: "6",
      pagenum: "0",
      pagesize: 100
    }
  });
}

export function get_netease_hot_comments_head(id) {
  return itool_service.get("/netease/comment/song/hot", {
    params: {
      id: id,
      page: 0
    }
  });
}

export function get_netease_hot_comments_tail(id) {
  return itool_service.get("/netease/comment/song/hot", {
    params: {
      id: id,
      page: 5
    }
  });
}
