import { createClient } from '@supabase/supabase-js'

export const config = {
  api: {
    bodyParser: false, // We'll handle multipart/form-data manually
  },
}

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
    // Parse multipart form data
    const formData = await parseFormData(req)
    
    const { prompt, phone, email, firstName, businessName, chips } = formData.fields
    const file = formData.file

    // Validate required fields
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
        parsedChips = JSON.parse(chips)
      } catch {
        parsedChips = []
      }
    }

    // Insert lead into database
    const { data, error } = await supabase
      .from('leads')
      .insert({
        name: firstName || null,
        email: email.toLowerCase().trim(),
        phone: phone.trim(),
        company: businessName || null,
        prompt: prompt || null,
        chips: parsedChips,
        has_file: !!file,
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

    // If there's a file, we could upload it to blob storage here
    // For now, we'll just note that a file was attached

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

// Simple multipart form data parser
async function parseFormData(req) {
  return new Promise((resolve, reject) => {
    const chunks = []
    req.on('data', chunk => chunks.push(chunk))
    req.on('end', () => {
      const buffer = Buffer.concat(chunks)
      const contentType = req.headers['content-type'] || ''
      
      if (contentType.includes('multipart/form-data')) {
        const boundary = contentType.split('boundary=')[1]
        if (!boundary) {
          return resolve({ fields: {}, file: null })
        }

        const parts = buffer.toString().split(`--${boundary}`)
        const fields = {}
        let file = null

        for (const part of parts) {
          if (part.includes('Content-Disposition')) {
            const nameMatch = part.match(/name="([^"]+)"/)
            const filenameMatch = part.match(/filename="([^"]+)"/)
            
            if (nameMatch) {
              const name = nameMatch[1]
              // Find the value after the double newline
              const valueStart = part.indexOf('\r\n\r\n')
              if (valueStart !== -1) {
                let value = part.substring(valueStart + 4)
                // Remove trailing \r\n
                value = value.replace(/\r\n$/, '')
                
                if (filenameMatch) {
                  file = { name: filenameMatch[1], data: value }
                } else {
                  fields[name] = value
                }
              }
            }
          }
        }

        resolve({ fields, file })
      } else {
        // Fallback for JSON
        try {
          const json = JSON.parse(buffer.toString())
          resolve({ fields: json, file: null })
        } catch {
          resolve({ fields: {}, file: null })
        }
      }
    })
    req.on('error', reject)
  })
}
