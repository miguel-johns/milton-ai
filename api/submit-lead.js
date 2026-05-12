import { createClient } from '@supabase/supabase-js'

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { prompt, phone, email, firstName, businessName, chips } = req.body

    // Validate required fields
    if (!firstName || !firstName.trim()) {
      return res.status(400).json({ error: 'First name is required' })
    }

    if (!businessName || !businessName.trim()) {
      return res.status(400).json({ error: 'Business name is required' })
    }

    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Valid email is required' })
    }

    if (!phone || phone.replace(/\D/g, '').length < 10) {
      return res.status(400).json({ error: 'Phone number must have at least 10 digits' })
    }

    // Initialize Supabase client
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_ANON_KEY
    )

    // Parse chips if it's a JSON string
    let parsedChips = []
    if (chips) {
      try {
        parsedChips = typeof chips === 'string' ? JSON.parse(chips) : chips
      } catch {
        parsedChips = []
      }
    }

    // Insert lead into database
    const { data, error } = await supabase
      .from('leads')
      .insert({
        name: firstName.trim(),
        email: email.toLowerCase().trim(),
        phone: phone.trim(),
        company: businessName.trim(),
        prompt: prompt || null,
        chips: parsedChips,
        has_file: false,
      })
      .select()
      .single()

    if (error) {
      // Handle duplicate email
      if (error.code === '23505') {
        return res.status(409).json({ error: 'This email is already registered' })
      }
      console.error('Supabase error:', error)
      return res.status(500).json({ error: 'Failed to save your information' })
    }

    // Send Slack notification
    const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL
    if (slackWebhookUrl) {
      try {
        // Determine lead source tag
        const isScwLead = parsedChips && parsedChips.includes('scw-summit')
        const leadTag = isScwLead ? 'SCW Guide Leads' : 'Web Leads'
        
        const slackMessage = {
          blocks: [
            {
              type: 'header',
              text: {
                type: 'plain_text',
                text: `🎯 New Lead: ${leadTag}`,
                emoji: true
              }
            },
            {
              type: 'section',
              fields: [
                { type: 'mrkdwn', text: `*Name:*\n${firstName.trim()}` },
                { type: 'mrkdwn', text: `*Company:*\n${businessName.trim()}` },
                { type: 'mrkdwn', text: `*Email:*\n${email.toLowerCase().trim()}` },
                { type: 'mrkdwn', text: `*Phone:*\n${phone.trim()}` }
              ]
            },
            ...(prompt ? [{
              type: 'section',
              text: { type: 'mrkdwn', text: `*Source:*\n${prompt}` }
            }] : []),
            {
              type: 'context',
              elements: [
                { type: 'mrkdwn', text: `Tags: ${parsedChips.join(', ') || 'none'}` }
              ]
            }
          ]
        }

        await fetch(slackWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(slackMessage)
        })
      } catch (slackError) {
        console.error('Slack notification error:', slackError)
        // Don't fail the request if Slack fails
      }
    }

    return res.status(200).json({ 
      success: true,
      message: 'Lead captured successfully',
      id: data.id
    })

  } catch (error) {
    console.error('Error processing lead:', error)
    return res.status(500).json({ error: 'Something went wrong' })
  }
}
