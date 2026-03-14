import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { name, email, phone, company } = await request.json();
    
    // Validate required fields
    if (!name || !email || !phone || !company) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const timestamp = new Date().toISOString();
    const results = { slack: false, sheets: false };

    // 1. Send Slack notification
    const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;
    if (slackWebhookUrl) {
      try {
        const slackPayload = {
          blocks: [
            {
              type: "header",
              text: {
                type: "plain_text",
                text: "New Demo Request",
                emoji: true
              }
            },
            {
              type: "section",
              fields: [
                {
                  type: "mrkdwn",
                  text: `*Name:*\n${name}`
                },
                {
                  type: "mrkdwn",
                  text: `*Company:*\n${company}`
                },
                {
                  type: "mrkdwn",
                  text: `*Email:*\n${email}`
                },
                {
                  type: "mrkdwn",
                  text: `*Phone:*\n${phone}`
                }
              ]
            },
            {
              type: "context",
              elements: [
                {
                  type: "mrkdwn",
                  text: `Submitted at ${new Date(timestamp).toLocaleString()}`
                }
              ]
            }
          ]
        };

        const slackResponse = await fetch(slackWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(slackPayload)
        });
        
        results.slack = slackResponse.ok;
      } catch (slackError) {
        console.error('Slack notification failed:', slackError);
      }
    }

    // 2. Append to Google Sheet
    const googleEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const googlePrivateKey = process.env.GOOGLE_PRIVATE_KEY;
    const sheetId = process.env.GOOGLE_SHEET_ID;

    if (googleEmail && googlePrivateKey && sheetId) {
      try {
        // Parse private key (handle escaped newlines from env var)
        const privateKey = googlePrivateKey.replace(/\\n/g, '\n');

        const auth = new google.auth.JWT(
          googleEmail,
          null,
          privateKey,
          ['https://www.googleapis.com/auth/spreadsheets']
        );

        const sheets = google.sheets({ version: 'v4', auth });

        await sheets.spreadsheets.values.append({
          spreadsheetId: sheetId,
          range: 'Sheet1!A:E',
          valueInputOption: 'USER_ENTERED',
          insertDataOption: 'INSERT_ROWS',
          requestBody: {
            values: [[timestamp, name, email, phone, company]]
          }
        });

        results.sheets = true;
      } catch (sheetsError) {
        console.error('Google Sheets append failed:', sheetsError);
      }
    }

    return NextResponse.json({
      success: true,
      results
    });

  } catch (error) {
    console.error('Demo form API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
