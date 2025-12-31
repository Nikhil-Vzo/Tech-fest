import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Resend } from 'resend';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY);

app.post('/api/send-ticket', async (req: Request, res: Response) => {
    try {
        const { user, orderId, paymentId, items, amount, verificationId, isRahasya } = req.body;

        // 1. Create Data Payload
        const ticketRawData = {
            event: "AMISPARK x RAHASYA 2026",
            ticket_id: orderId,
            payment_ref: paymentId,
            attendee_name: `${user.firstName} ${user.lastName}`,
            attendee_email: user.email,
            college: user.college,
            verification_id: verificationId,
            zone: items.join(', '),
            amount_paid: amount,
            status: "CONFIRMED",
            is_rahasya: isRahasya,
            issued_at: new Date().toISOString()
        };

        // 2. Create Verification Link
        // CHANGE THIS to your Vercel URL in production
     const rawBaseUrl = process.env.CLIENT_URL || 'https://tech-fest-client.vercel.app';
        const baseUrl = rawBaseUrl.replace(/\/$/, ''); // Removes '/' from the end if present

        const encodedData = Buffer.from(JSON.stringify(ticketRawData)).toString('base64');
        const verificationLink = `${baseUrl}/#/ticket-view?data=${encodedData}`;

        // 3. Generate QR Image URL (Public API)
        const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(verificationLink)}`;

        // 4. Define Theme
        const themeColor = isRahasya ? '#dc2626' : '#8A2BE2'; 
        const eventName = isRahasya ? 'RAHASYA 2026' : 'AMISPARK 2026';

        // 5. Send Email
        const data = await resend.emails.send({
            from: 'Amity Tech Fest <tickets@amispark.com>', // Ensure this matches your verified domain
            to: [user.email],
            subject: `Your Ticket: ${eventName} Official Entry Pass`,
            html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: 'Courier New', monospace; background-color: #000000; color: #ffffff; padding: 20px; }
                    .container { max-width: 600px; margin: 0 auto; background-color: #111111; border: 2px solid ${themeColor}; border-radius: 10px; overflow: hidden; }
                    .header { background-color: ${themeColor}; color: #ffffff; padding: 20px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 2px; }
                    .qr-section { background-color: #ffffff; padding: 30px; text-align: center; }
                    .qr-code { width: 200px; height: 200px; }
                    .details { padding: 30px; text-align: left; }
                    .row { display: flex; justify-content: space-between; margin-bottom: 15px; border-bottom: 1px solid #333; padding-bottom: 5px; }
                    .label { color: #888; font-size: 12px; text-transform: uppercase; }
                    .value { font-size: 16px; font-weight: bold; color: #fff; }
                    .footer { text-align: center; padding: 20px; font-size: 10px; color: #666; border-top: 1px solid #222; }
                    .warning { color: ${themeColor}; font-weight: bold; margin-top: 10px; font-size: 12px; text-align: center; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        ${eventName}<br>OFFICIAL ENTRY PASS
                    </div>
                    
                    <div class="qr-section">
                        <img src="${qrImageUrl}" alt="Entry QR Code" class="qr-code" />
                        <p style="color: #000; margin-top: 10px; font-weight: bold;">SCAN AT GATE</p>
                    </div>

                    <div class="details">
                        <div class="row">
                            <div>
                                <div class="label">Attendee</div>
                                <div class="value">${user.firstName} ${user.lastName}</div>
                            </div>
                        </div>
                        <div class="row">
                            <div>
                                <div class="label">Zone Access</div>
                                <div class="value">${items.join(', ')}</div>
                            </div>
                        </div>
                        <div class="row">
                            <div>
                                <div class="label">Verification ID</div>
                                <div class="value">${verificationId || 'N/A'}</div>
                            </div>
                        </div>
                        <div class="row">
                            <div>
                                <div class="label">Order Ref</div>
                                <div class="value">${orderId}</div>
                            </div>
                        </div>
                        <div class="warning">
                            DO NOT SHARE THIS QR CODE. <br>
                            IT IS VALID FOR ONE ENTRY ONLY.
                        </div>
                    </div>
                    <div class="footer">
                        Sent via Amispark Secure System<br>
                        Amity University Raipur
                    </div>
                </div>
            </body>
            </html>
            `
        });

        res.status(200).json({ success: true, data });
    } catch (error: any) {
        console.error('Email Error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port😏❤️💕🙌 ${PORT}`));