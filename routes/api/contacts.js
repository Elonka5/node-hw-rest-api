const express = require("express");

const { schemas } = require("../../models/contact");

const { validateBody, isValidId, authenticate} = require("../../middlewares");

const ctrl = require("../../controllers/contacts");

const router = express.Router();

router.use(authenticate);

router.get("/", ctrl.getAll);

router.get("/:contactId", isValidId, ctrl.getById);

router.post("/", validateBody(schemas.addSchema), ctrl.addContact);

router.put("/:contactId", isValidId, validateBody(schemas.addSchema), ctrl.updateById);

router.patch("/:contactId/favorite",isValidId,validateBody(schemas.updateFavoriteSchema), ctrl.updateFavorite)

router.delete("/:contactId", isValidId, ctrl.deleteById);

module.exports = router;
