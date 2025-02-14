import { Router } from "express";

import authService from "../services/auth-service.js";

const authController = Router();

authController.get("/register", (req, res) => {
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
    res.render("auth/register", {
      title: "Register Page",
      username,
      email,
      error: err.message,
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
    res.render("auth/login", {
      title: "Login Page",
      email,
      error: err.message,
    });
  }
});

authController.get('/logout', (req,res) => {
    res.clearCookie('auth');
    res.redirect('/');
});

export default authController;
