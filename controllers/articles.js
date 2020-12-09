const getArticles = async (req, res) => {
  res.send({ message: "1" })
}

const createArticle = async (req, res) => {
  res.send({ message: "2" })
}
const deleteArticle = async (req, res) => {
  res.send({ message: "3" })
}

module.exports = {
  getArticles,
  createArticle,
  deleteArticle
}