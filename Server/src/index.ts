import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Resend } from 'resend';
import { generateTicketEmail } from './email-template';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Resend
// NOTE: You must add RESEND_API_KEY to your server/.env file
const resend = new Resend(process.env.RESEND_API_KEY);

// Health Check
app.get('/', (req, res) => {
    res.send('Amispark Mailer Service is Running');
});

// Send Ticket Endpoint
app.post('/api/send-ticket', async (req, res) => {
    try {
        const { email, name, ticketId, zone, amount, qrLink, isRahasya } = req.body;

        if (!email || !ticketId) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const emailHtml = generateTicketEmail({ name, ticketId, zone, amount, qrLink, isRahasya });

        const data = await resend.emails.send({
            from: 'Amispark Tickets <tickets@amispark.com>', // You will need to verify a domain in Resend or use 'onboarding@resend.dev' for testing
            to: [email],
            subject: isRahasya ? 'CONFIDENTIAL: Your Access Protocols' : 'Your Ticket for Amispark 2026',
            html: emailHtml,
        });

        if (data.error) {
            console.error('Resend Error:', data.error);
            return res.status(500).json({ error: 'Failed to send email via Resend' });
        }

        console.log(`Ticket sent to ${email} (ID: ${ticketId})`);
        res.status(200).json({ message: 'Ticket mailed successfully', data });

    } catch (error) {
        console.error('Server Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});