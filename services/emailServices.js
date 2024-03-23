import path from "path";
import ElasticEmail from "@elasticemail/elasticemail-client";

const { ELASTICEMAIL_API_KEY } = process.env;
const client = ElasticEmail.ApiClient.instance;
const apikey = client.authentications["apikey"];
apikey.apiKey = ELASTICEMAIL_API_KEY;
const emailsApi = new ElasticEmail.EmailsApi();

export const sendEmail = (req, user) => {
  const verificationLink =
    req.protocol +
    "://" +
    path.join(
      req.get("host"),
      "api",
      "users",
      "verify",
      user.verificationToken
    );

  const letterText = `
    <!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Registration Confirmation</title>
<style>
  body { font-family: Arial, sans-serif; line-height: 1.6; }
  .container { width: 80%; margin: 20px auto; padding: 20px; border: 1px solid #ddd; }
  .button { background-color: #4CAF50; color: white; padding: 10px 20px; text-align: center; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer; text-decoration: none; }
  .link { color: #0645AD; text-decoration: none; }
</style>
</head>
<body>
<div class="container">
  <h2>Phonebook Registration Confirmation</h2>
  <p>Thank you for registering with our app. Please confirm your email address by clicking the button below.</p>
  <a href="${verificationLink}" class="button">Confirm Email</a>
  <p>If the button above does not work, please copy and paste the following link into your browser:</p>
  <p>${verificationLink}</p>
</div>
</body>
</html>
`;

  const emailData = {
    Recipients: {
      To: [user.email],
    },
    Content: {
      Body: [
        {
          ContentType: "HTML",
          Charset: "utf-8",
          Content: letterText,
        },
      ],
      From: "vanyagarret@gmail.com",
      Subject: "Confirm the registration on Phonebook",
    },
  };
  const campaign = {
    Name: "hello campaign",
    Recipients: {
      ListNames: ["Ivan"],
      SegmentNames: null,
    },
    Content: [
      {
        From: "vanyagarret@gmail.com",
        ReplyTo: "vanyagarret@gmail.com",
        TemplateName: "hello_template",
        Subject: "Hello",
      },
    ],
    Status: "Draft",
  };

  const callback = (error, data, response) => {
    if (error) {
      console.error(error);
    } else {
      console.log("Email sent.");
    }
  };

  emailsApi.emailsTransactionalPost(emailData, callback);
};
