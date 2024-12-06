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
const addLikes = require("../controllers/likes/addLikes");
const deleteLikes = require("../controllers/likes/deleteLikes");
const getAllLikeByUser = require("../controllers/likes/getAllLikeByUser");
const totalLike = require("../controllers/likes/totalLikes");
const sendComments = require("../controllers/comment/user_comment/sendComments");
const getAllCommentsByProject = require("../controllers/comment/getAllCommentsByProject");
const totalComments = require("../controllers/comment/totalComments");
const updateInfoUser = require("../controllers/users/updateInfoUser");
const findUserByUsername = require("../controllers/users/findUserByUsername");
const createFollower = require("../controllers/follower/createFollower");
const deleteFollower = require("../controllers/follower/deleteFollower");
const getFollower = require("../controllers/follower/getFollower");
const countFollower = require("../controllers/follower/countFollower");
const searchUser = require("../controllers/search/user_search/searchUser");
const getAllUsersDeleted = require("../controllers/users/getAllUsersDeleted");
const RestoreUser = require("../controllers/users/RestoreUser");
const deleteCommentByUser = require("../controllers/comment/user_comment/deleteCommentByUser");
const editCommentByUser = require("../controllers/comment/user_comment/editCommentByUser");
const getAllComments = require("../controllers/comment/getAllComments");
const deleteCommentByAdmin = require("../controllers/comment/admin_comment/deleteCommentByAdmin");
const getFollowing = require("../controllers/follower/getFollowing");
const softDelete = require("../controllers/users/softDelete");
const changePassword = require("../controllers/users/changePassword");
const checkPasswordUser = require("../controllers/users/checkPasswordUser");
const totalLikePen = require("../controllers/likes/totalLikePen");
const totalCommentPen = require("../controllers/comment/totalCommentPen");
const getAllNotificationByUser = require("../controllers/notifications/getAllNotificationByUser");
const countNotificationUnread = require("../controllers/notifications/countNotificationUnread");
const markAsReadNotification = require("../controllers/notifications/markAsReadNotification");
const getListFollowingUser = require("../controllers/follower/getListFollowingUser");
const getQuestion1 = require("../controllers/learnJs/getQuestion1");

const getDeletedPen = require("../controllers/pens/getDeletedPens");
const deletePenForever = require("../controllers/pens/deletePenForever");
const restorePen = require("../controllers/pens/restorePen");
const searchProjectByName = require("../controllers/search/project_search/searchProjectByName");
const searchDeletedUser = require("../controllers/search/user_search/searchDeletedUser");
const searchDeletedProject = require("../controllers/search/project_search/searchDeletedProject");
const getAllDeleteComments = require("../controllers/comment/admin_comment/getAllDeletedComments");
const deleteCommentForever = require("../controllers/comment/admin_comment/deleteCommentForever");
const restoreComment = require("../controllers/comment/admin_comment/restoreComment");
const searchComment = require("../controllers/search/comment_search/searchComment");
const searchDeleteComment = require("../controllers/search/comment_search/searchDeleteComment");
const getAllPensUser = require("../controllers/pens/getAllPensUser");

const router = express.Router();

// Account

router.get("/getall", getAllUsers);
router.get("/trash/allUser", getAllUsersDeleted);
router.post("/signup", signUpAccount);
router.post("/signin", signInAccount);
router.get("/info/:username", findUserByUsername);
router.get("/user-details", verifyToken, getDetailsUser);
router.post("/delete-user/:id", verifyToken, deletedUser);
router.put("/update-profile/:id", verifyToken, updateInfoUser);
router.put("/change-password", verifyToken, changePassword);
router.post("/check-password", verifyToken, checkPasswordUser);
router.get("/search/:username", searchUser);
router.post("/delete-user-soft/:id", softDelete);
router.post("/restore-user/:id", RestoreUser);

// Search
router.get("/search-project/:projectname", searchProjectByName);
router.get("/search-delete-user/:username", searchDeletedUser);
router.get("/search-delete-project/:projectname", searchDeletedProject);
router.get("/search-comment/:comment", searchComment);
router.get("/search-delete-comment/:comment", searchDeleteComment);

// Pens
router.post("/create-pens", verifyToken, createPens);
router.post("/get-all-pens-user", getAllPensUser);
router.get("/get-all-pens", getAllPens);
router.get("/get-all-pens-public", getAllPensPublic);

router.get("/get-pens/:id", verifyToken, getDetailsPen);
router.get("/deleted-pens", getDeletedPen);
router.delete("/delete-pens/:id", verifyToken, deletedPen);
router.put("/restore-pen/:id", verifyToken, restorePen);
router.delete("/delete-pen-forever/:id", verifyToken, deletePenForever);
router.put("/update-pens/:id", verifyToken, updatePen);

// Like
router.post("/add-like", verifyToken, addLikes);
router.post("/delete-like", verifyToken, deleteLikes);
router.get("/total-like", totalLike);
router.get("/total-like-pen/:penId", totalLikePen);
router.get("/all-like", verifyToken, getAllLikeByUser);

// Comments
router.post("/send-comments", verifyToken, sendComments);
router.get("/all-comments/:id", getAllCommentsByProject);
router.get("/total-comments", totalComments);
router.post("/delete-comments", verifyToken, deleteCommentByUser);
router.post("/admin/delete-comments", verifyToken, deleteCommentByAdmin);
router.post("/admin/restore-comment", verifyToken, restoreComment);
router.post("/admin/delete-comment-forever", verifyToken, deleteCommentForever);
router.post("/edit-comments", verifyToken, editCommentByUser);
router.get("/admin/all-comments", getAllComments);
router.get("/admin/all-delete-comment", getAllDeleteComments);
router.get("/total-comment-pen/:penId", totalCommentPen);

// Follower
router.post("/create-follower", verifyToken, createFollower);
router.delete("/delete-follower/:followingId", verifyToken, deleteFollower);
router.get("/follower/:followingId", verifyToken, getFollower);
router.get("/get-following", verifyToken, getFollowing);
router.get("/follower-count/:userId", countFollower);
router.get("/list-following-user/:username", getListFollowingUser);

// Notification
router.get("/all-notification", verifyToken, getAllNotificationByUser);
router.get("/count-notification-unread", verifyToken, countNotificationUnread);
router.post("/mark-as-read-notification", verifyToken, markAsReadNotification);
//question
// router.get("/learn/question1", verifyToken, getQuestion1);
module.exports = router;
