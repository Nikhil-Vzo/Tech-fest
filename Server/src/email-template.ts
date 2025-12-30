export const generateTicketEmail = (data: any) => {
    const { name, ticketId, zone, amount, qrLink, isRahasya } = data;
    
    // Theme Colors
    const primaryColor = isRahasya ? '#dc2626' : '#8a2be2'; // Red vs Purple
    const bgColor = '#0f0c29';
    const textColor = '#e0e7ff';

    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your Ticket</title>
        <style>
            body { margin: 0; padding: 0; font-family: 'Courier New', monospace; background-color: ${bgColor}; color: ${textColor}; }
            .container { max-width: 600px; margin: 0 auto; background-color: rgba(0,0,0,0.8); border: 2px solid ${primaryColor}; border-radius: 8px; overflow: hidden; }
            .header { background-color: ${primaryColor}; padding: 20px; text-align: center; color: black; font-weight: bold; letter-spacing: 4px; }
            .content { padding: 30px; }
            .field { margin-bottom: 15px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 10px; }
            .label { font-size: 10px; text-transform: uppercase; opacity: 0.7; letter-spacing: 1px; }
            .value { font-size: 16px; font-weight: bold; margin-top: 5px; color: white; }
            .btn-container { text-align: center; margin-top: 30px; }
            .btn { background-color: ${primaryColor}; color: white; padding: 15px 30px; text-decoration: none; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; border-radius: 4px; display: inline-block; }
            .footer { padding: 20px; text-align: center; font-size: 10px; opacity: 0.5; border-top: 1px solid rgba(255,255,255,0.1); }
            .warning { color: #ef4444; font-size: 12px; margin-top: 20px; text-align: center; border: 1px dashed #ef4444; padding: 10px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                ${isRahasya ? 'CLASSIFIED // TICKET' : 'AMISPARK 2026 // PASS'}
            </div>
            <div class="content">
                <div style="text-align: center; margin-bottom: 30px;">
                    <h1 style="margin: 0; font-size: 24px;">ACCESS GRANTED</h1>
                    <p style="margin-top: 5px; opacity: 0.8;">See you at the ${isRahasya ? 'crime scene' : 'premiere'}.</p>
                </div>

                <div class="field">
                    <div class="label">Attendee Name</div>
                    <div class="value">${name}</div>
                </div>

                <div class="field">
                    <div class="label">Ticket ID</div>
                    <div class="value">${ticketId}</div>
                </div>

                <div class="field">
                    <div class="label">Access Zone</div>
                    <div class="value" style="color: ${primaryColor}">${zone}</div>
                </div>

                <div class="field">
                    <div class="label">Amount Paid</div>
                    <div class="value">₹${amount}</div>
                </div>

                <div class="warning">
                    ⚠ <strong>DO NOT SCAN THE QR YOURSELF</strong><br>
                    Scanning your own ticket will mark it as USED and you may be denied entry.
                </div>

                <div class="btn-container">
                    <a href="${qrLink}" class="btn">View Digital Ticket</a>
                </div>
            </div>
            <div class="footer">
                SECURE TRANSMISSION | ${new Date().getFullYear()} AMISPARK x RAHASYA
                <br>This is an automated message.
            </div>
        </div>
    </body>
    </html>
    `;
};