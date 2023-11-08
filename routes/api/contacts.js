const express = require("express");

const schema = require("../../schemas/schemas");

const { validateBody } = require("../../middlewares");

const ctrl = require("../../controllers/contacts");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", validateBody(schema.addSchema), ctrl.addContact);

router.put("/:contactId", validateBody(schema.addSchema), ctrl.updateById);

router.delete("/:contactId", ctrl.deleteById);

module.exports = router;
