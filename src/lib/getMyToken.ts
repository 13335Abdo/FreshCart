import { decode } from 'next-auth/jwt';
import { cookies } from 'next/headers';

export default async function getMyToken() {

    const myCookies = await cookies()

    const decodeToken =
        myCookies.get("__Secure-next-auth.session-token")?.value ??
        myCookies.get("next-auth.session-token")?.value

    if (!decodeToken) {
        return null
    }

    const token = await decode({ secret: process.env.AUTH_SECRET!, token: decodeToken })



  return token?.realToken
}
