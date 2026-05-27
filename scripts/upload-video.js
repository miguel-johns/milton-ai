/**
 * Video Upload Script for Vercel Blob
 * 
 * Usage:
 *   node --env-file-if-exists=/vercel/share/.env.project scripts/upload-video.js path/to/video.mp4
 * 
 * This script uploads a video to Vercel Blob and returns the public URL.
 * Add that URL to your NewHomePage.jsx HERO_VIDEO_URL constant.
 */

import { put } from '@vercel/blob'
import { readFile } from 'fs/promises'
import { basename } from 'path'

async function uploadVideo() {
  const filePath = process.argv[2]
  
  if (!filePath) {
    console.error('Usage: node scripts/upload-video.js <path-to-video.mp4>')
    process.exit(1)
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error('Error: BLOB_READ_WRITE_TOKEN environment variable not set')
    console.error('Make sure you run with: node --env-file-if-exists=/vercel/share/.env.project scripts/upload-video.js')
    process.exit(1)
  }

  try {
    console.log(`Reading file: ${filePath}`)
    const fileBuffer = await readFile(filePath)
    const fileName = `videos/${basename(filePath)}`
    
    console.log(`Uploading to Vercel Blob as: ${fileName}`)
    console.log(`File size: ${(fileBuffer.length / 1024 / 1024).toFixed(2)} MB`)
    
    const blob = await put(fileName, fileBuffer, {
      access: 'public',
      contentType: 'video/mp4',
    })
    
    console.log('\n✓ Upload complete!')
    console.log('\nBlob URL (use this in your code):')
    console.log(blob.url)
    console.log('\nAdd this URL to HERO_VIDEO_URL in NewHomePage.jsx')
    
  } catch (error) {
    console.error('Upload failed:', error.message)
    process.exit(1)
  }
}

uploadVideo()
