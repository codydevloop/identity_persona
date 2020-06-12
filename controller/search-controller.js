const express = require("express");
const router = express.Router();
const db = require("../models");

// Search
router.get("/api/search", async (req, res) => {
    // return search page
});

router.get("/api/search-recommendations", async (req, res) => {
    // Search recommendations
    // call to api based on search term
});

router.get("/api/search-l&d", async (req, res) => {
    // Search likes and dislikes
    // inspect post body
});

router.get("/api/search-l&d/:id", async (req, res) => {
    // Search likes and dislikes by id
    // inspect post body
});

router.post("/api/search-l&d", async (req, res) => {
    // create post body with quiz results
});

// Delete search likes and dislikes
router.delete("/api/likes&dislikes/:id", async (req, res) => {
    // delete from db
});

module.exports = router;