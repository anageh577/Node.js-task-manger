const sgMail = require("@sendgrid/mail");
const sendgridapikey =
  "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";

sgMail.setApiKey(sendgridapikey);

sgMail
  .send({
    to: "tipycuwo@thecarinformation.com",
    from: "anageh577@gmail.com",
    subject: "this is my firts email",
    text: "Welcome",
  })
  .then(
    (res) => {
      console.log('send');
    },
    (err) => {
      console.log(err);
    }
  );



