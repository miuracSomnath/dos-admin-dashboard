import { LocationOnOutlined, Share } from '@mui/icons-material'
import { Button, Typography, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import InputField from '../../UI/input-field/input-field'
import reviews from "../components/images/reviews.svg"
import { MobileProductImages } from './ProductImages'

export const ImageContant = () => {
    const { product } = useSelector((state: RootState) => state.product)
    // const { storeFrontDetails } = useSelector((state: RootState) => state.storeFront)
    const theme = useTheme()
    const media = useMediaQuery(theme.breakpoints.up("md"))
    return (
        product &&
        <div style={{ padding: "3% 3%", display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            {media ? (<div style={{ display: "grid", gridTemplateColumns: "1fr 5fr" }}>
                <div style={{
                    display: "grid",
                    gridTemplateRows: "repeat(8, auto)",
                    overflowY: "auto",
                    maxHeight: "450px",
                }}>
                    {[...product.sideImages].map(img => {
                        return (
                            <div>
                                <img src={img.url} alt="img" width="100%" />
                            </div>
                        )
                    })}
                </div>
                <div>
                    <img src={product.sideImages[0].url} alt="img" width="100%" />
                </div>
            </div>) : (<MobileProductImages />)}
            < div style={{ display: "grid", gridTemplateRows: "1fr 1fr 1fr 0.5fr 0.5fr 2fr" }}>
                <div className='p-1'>
                    <Typography fontWeight={600} variant='h5'>{product.productName}</Typography>
                    <img src={reviews} alt="reviews" />
                </div>
                <div className='p-1'>
                    <Typography variant='h6'>Tshirt</Typography>
                    <Typography variant='caption'>by Miurac</Typography>
                </div>
                <div className='p-1'>
                    <Typography variant='h4' fontWeight={700}>₹{product.price}</Typography>
                    <Typography variant='caption'>Plus shipping</Typography>
                </div>
                <div className='p-1 flex gap-4 flex-auto'>
                    <Typography fontWeight={500}>Choose a size :</Typography>
                    {product.sizeAvailable.map(size => <Typography>{size}</Typography>)}
                </div>
                <div className='p-1 gap-4' style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                    <div><Button variant='contained' color='primary' fullWidth>Add to cart</Button></div>
                    <Share />
                </div>
                <div className='grid gap-1'>
                    <div className='flex gap-2'>
                        <LocationOnOutlined />
                        <Typography>Deliver to</Typography>
                    </div>
                    <div className='flex gap-2 '>
                        <div>
                            <InputField placeholder='Enter your pincode' />
                        </div>
                        <div>
                            <Typography display="block" variant='caption'>14 Days Return Policy</Typography>
                            <Typography display="block" variant='caption'>Cash on Delivery available</Typography>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}
