/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const nodemailer = require("nodemailer");

const {setGlobalOptions} = require("firebase-functions");
const {onRequest} = require("firebase-functions/https");
const logger = require("firebase-functions/logger");

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({ maxInstances: 10 });

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const functions = require("firebase-functions");

// ✅ Configure Gmail transporter
// Replace with your Gmail + App Password (not your normal password)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "pwaiag2023@gmail.com",       // your Gmail address
    pass: "wgdalmapyygvhqld"           // your Gmail App Password
  }
});

// ✅ Trigger when a new order is created in Firestore
exports.sendOrderEmail = onDocumentCreated("orders/{orderId}", async (event) => {
  const order = event.data.data();   // get the Firestore document data

  console.log("New order received:", order); // log to check

  const mailOptions = {
    from: "pwaiag2023@gmail.com",
    to: "pwaiag2023@gmail.com",
    subject: `New Order from ${order.userId}`,
    html: `
      <h2>New Order Received</h2>
      <p><strong>User:</strong> ${order.userId}</p>
      <p><strong>Total:</strong> $${order.total}</p>
      <h3>Items:</h3>
      <ul>
        ${order.items.map(i => `<li>${i.title} x${i.quantity} - $${i.price}</li>`).join("")}
      </ul>
      <p><strong>Time:</strong> ${new Date(order.createdAt).toLocaleString()}</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ Order email sent successfully!");
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
});
