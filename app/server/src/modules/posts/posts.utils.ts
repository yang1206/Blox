export function extractProtectedArticle(article) {
  delete article.content
  delete article.html
}
