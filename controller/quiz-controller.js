const express = require("express");
const router = express.Router();
const db = require("../models");

// Quiz
router.get("/api/quiz", async (req, res) => {
    // quiz page
});

router.get("/api/quiz-l&d", async (req, res) => {
    // Quiz likes and dislikes
    // inspect post body
});

router.get("/api/quiz-l&d/:id", async (req, res) => {
    // Quiz likes and dislikes by id
    // inspect post body
});

router.get("/api/quiz-recommendations", async (req, res) => {
    // Quiz recommendations
    // call to api with quiz results
});

router.post("/api/quiz-l&d", async (req, res) => {
    // create post body with quiz results
});

// Delete quiz likes and dislikes
router.delete("/api/likes&dislikes/:id", async (req, res) => {
   // delete from db
});

module.exports = router;