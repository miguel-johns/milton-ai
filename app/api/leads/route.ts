import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, company } = body

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Create Supabase client
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_ANON_KEY!
    )

    // Insert the lead
    const { data, error } = await supabase
      .from('leads')
      .insert([
        {
          name: name.trim(),
          email: email.trim().toLowerCase(),
          phone: phone?.trim() || null,
          company: company?.trim() || null,
        }
      ])
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      
      // Handle duplicate email
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'This email is already registered' },
          { status: 409 }
        )
      }
      
      return NextResponse.json(
        { error: 'Failed to save lead' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { success: true, data },
      { status: 201 }
    )
  } catch (err) {
    console.error('Handler error:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
