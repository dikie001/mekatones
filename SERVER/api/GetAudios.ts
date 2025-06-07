const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/", async (req, res) => {
  const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
    process.env;
  const auth = Buffer.from(
    `${CLOUDINARY_API_KEY}:${CLOUDINARY_API_SECRET}`
  ).toString("base64");

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/resources/search`,
      {
        expression: "resource_type:video AND folder:audios",
        sort_by: [{ created_at: "desc" }],
        max_results: 30,
      },
      {
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
        },
      }
    );

    const audios = response.data.resources.map((item) => ({
      url: item.secure_url,
      public_id: item.public_id,
      created_at: item.created_at,
    }));

    res.json(audios);
  } catch (error) {
    console.error("Error fetching audios:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
