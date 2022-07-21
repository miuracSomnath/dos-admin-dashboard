import { Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useState } from 'react'
import { Header } from './header/Header'
import { HeaderTop } from '../components/HeaderTop'
import { MobileContent } from '../components/MobileContent'
import { MobileHeader } from '../components/MobileHeader'
import { MobilePriceComponent } from '../components/PriceComponent'
import { MobileProductImages } from '../components/ProductImages'
import { NavBar } from '../components/NavBar'
import { ImageContant } from '../components/ImageContant'
import { ProductDetails } from '../components/ProductDetails'
import { Ratings } from '../components/Ratings'
import { RootState } from '../../store/store'
import { useDispatch, useSelector } from 'react-redux'
import ProductsCard from '../components/ProductsCard'
import { MobileAddCart } from '../components/MobileAddCart'
import { addCartProducts, addLocalCart } from '../../store/cartSlice'
import { useNavigate } from 'react-router-dom'
import { setNotification, setWarning } from '../../store/alertslice'
import { v4 as uuidv4 } from 'uuid';

type cartProduct = {
    productId: string
    size: string
}

const ProductPage = () => {
    const [size, setSize] = useState<string | null>(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const theme = useTheme()
    const media = useMediaQuery(theme.breakpoints.up("sm"))
    const { productsList } = useSelector((state: RootState) => state.storeFront)
    const medium = useMediaQuery(theme.breakpoints.up("md"))
    const { product } = useSelector((state: RootState) => state.product)
    const { cartProductList } = useSelector((state: RootState) => state.cart)

    const AddToCard = () => {
        if (!product) return
        const productid = cartProductList.filter(item => item.product.productId === product.productId)
        const productSize = productid.filter(item => item.size === size)
        if (productid.length > 0 && productSize.length > 0) {
            navigate("/cart")
            dispatch(setNotification("Item already exists in cart"))
        } else {
            if (size) {
                const id = uuidv4()
                const localCart = {
                    productID: product.productId,
                    size: size,
                    count: 1,
                    resellerId: product.resellerId,
                    id: id
                }
                dispatch(addCartProducts({
                    product: product,
                    size: size,
                    count: 1,
                    id: id
                }))
                dispatch(addLocalCart(localCart))
                dispatch(setNotification("Item added to cart"))
                navigate("/cart")
            } else {
                dispatch(setWarning("Please select a Size to proceed"))
            }
        }
    }

    return (
        <div>
            {media ?
                (
                    <ImageContant AddToCard={AddToCard} setSize={setSize} />
                )
                :
                (
                    <>
                        <MobileProductImages />
                        <MobilePriceComponent setSize={setSize} />
                        <MobileContent />
                        <MobileAddCart AddToCard={AddToCard} />
                    </>
                )}
            <div className={medium ? 'grid grid-cols-2 mx-10 space-x-10' : "mx-10 grid gap-5"}>
                <ProductDetails />
                <Ratings />
            </div>
            <Typography className='py-10 text-center' variant='h5'>Recommended Products</Typography>
            {
                productsList && <div className={medium ? 'grid grid-cols-4 mx-20 gap-8' : 'grid gap-8'}>
                    {productsList.map(item => {
                        return (
                            <ProductsCard key={item.productId} comparedPrice={item.comparePrice} images={item.sideImages} price={item.price} productName={item.productName} sizeArray={item.sizeAvailable} />
                        )
                    })}
                </div>
            }
        </div >
    )
}

export default ProductPage
