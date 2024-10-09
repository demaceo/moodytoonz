const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3001;

// Proxy endpoint
app.get("/api/musicovery", async (req, res) => {
  try {
    const { valence, arousal, decade } = req.query;

    // Make a request to Musicovery API
    const response = await axios.get(
      `http://musicovery.com/api/V6/playlist.php`,
      {
        params: {
          fct: "getfrommood",
          popularitymax: 100,
          popularitymin: 80,
          starttrackid: "",
          trackvalence: valence,
          trackarousal: arousal,
          listenercountry: "us",
          [decade]: true,
          resultsnumber: 25,
        },
      }
    );

    // Forward the response back to the frontend
    res.json(response.data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
