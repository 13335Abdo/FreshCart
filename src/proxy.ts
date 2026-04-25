

import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export default async function proxy(req: NextRequest) {

    const jwt = await getToken({req})
    if (jwt==null) {
        
        return NextResponse.redirect(`${process.env.LOCAL_URL}/login`)
    }

    return NextResponse.next()




}


export const config = {
  matcher: ["/cart", "/shop", "/wishlist", "/checkout", "/allorders"]
}
