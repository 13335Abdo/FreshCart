import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";


export const nextAuth: NextAuthOptions = {
    providers: [
        Credentials({
            name: "cart",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                try {
                    const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin", {
                        method: "POST",
                        body: JSON.stringify(credentials),
                        headers: { "Content-Type": "application/json" },
                    });

                    const finalres = await res.json();


                    if (finalres.message === "success") {
                        return {
                            id: finalres.user._id,   // ← add this
                            name: finalres.user.name,
                            email: finalres.user.email,
                            realToken: finalres.token,
                        };
                    }

                    return null;
                } catch (error) {
                    throw new Error("Authorization failed. Please try again.");
                }
            },
        }),
    ],
    
    secret: process.env.AUTH_SECRET,

    pages: { signIn: "/login" },


    callbacks: {


        jwt(params) {
            if (params.user) {
                params.token.realToken = (params.user as any).realToken
            }

            return params.token

        },

        session(params) {

            return params.session
            
        },
    }
    
};