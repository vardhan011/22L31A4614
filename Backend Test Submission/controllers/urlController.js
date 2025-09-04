
let urls = {};

const createShortUrl = (req, res) => {
  const { url, shortcode, validity = 30, author } = req.body;


  if (!url || !/^https?:\/\/.+/i.test(url)) {
    return res.status(400).json({ error: "Invalid URL" });
  }

 
  const code = shortcode || Math.random().toString(36).substring(2, 8);


  const expiryDate = new Date(Date.now() + validity * 60000);

 
  urls[code] = {
    originalUrl: url,
    author: author || "Anonymous",
    createdAt: new Date(),
    expiry: expiryDate,
    clicks: 0,
  };

  
  res.status(201).json({
    shortLink: `http://localhost:5000/${code}`,
    expiry: expiryDate.toISOString(),
  });
};

const redirectShortUrl = (req, res) => {
  const { code } = req.params;
  const entry = urls[code];

  if (!entry) {
    return res.status(404).json({ error: "Short URL not found" });
  }

  if (new Date() > entry.expiry) {
    return res.status(410).json({ error: "Short URL expired" });
  }

  entry.clicks += 1;


  if (req.get("User-Agent")?.includes("Postman")) {
    return res.json({ redirectTo: entry.originalUrl });
  }

  
  res.redirect(entry.originalUrl);
};

const getStats = (req, res) => {
  const { code } = req.params;
  const entry = urls[code];

  if (!entry) {
    return res.status(404).json({ error: "Short URL not found" });
  }

  res.json({
    originalUrl: entry.originalUrl,
    author: entry.author,
    createdAt: entry.createdAt,
    expiry: entry.expiry,
    clicks: entry.clicks,
  });
};

module.exports = { createShortUrl, redirectShortUrl, getStats };
