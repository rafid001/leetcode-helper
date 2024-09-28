import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'

const LEETCODE_API_URL = "https://leetcode.com/api/submissions/"
const LEETCODE_SESSION = process.env.LEETCODE_SESSION;

interface LeetCodeSubmission {  
  id: number
  title: string
  status_display: string
}

interface LeetCodeResponse {
  submissions_dump: LeetCodeSubmission[]
  has_next: boolean
  last_key: string | null
}

export async function GET(request: NextRequest) {
  console.log("inside get")
  try {
    console.log("GET request received")
    // Get query parameters
    const { searchParams } = new URL(request.url)
    const offset = searchParams.get('offset') || '0'
    const limit = searchParams.get('limit') || '25'
    const lastKey = searchParams.get('lastKey') || ''

    console.log('Received query params:', { offset, limit, lastKey })

    const response = await axios.get<LeetCodeResponse>(`${LEETCODE_API_URL}?offset=${offset}&limit=${limit}&lastkey=${lastKey}`, {
      headers: {
        Cookie: `LEETCODE_SESSION=${LEETCODE_SESSION}`,
        Referer: "https://leetcode.com",
        "X-Requested-With": "XMLHttpRequest",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
      }
    })

    return NextResponse.json(response.data)
  } catch (error) {
    console.error("Error:", error instanceof Error ? error.message : String(error))
    return NextResponse.json({ error: 'An error occurred while fetching data from LeetCode' }, { status: 500 })
  }
}

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json()
//     console.log('Received body:', body)

//     // You can now use the data from the body to customize your request to LeetCode
//     // For example, you might use it to set the offset or limit

//     const response = await axios.get<LeetCodeResponse>(LEETCODE_API_URL, {
//       headers: {
//         Cookie: `LEETCODE_SESSION=${LEETCODE_SESSION}`,
//         Referer: "https://leetcode.com",
//         "X-Requested-With": "XMLHttpRequest",
//         "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
//       }
//     })

//     return NextResponse.json({ ...response.data, receivedBody: body })
//   } catch (error) {
//     console.error("Error:", error instanceof Error ? error.message : String(error))
//     return NextResponse.json({ error: 'An error occurred while processing your request' }, { status: 500 })
//   }
// }