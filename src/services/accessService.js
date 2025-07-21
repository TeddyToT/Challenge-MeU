const AuthService = require("./authService");
const UserModel = require("../models/userModel");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

const nodeMail = process.env.NODE_EMAIL;
const nodeMailPassword = process.env.NODE_EMAIL_PASS;



class AccessService {
  static signUp = async ({ name, email, phone, password }) => {


      const existEmail = await UserModel.findNotDuplicate({ email });
      if (existEmail.success === false) {
        // throw new Error("Email already in use")
        return {success: false, message: "Email already in use"}


      }

      const existPhone = await UserModel.findNotDuplicate({ phone });
      if (existPhone.success === false) {
        return {success: false, message: "Phone already in use"}

      }

      const newUser = await UserModel.create({ name, email, phone, password });
      if (!newUser || !newUser.uid) {
        return { success: false };
      }

      if (email) {
        var transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: nodeMail,
            pass: nodeMailPassword,
          },
        });

        var mailoptions = {
          from: nodeMail,
          to: newUser.email,
          subject: "Đăng ký thành công",
          html: `
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 10px; border: 2px solid #e0e0e0; border-radius: 10px;">
                            <h2 style="color:rgba(16, 95, 49, 1); text-align: center;">Welcome to Our Project!</h2>
                            <p style="font-size: 18px; color: #333;">Xin chào bạn,</p>
                            <p style="font-size: 16px; color: #333;">
                                Chúng tôi rất vui mừng khi có bạn tham gia. Bạn đã đăng ký tài khoản thành công.
                            </p>
                            <div style="text-align: center; margin: 20px 0;">
                                <img src="https://img.freepik.com/free-vector/thank-you-lettering_1262-6963.jpg" alt="Thank You" style="max-width: 50%; max-height: 100px; border-radius: 10px;">
                            </div>

                            <p style="font-size: 16px; color: #333;">
                                Nếu bạn có bất kỳ câu hỏi nào, đừng ngần ngại <a href="mailto:${nodeMail}" style="color: rgba(16, 95, 49, 1);">liên hệ với chúng tôi</a>.
                            </p>
                            <p style="font-size: 16px; color: #333;">
                                Trân trọng,<br>
                                Tran Tuan Minh
                            </p>
                        </div>
                    `,
        };

        transporter.sendMail(mailoptions, function (error, info) {
          if (error) {
            console.log("Couldn't send mail, error: ",error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });
      }
      return {
        success: true,
      };

  };

  static logIn = async ({ email, password }) => {


      const existUser = await UserModel.findByEmail(email);
      // console.log(existUser);
      if (existUser?.email === undefined) {
        return {success: false, message: "This email is not registered"}
      }

      const match = await bcrypt.compare(password, existUser.password);
      if (!match) {
        return {success: false, message: "Wrong password"}
      }

      const payload = { uid: existUser.uid, email, name: existUser.name };
      const accessToken = await AuthService.createAccessToken(payload);

      return {
        success: true,
        user: {uid:existUser.uid, email:existUser.email, name: existUser.name} ,
        accessToken: accessToken,
      };
  };
}

module.exports = AccessService;
