import { CurrencyRupee, LocationOnOutlined, Loop, Share } from '@mui/icons-material'
import { Button, Card, Typography, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import InputField from '../../UI/input-field/input-field'
import reviews from "../components/images/reviews.svg"
import { MobileProductImages } from './ProductImages'

export const ImageContant = ({ AddToCard, setSize }: {
    AddToCard: () => void,
    setSize: React.Dispatch<React.SetStateAction<string | null>>
}) => {
    const { product } = useSelector((state: RootState) => state.product)
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
                            <div key={img.sideName}>
                                <img src={img.url} alt="img" width="100%" />
                            </div>
                        )
                    })}
                </div>
                <div>
                    <img src={product.sideImages[0].url} alt="img" width="100%" />
                </div>
            </div>) : (<MobileProductImages />)}
            < div className='gap-4' style={{ display: "grid", gridTemplateRows: "0.5fr 0.5fr 0.5fr 0.3fr 0.5fr 1fr" }}>
                <div className='p-1'>
                    <Typography fontWeight={600} variant='h5'>{product.productName}</Typography>
                    <img src={reviews} alt="reviews" />
                </div>
                <div className='p-1'>
                    <Typography variant='h6'>Tshirt</Typography>
                    <Typography variant='caption'>by Miurac</Typography>
                </div>
                <div className='p-1'>
                    <Typography variant='h4' fontWeight={600}>₹{product.price}</Typography>
                    <Typography variant='caption'>Plus shipping</Typography>
                </div>
                <div className='p-1'>
                    <Typography fontWeight={500}>Choose a size :</Typography>
                    <div className='flex gap-4'>
                        {product.sizeAvailable.map((size, index) => <div key={index} onClick={() => setSize(size)} className='size'><Typography variant='subtitle2'>{size}</Typography></div>)}
                    </div>
                </div>
                <div className='p-1 gap-4' style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr" }}>
                    <div><Button variant='contained' color='primary' fullWidth onClick={AddToCard}>Add to cart</Button></div>
                    <Share />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "5px", justifyItems: "flex-end" }}>
                    <div className='flex'>
                        <LocationOnOutlined />
                        <Typography>Deliver to</Typography>
                    </div>
                    <div className='flex gap-2 flex-wrap'>
                        <div>
                            <InputField placeholder='Enter your pincode' />
                        </div>
                        <div>
                            <div className='flex'><Loop fontSize='small' /><Typography display="block" variant='caption'>14 Days Return Policy</Typography></div>
                            <div className='flex'><CurrencyRupee fontSize='small' /><Typography display="block" variant='caption'>Cash on Delivery available</Typography></div>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}
