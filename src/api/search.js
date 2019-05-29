import { itool_service } from "./request";

export function get_netease_search_results(keyword) {
  return itool_service.get("/netease/search", {
    params: {
      keyword: keyword,
      type: "song",
      pageSize: 30,
      page: 0
    }
  });
}

export function get_qq_search_results(keyword) {
  return itool_service.get("/tencent/search", {
    params: {
      keyword: keyword,
      type: "song",
      page: 0,
      pageSize: 20
    }
  });
}
