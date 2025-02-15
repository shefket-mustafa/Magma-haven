import { Router } from "express";

import authService from "../services/auth-service.js";
import { getErrorMessage } from "../utils/errorUtils.js";
import { isLoggedIn } from "../middlewares/authMiddleware.js";

const authController = Router();

authController.get("/register", isLoggedIn, (req, res) => {
  res.render("auth/register", { title: "Register Page" });
});

authController.post("/register", async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  try {
    await authService.register(username, email, password, confirmPassword);
    const token = await authService.login(email, password);
    res.cookie("auth", token, { httpOnly: true });
    res.redirect("/");
  } catch (err) {
    const error = getErrorMessage(err)
    res.render("auth/register", {
      title: "Register Page",
      username,
      email,
      error
    });
  }
});

authController.get("/login", (req, res) => {
  res.render("auth/login", { title: "Login Page" });
});

authController.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await authService.login(email, password);
    res.cookie("auth", token, { httpOnly: true });
    res.redirect("/");
  } catch (err) {
    const error = getErrorMessage(err);
    res.render("auth/login", {
      title: "Login Page",
      email,
      error
    });
  }
});

authController.get('/logout', (req,res) => {
    res.clearCookie('auth');
    res.redirect('/');
});

export default authController;
