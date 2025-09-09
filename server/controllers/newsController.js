import NewsArticle from "../models/NewsArticle.js";

// GET /api/news?category=&tag=&q=
export const listNews = async (req, res) => {
  try {
    const filter = {};
    if (req.query.category) filter.category = req.query.category;
    if (req.query.tag) filter.tags = req.query.tag;

    let query = NewsArticle.find(filter).sort({ publishedAt: -1 });

    if (req.query.q) {
      query = NewsArticle.find({ $text: { $search: req.query.q } });
    }

    const articles = await query;
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/news/:id
export const getNewsArticle = async (req, res) => {
  try {
    const article = await NewsArticle.findById(req.params.id);
    if (!article) return res.status(404).json({ message: "Article not found" });
    res.json(article);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/news (Admin)
export const createNews = async (req, res) => {
  try {
    const article = await NewsArticle.create(req.body);
    res.status(201).json(article);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/news/:id (Admin)
export const updateNews = async (req, res) => {
  try {
    const article = await NewsArticle.findById(req.params.id);
    if (!article) return res.status(404).json({ message: "Article not found" });

    Object.assign(article, req.body);
    await article.save();
    res.json(article);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/news/:id (Admin)
export const deleteNews = async (req, res) => {
  try {
    const article = await NewsArticle.findById(req.params.id);
    if (!article) return res.status(404).json({ message: "Article not found" });

    await article.deleteOne();
    res.json({ message: "Article deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
