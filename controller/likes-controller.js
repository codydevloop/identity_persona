const express = require("express");
const router = express.Router();
const passport = require("passport");
require('dotenv').config();

require("../config/passport")(passport);
router.use(passport.initialize());
router.use(passport.session());



router.get("/dislikes", async (req, res) => {
    try {
        if (req.user) {
            const data = await db.user.findAll();

            res.render("user", { users: data });
        } else {
            res.redirect("/login");
        }
    } catch (error) {
        console.error(error);

        res.status(500).send();
    }
});

router.get(
    "/api/dislikes",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            const data = await db.user.findAll({ include: [db.history] });

            res.json(data);
        } catch (error) {
            console.error(error);

            res.status(500).send();
        }
    }
);

router.get("/api/dislikes/:id", async (req, res) => {
    try {
        const data = await db.user.findAll({ where: { id: req.params.id }, include: [db.history] });

        res.json(data);
    } catch (error) {
        console.error(error);

        res.status(500).send();
    }
});

router.post(
    "/api/dislikes",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        const data = await db.user.create(req.body);

        res.json(data);
    }
);

router.delete(
    "/api/dislikes/:id",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            const data = await db.user.destroy({ where: { id: req.params.id } });

            res.json(data);
        } catch (error) {
            console.error(error);

            res.status(500).send();
        }
    }
);

module.exports = router;