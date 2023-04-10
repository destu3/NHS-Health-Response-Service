import { promisify } from "util";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import catchAsync from "../helpers/catchAsync.js";
import _Patient from "../models/Patient.js";
import _HealthProfessional from "../models/HealthProfessional.js";
import _ServiceManager from "../models/ServiceManager.js";
import HealthProfile from "../models/HealthProfile.js";

class AuthController {
  constructor(
    Patient = _Patient,
    HealthProfessional = _HealthProfessional,
    ServiceManager = _ServiceManager
  ) {
    this.Patient = Patient;
    this.HealthProfessional = HealthProfessional;
    this.ServiceManager = ServiceManager;
  }

  sendToken(payload) {
    return jsonwebtoken.sign(payload, process.env.secret_key, {
      expiresIn: process.env.token_expires_in,
    });
  }

  async verifyPassword(plainText, cipherText) {
    return await bcrypt.compare(plainText, cipherText);
  }

  sendCookie(value, res) {
    const cookieOpts = {
      httpOnly: true,
      domain: "http://127.0.0.1:5500",
    };

    res.cookie("token", value, cookieOpts);
  }

  login() {
    return catchAsync(async (req, res, next) => {
      // get email and password and role
      const email = req.body.email;
      const password = req.body.password;
      const role = req.body.role;

      // check if email and password are given
      if (!email || !password)
        throw new Error("Email or password is not provided");

      if (!role) throw new Error("Please specify a user role");

      let user;

      if (role === "manager") {
        user = await this.ServiceManager.findOne({ email });
      } else if (role === "doctor") {
        user = await this.HealthProfessional.findOne({ email });
      } else {
        user = await this.Patient.findOne({ email });
      }

      // check if user exists based on email and check if password is correct
      if (!user || !(await this.verifyPassword(password, user.password)))
        throw new Error("No user found, Email or password is incorrect");

      user.password = undefined;

      // sign token that user can use in the future to authenticate
      const token = this.sendToken({ user });

      this.sendCookie(token, res);
      // send token
      res.status(200).json({ status: "success", token, user });
    });
  }

  register() {
    return catchAsync(async (req, res, next) => {
      const data = req.body;

      const newDoc = await this.Patient.create(data);

      const hp = await HealthProfile.create({ patient: newDoc.id });

      newDoc.healthProfile = hp;
      await newDoc.save();

      res.status(201).json({ status: "success", data: { newDoc } });
    });
  }

  protect() {
    return catchAsync(async (req, res, next) => {
      // check if token cookie was sent with request

      let token;
      if (req.cookies.token) token = req.cookies.token;
      if (!token)
        throw new Error(
          "token cookie was not sent with request, i.e. user is not logged in"
        );

      // verify token is valid
      const decodedData = await promisify(jsonwebtoken.verify)(
        token,
        process.env.secret_key
      );

      req.user = decodedData.user;

      // grant access to protected route
      next();
    });
  }

  restrict(...roles) {
    return function (req, res, next) {};
  }
}

export default AuthController;
