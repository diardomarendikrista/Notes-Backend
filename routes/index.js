const router = require("express").Router();
const {
  authorize,
  authorizeRead,
  authenticate,
} = require("../middlewares/auth");
const Controller = require("../controllers");
const UserController = require("../controllers/userController");
const NoteController = require("../controllers/noteController");
const TodoController = require("../controllers/todoController");

router.get("/", Controller.getRootHandler);

// User
// Register & Login
router.post("/register", UserController.register);
router.post("/login", UserController.login);

// Need auth
router.use(authenticate);
router.get("/users", UserController.readAll);
router.get("/user", UserController.readById);
router.delete("/users/:id", UserController.deleteUser);

// Note
router.get("/notes", NoteController.readAll);
router.get("/notes/:id", authorizeRead, NoteController.readById);
router.get("/notes/search/:keyword", NoteController.searchNote);
router.post("/notes", NoteController.addNote);
router.put("/notes/:id", authorize, NoteController.editNote);
router.delete("/notes/:id", authorize, NoteController.deleteNote);

// Todo (not yet use due to still using note as todo db)
router.post("/todo", TodoController.add);
router.put("/todo/:id", authorize, TodoController.edit);
router.delete("/todo/:id", authorize, TodoController.delete);

module.exports = router;
