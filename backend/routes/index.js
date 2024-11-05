const express = require("express");
const getAllUsers = require("../controllers/users/getAllUsers");
const signUpAccount = require("../controllers/users/signUpAccount");
const signInAccount = require("../controllers/users/signInAccount");
const getDetailsUser = require("../controllers/users/getDetailsUser");
const verifyToken = require("../middleware/verifyToken");
const deletedUser = require("../controllers/users/deletedUser");
const createPens = require("../controllers/pens/createPens");
const getAllPens = require("../controllers/pens/getAllPens");
const getDetailsPen = require("../controllers/pens/getDetailsPen");
const deletedPen = require("../controllers/pens/deletedPen");
const updatePen = require("../controllers/pens/updatePen");
const getAllPensPublic = require("../controllers/pens/getAllPensPublic");
const addLikes = require("../controllers/likes/addlikes");
const deleteLikes = require("../controllers/likes/deleteLikes");
const getAllLikeByUser = require("../controllers/likes/getAllLikeByUser");
const totalLike = require("../controllers/likes/totalLikes");
const sendComments = require("../controllers/comment/sendComments");
const getAllCommentsByProject = require("../controllers/comment/getALlCommentsByProject");
const totalComments = require("../controllers/comment/totalComments");
const updateInfoUser = require("../controllers/users/updateInfoUser");
const findUserByUsername = require("../controllers/users/findUserByUsername");
const createFollower = require("../controllers/follower/createFollower");
const deleteFollower = require("../controllers/follower/deleteFollower");
const getFollower = require("../controllers/follower/getFollower");
const countFollower = require("../controllers/follower/countFollower");
const searchUser = require("../controllers/users/searchUser");

const router = express.Router();

// Account
router.get("/getall", getAllUsers);
router.post("/signup", signUpAccount);
router.post("/signin", signInAccount);
router.get("/info/:username", findUserByUsername);
router.get("/user-details", verifyToken, getDetailsUser);
router.delete("/:id", verifyToken, deletedUser);
router.put("/update-profile/:id", verifyToken, updateInfoUser);
router.get("/search/:username", searchUser);

// Pens
router.post("/create-pens", verifyToken, createPens);
router.post("/getall-pens", getAllPens);
router.get("/all-pens", getAllPensPublic);
router.get("/get-pens/:id", verifyToken, getDetailsPen);
router.delete("/delete-pens/:id", verifyToken, deletedPen);
router.put("/update-pens/:id", verifyToken, updatePen);

// Like
router.post("/add-like", verifyToken, addLikes);
router.post("/delete-like", verifyToken, deleteLikes);
router.get("/total-like", totalLike);
router.get("/all-like", verifyToken, getAllLikeByUser);

// Comments
router.post("/send-comments", verifyToken, sendComments);
router.get("/all-comments/:id", getAllCommentsByProject);
router.get("/total-comments", totalComments);

// Follower
router.post("/create-follower", verifyToken, createFollower);
router.delete("/delete-follower/:followingId", verifyToken, deleteFollower);
router.get("/follower/:followingId", verifyToken, getFollower);
router.get("/follower-count/:userId", countFollower);

module.exports = router;
