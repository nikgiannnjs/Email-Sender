const nodemailer = require("nodemailer");

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

exports.getbill = (req, res) => {
  res.status(201).json("got bill succesfully");
};
