"use server"
import { ValueType } from "@/app/_components/PaymentComponent"
import getMyToken from "@/lib/getMyToken"
import { AddCartType, AddWithListType, allProdects, allProdectsInCart, brands, CategoryType, ProdectType, valuesOFLoginin, valuesOFSignin, withListType } from "@/types/types"
import { cookies } from "next/headers"


export async function GerAllProdects(): Promise<ProdectType[] | null> {
    try {
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products`,{
            cache:"force-cache"
        })
        const data = await res.json()
        return data.data

    } catch (error) {
        return null


    }
}


export async function GerAllCategorys(): Promise<CategoryType[] | null> {
    try {
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/categories`,{
            cache:"force-cache"
        })
        const data = await res.json()
        return data.data

    } catch (error) {
        return null


    }
}
export async function GetSpacificProdect(id: string): Promise<ProdectType | null> {
    try {
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
        const data = await res.json()
        return data.data

    } catch (error) {
        return null


    }
}
export async function Signup(values: valuesOFSignin) {
    try {
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/signup`, {
            method: "POST",
            body: JSON.stringify(values),
            headers: { "Content-Type": "application/json" }
        })
        const data = await res.json()
        return data.message

    } catch (error) {
        return null


    }
}
export async function Login(values: valuesOFLoginin) {
    try {
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/signin`, {
            method: "POST",
            body: JSON.stringify(values),
            headers: { "Content-Type": "application/json" }
        })
        const data = await res.json()

        const myCookies = await cookies()

        myCookies.set("token", data.token, {
            httpOnly: true,
            maxAge: 60 * 60 * 24,
            secure: true,
            sameSite: "strict",
        })

        return data.message

    } catch (error) {
        return null


    }
}




export async function addTocartBtn(productId: string): Promise<AddCartType | null> {

    const token = await getMyToken()


    try {
        const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`, {
            method: "POST",
            body: JSON.stringify({ productId: productId }),
            headers: { "Content-Type": "application/json", token: token as string }
        })
        const data = await res.json()
        return data

    } catch (error) {
        return null


    }
}
export async function addToWithListBtn(productId: string): Promise<AddCartType | null> {

    const token = await getMyToken()


    try {
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
            method: "POST",
            body: JSON.stringify({ productId: productId }),
            headers: { "Content-Type": "application/json", token: token as string }
        })
        const data = await res.json()
        return data

    } catch (error) {
        return null


    }
}



export async function GerLogedUser(): Promise<AddCartType | null> {
    const token = await getMyToken()

    try {
        const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`, {
            headers: { token: token as string }
        })
        const data = await res.json()

        return data

    } catch (error) {
        return null


    }
}
export async function GetWithListUser(): Promise<AddWithListType | null> {
    const token = await getMyToken()

    try {
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
            headers: { token: token as string }
        })
        const data = await res.json()
        return data

    } catch (error) {
        return null


    }
}
export async function GetAllProdectsInCartUser(): Promise<allProdectsInCart | null> {
    const token = await getMyToken()

    try {
        const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`, {
            headers: { token: token as string }
        })
        const data = await res.json()

        return data

    } catch (error) {
        return null


    }
}




export async function DeleteItemFromCart(productId: string) {

    const token = await getMyToken()


    try {
        const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${productId}`, {
            method: "DELETE",
            headers: { token: token as string }
        })
        const data = await res.json()
        return data

    } catch (error) {
        return null


    }
}
export async function CallUpdateApi(productId: string, count: number) {

    const token = await getMyToken()


    try {
        const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${productId}`, {
            method: "PUT",
            body: JSON.stringify({ count: count }),
            headers: { "Content-Type": "application/json", token: token as string }
        })
        const data = await res.json()
        return data

    } catch (error) {
        return null


    }
}

export async function getLoggedUserWithList():Promise<withListType | null> {
    const token = await getMyToken()

    try {
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`,

            { headers: { token: token as string } }
        )
        const data = await res.json()
        return data

    } catch (error) {
        
        return null
    }
}





export async function DeleteItemFromWiyhList(productId: string) {

    const token = await getMyToken()

    try {
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
            method: "DELETE",
            headers: { token: token as string }
        })
        const data = await res.json()


        return data

    } catch (error) {
        return null


    }
}


interface Values{
    shippingAddress : ValueType
}


export async function createCashOrder(values : Values,cartId:string){

    const token = await getMyToken()


    try {
        const res = await fetch(`https://ecommerce.routemisr.com/api/v2/orders/${cartId}`, {
            method: "POST",
            body: JSON.stringify({ values }),
            headers: { "Content-Type": "application/json", token: token as string }
        })
        const data = await res.json()
        return data.status

    } catch (error) {
        return null


    }
}






export async function createCardOrder(values : Values,cartId:string){

    const token = await getMyToken()

    try {
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=https://fresh-cart-teal-zeta.vercel.app`, {
            method: "POST",
            body: JSON.stringify({ values }),
            headers: { "Content-Type": "application/json", token: token as string }
        })
        const data = await res.json()
        return data

    } catch (error) {
        return null


    }
}



import { jwtDecode } from "jwt-decode"
export async function GerUserOrders():Promise<allProdects[]  | null> {

    const token = await getMyToken()


    if (typeof token !== 'string' || !token) {
        return null;
    }

    const {id}:{id:string} = jwtDecode(token)


    try {
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
        const data = await res.json()

        return data

    } catch (error) {
        return null


    }
}



export async function GerAllBrands():Promise<brands[] | null> {

    
    

    try {
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/brands`,{
            cache:"force-cache"
        })
        const data = await res.json()
        return data.data

    } catch (error) {
        return null


    }
}



export async function sendEmailForgetPass(email:string){

    try {
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, {
            method: "POST",
            body: JSON.stringify({ email }),
            headers: { "Content-Type": "application/json" }
        })
        const data = await res.json()
        return data

    } catch (error) {
        return null


    }
}
export async function CodeOfForgetPass(code:string){

    try {
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, {
            method: "POST",
            body: JSON.stringify({resetCode : code }),
            headers: { "Content-Type": "application/json" }
        })
        const data = await res.json()
        return data

    } catch (error) {
        return null


    }
}


export async function ResetPassword(email:string , pass:string){

    try {
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, {
            method: "PUT",
            body: JSON.stringify({newPassword : pass , email}),
            headers: { "Content-Type": "application/json" }
        })
        const data = await res.json()
        return true

    } catch (error) {
        return null


    }
}



export async function CreateReviewForProduct(productId?:string , review?:string , rating?:number){

    const token = await getMyToken()

    try {
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${productId}/reviews`, {
            method: "POST",
            body: JSON.stringify({review , rating }),
            headers: { "Content-Type": "application/json", token: token as string }
        })
        const data = await res.json()
        return data

    } catch (error) {
        return null


    }
}



export async function GetReviewsForProduct(productId?:string) {
    try {
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${productId}/reviews`)

        const data = await res.json()

        return data.data

    } catch (error) {
        return null


    }
}


export async function ChangePassword(currentPassword:string , password:string , rePassword:string){

    const token = await getMyToken()

    try {
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/users/changeMyPassword`, {
            method: "PUT",
            body: JSON.stringify({currentPassword , password , rePassword}),
            headers: { "Content-Type": "application/json" , token: token as string }
        })
        const data = await res.json()
        return data

    } catch (error) {
        return null


    }
}