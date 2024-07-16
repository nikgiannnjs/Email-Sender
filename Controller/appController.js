const nodemailer = require("nodemailer");
const mailgen = require("mailgen"); //specifying the email template
require("dotenv").config();

//send mail from test account
exports.signup = async (req, res) => {
  try {
    const testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    const message = {
      from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>',
      to: "bar@example.com, baz@example.com",
      subject: "Hello ✔",
      text: "Hello world?",
      html: "<b>Hello world?</b>",
    };

    transporter.sendMail(message).then((info) => {
      //.then((info) =>{} is a promise. Otan to mail stalei tote info as a callback kai return
      return res.status(201).json({
        msg: "You received an email.",
        info: info.messageId,
        preview: nodemailer.getTestMessageUrl(info),
      });
    });
  } catch {
    res.status(500).json({
      status: fail,
      message: "Failed to send email on /user/signup",
    });
  }
};

//send mail from gmail
exports.getbill = (req, res) => {
  try {
    const userEmail = req.body;

    const emailInfo = {
      service: "gmail",
      auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD,
      },
    };

    const transporter = nodemailer.createTransport(emailInfo);

    const mailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "Mailgen",
        link: "https://mailgen.js/",
      },
    });

    const response = {
      //the body of the email
      body: {
        name: "Demo name",
        intro: "Your bill is ready",
        table: {
          data: [
            {
              item: "Nodemailer stack book",
              description: "A nodejs application",
              price: "10$",
            },
          ],
        },
        outro: "Thank you. Looking forward to collaborate with you again.",
      },
    };

    const mail = mailGenerator.generate(response);

    const message = {
      from: process.env.USER,
      to: userEmail,
      subject: "Invoice",
      html: mail,
    };

    transporter.sendMail(message).then(() => {
      return res.status(201).json({
        message: "You received an email",
      });
    });
  } catch {
    res.status(500).json({
      status: fail,
      message: "Failed to send email on /user/signup",
    });
  }
};
