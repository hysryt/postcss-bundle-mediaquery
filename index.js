var postcss = require('postcss')

module.exports = postcss.plugin('postcss-bundle-mediaquery', function (options) {
  return function (css) {
    const comments = options ? options.comments || {} : {};

    // CSSからメディアクエリのみを取得。
    // 取得の際、同じメディアクエリは一つにまとめられる。
    const mediaQueries = bundleMediaQueries(css);

    Object.keys(mediaQueries).map(key => {
      // 必要ならコメントノードの追加。
      if (comments[key] != undefined) {
        const comment = createCommentNode(comments[key]);
        css.append(comment);
      }

      // メディアクエリノードの追加。
      css.append(mediaQueries[key]);
    })

    return css;
  }
});


/**
 * 全てのメディアクエリを探索し、オブジェクトに格納して返す。
 * メディアクエリのルールが同じものは一つにまとめる。
 * 
 * @param {postcss.container} css
 * @return {object} メディアクエリのルールをキーとするオブジェクト。
 */
function bundleMediaQueries(css) {
  const mediaQueries = {};

  css.walkAtRules(node => {
    if (node.name === 'media') {
      if (mediaQueries[node.params] === undefined) {
        mediaQueries[node.params] = node;
      } else {
        mediaQueries[node.params].append(node.nodes);
        node.parent.removeChild(node);
      }
    }
  });

  return mediaQueries;
}


/**
 * コメントノードの作成。
 * @param {string} comment
 * @return {postcss.comment}
 */
function createCommentNode(comment) {
  return new postcss.comment({text:
`
 * ${comment}
`
  });
}
