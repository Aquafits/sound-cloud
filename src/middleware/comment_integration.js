function Comment(
  avatar,
  nickname,
  content,
  time,
  liked_count,
  replied_comment_content
) {
  this.avatar = avatar;
  this.nickname = nickname;
  this.content = content;
  this.time = time;
  this.liked_count = liked_count;
  this.replied_comment_content = replied_comment_content;
}

export function compare_comment(a, b) {
  return b.liked_count - a.liked_count;
}

export function get_qq_normalized_hot_comments(res) {
  let qq_normalized_hot_comments = [];

  let comments = res.data.comment.commentlist;
  for (let c of comments) {
    let content =
      c.middlecommentcontent == null
        ? c.rootcommentcontent
        : c.middlecommentcontent[0].replyednick +
          " " +
          c.middlecommentcontent[0].subcommentcontent;

    let replied_comment_content =
      c.middlecommentcontent == null ? null : c.rootcommentcontent;

    qq_normalized_hot_comments.push(
      new Comment(
        c.avatarurl,
        c.nick,
        content,
        c.time * 1000,
        c.praisenum,
        replied_comment_content
      )
    );
  }
  return qq_normalized_hot_comments;
}

export function get_netease_normalized_hot_comments_head(res) {
  let netease_normalized_hot_comments = [];

  let r = res.data;
  let comments = r.data.hotComments.slice(0, 5);
  for (let c of comments) {
    netease_normalized_hot_comments.push(
      new Comment(
        c.user.avatarUrl,
        c.user.nickname,
        c.content,
        c.time,
        c.likedCount,
        null
      )
    );
  }
  return netease_normalized_hot_comments;
}

export function get_netease_normalized_hot_comments_tail(res) {
  let netease_normalized_hot_comments = [];

  let r = res.data;
  let comments = r.data.hotComments.slice(0, 95);
  for (let c of comments) {
    netease_normalized_hot_comments.push(
      new Comment(
        c.user.avatarUrl,
        c.user.nickname,
        c.content,
        c.time,
        c.likedCount,
        null
      )
    );
  }
  return netease_normalized_hot_comments;
}
