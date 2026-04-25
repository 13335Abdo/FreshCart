export interface ProdectType {
    updatedAt: string,
    createdAt: string,
    ratingsAverage: number,
    imageCover: string,
    price: number,
    quantity: number,
    title: string,
    description: string,
    slug: string,
    _id: string,
    ratingsQuantity: string,
    sold: number,
    images: string[],
    category: CategoryType,
    brand: BrandType,
    priceAfterDiscount: number,
    subcategory: CategoryType[]
}
export interface CategoryType {
    image: string,
    name: string,
    _id: string,
    slug: string,
}
interface BrandType {
    image: string,
    name: string,
    _id: string,
    slug: string,
}




export interface valuesOFSignin {
    name: string,
    email: string,
    password: string,
    rePassword: string,
    phone: string,

}
export interface valuesOFLoginin {
    email: string,
    password: string,

}


export interface AddCartType {
    status:string,
    numOfCartItems:number,
    message:string,
    cartId:string,
    data:dataOFAddCartType

}
interface dataOFAddCartType{
    cartOwner:string,
    createdAt:string,
    totalCartPrice:number,
    updatedAt:string,
    _id:string,
    products:ProdectType[],
}
export interface AddWithListType{
    count:number,
    status:string,
    data:ProdectType[]
}

export interface allProdectsInCart {
    status:string,
    message:string,
    numOfCartItems:number,
    cartId:string,
    createdAt:string,
    updatedAt:string,
    totalCartPrice:number,
    data:AllDataInCart,

}
interface AllDataInCart{
    _id:string,
    cartOwner:string,
    products:AllProductsInCart[],

}
export interface AllProductsInCart{
    price:number,
    count:number,
    _id:string,
    product:ProdectType,
}

export interface withListType {
    count:number,
    status:string,
    data:ProdectType[],
}


export interface storeTpe {
        changeNoOFCartItem: {
            cartId:string,
            noOfcart: number,
            totalPriceOfCart:number,
            isLoading: string,
            allProdects: {
                product: ProdectType
                count: number,
                price: number,
                _id: string
            }[],
        }
        changeNoOFWithListItem: {
            isLoading: string,
            noOfWithList: number,
            allItemsInWithList:ProdectType[]
        }

    }


    export interface allProdects {
        id:number,
        updatedAt:string,
        createdAt:string,
        cartItems:AllProductsInCart[],
        user:{
            phone:string,
            email:string,
            name:string,
            _id:string,

        }
        _id:string,
        isDelivered:string,
        isPaid:string,
        paymentMethodType:string,
        totalOrderPrice:number,
        shippingPrice:number,
        taxPrice:number,

    }

    export interface brands {
        updatedAt:string,
        createdAt:string,
        image:string,
        slug:string,
        name:string,
        _id:string
    }

    