const twilio = require("twilio");
require("dotenv").config();

const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const whatsappNumber = process.env.TWILIO_WHATSAPP_NUMBER;

/**
 * Sends a WhatsApp message to multiple recipients.
 * @param {Array} recipients - List of recipient phone numbers
 * @param {string} message - Message body
 */
async function sendWhatsApp(recipients, message) {
    try {
        if (recipients.length === 0) {
            console.log("No recipients to notify.");
            return;
        }

        const sendMessages = recipients.map(number =>
            client.messages.create({
                from: `whatsapp:${whatsappNumber}`,
                to: `whatsapp:${number}`,
                body: message,
            })
        );

        await Promise.all(sendMessages);
        console.log(`✅ WhatsApp messages sent to ${recipients.length} donors.`);
    } catch (error) {
        console.error("❌ Error sending WhatsApp messages:", error);
    }
}

module.exports = { sendWhatsApp };
