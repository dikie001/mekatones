const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/", async (req, res) => {
  console.log("🔍 Fetching audio files from Cloudinary...");
  const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
    process.env;

  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    return res.status(500).json({ message: "❌ Missing Cloudinary config." });
  }

  const auth = Buffer.from(
    `${CLOUDINARY_API_KEY}:${CLOUDINARY_API_SECRET}`
  ).toString("base64");

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/resources/search`,
      {
        expression: "resource_type:video AND folder:audio",
        sort_by: [{ created_at: "desc" }],
        max_results: 50,
      },
      {
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
        },
      }
    );

    // 👀 Dump full response to terminal
    console.log("🔍 Full Cloudinary Response:");
    console.dir(response.data.resources, { depth: null });

    const audios = response.data.resources.map((item) => ({
      url: item.secure_url,
      public_id: item.public_id,
      created_at: item.created_at,
      duration: item.duration,
      format: item.format,
      name:item.display_name || item.public_id,
      size: item.bytes,
    }));

    res.json(audios);
  } catch (error) {
    console.error(
      "🔥 Cloudinary Fetch Error:",
      error.response?.data || error.message
    );
    res
      .status(500)
      .json({ message: "❌ Failed to fetch audio files from Cloudinary." });
  }
});

module.exports = router;
