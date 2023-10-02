const express = require("express");
const authenticate = require("../middlewares/authenticate");
const {
  createGroupRole,
  getGroupsRoleId,
  getAllGroupRoles,
  addGroupRoleToMember,
  updateDiscordImageForVerification,
  setRoleIdleToIdleUsers,
  setRoleIdle7DToIdleUsers,
  updateDiscordNicknames,
  syncDiscordGroupRolesInFirestore,
} = require("../controllers/discordactions");
const { validateGroupRoleBody, validateMemberRoleBody } = require("../middlewares/validators/discordactions");
const checkIsVerifiedDiscord = require("../middlewares/verifydiscord");
const { SUPERUSER } = require("../constants/roles");
const authorizeRoles = require("../middlewares/authorizeRoles");

const router = express.Router();

router.post("/groups", authenticate, checkIsVerifiedDiscord, validateGroupRoleBody, createGroupRole);
router.get("/groups", authenticate, checkIsVerifiedDiscord, getAllGroupRoles);
router.post("/roles", authenticate, checkIsVerifiedDiscord, validateMemberRoleBody, addGroupRoleToMember);
router.get("/roles", authenticate, checkIsVerifiedDiscord, getGroupsRoleId);
router.patch(
  "/avatar/verify/:id",
  authenticate,
  authorizeRoles([SUPERUSER]),
  checkIsVerifiedDiscord,
  updateDiscordImageForVerification
);
router.put("/group-idle", authenticate, authorizeRoles([SUPERUSER]), setRoleIdleToIdleUsers);
router.put("/group-idle-7d", authenticate, authorizeRoles([SUPERUSER]), setRoleIdle7DToIdleUsers);
router.post(
  "/nicknames/sync",
  authenticate,
  authorizeRoles([SUPERUSER]),
  checkIsVerifiedDiscord,
  updateDiscordNicknames
);

router.post("/discord-roles", authenticate, authorizeRoles([SUPERUSER]), syncDiscordGroupRolesInFirestore);
module.exports = router;
