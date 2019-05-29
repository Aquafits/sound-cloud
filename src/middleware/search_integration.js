function Music(name, id, artist, album, url, cover) {
  "use strict";
  this.name = name;
  this.id = id;
  this.artist = artist;
  this.album = album;
  this.url = url;
  this.cover = cover;
}

export function get_normalized_netease_search_results(res) {
  let songs = res.data.data.songs;
  let musics = [];
  for (let song of songs) {
    let ars = song.ar;
    let artist = "";
    for (let a of ars) {
      artist = artist.concat(" / " + a.name);
    }

    let music = new Music(
      song.name,
      song.id,
      artist.substr(3),
      song.al.name,
      "https://v1.itooi.cn/netease/url?id=" + song.id + "&quality=320",
      song.al.picUrl
    );
    musics.push(music);
  }
  return musics;
}

export function get_normalized_qq_search_results(res) {
  let list = res.data.data.list;
  let musics = [];

  for (let song of list) {
    let artist = "";
    for (let s of song.singer) {
      artist = artist.concat(" / " + s.name);
    }
    artist = artist.substr(3);

    let url = "https://v1.itooi.cn/tencent/url?id=" + song.songmid;

    let cover =
      "http://imgcache.qq.com/music/photo/album_300/" +
      (song.albumid % 100) +
      "/300_albumpic_" +
      song.albumid +
      "_0.jpg";

    let music = new Music(
      song.songname,
      song.songid,
      artist,
      song.albumname,
      url,
      cover
    );
    musics.push(music);
  }
  return musics;
}
