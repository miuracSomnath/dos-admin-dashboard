import { Card, Paper, Typography, useTheme } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'

export const MobilePriceComponent = ({ setSize }: { setSize: React.Dispatch<React.SetStateAction<string | null>> }) => {
    const { product } = useSelector((state: RootState) => state.product)
    const theme = useTheme()
    return (
        product && <div style={{ height: "50px", backgroundColor: theme.palette.primary.main, display: "grid", alignItems: "center", gridTemplateColumns: "2.5fr 1fr" }}>
            <div style={{
                height: "50px",
                backgroundColor: "#F3F3F3",
                WebkitClipPath: "polygon(0% 0%, calc(100% - 25px) 0, 100% 50%, calc(100% - 25px) 100%, 0% 100%)",
                clipPath: "polygon(0% 0%, calc(100% - 25px) 0, 100% 50%, calc(100% - 25px) 100%, 0% 100%)",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "0px 10px",
                overflowX: "auto",
                maxWidth: "250px"
            }}>
                {product.sizeAvailable.map((size, index) => <div className='cursor-pointer' onClick={() => setSize(size)} key={index} style={{ minWidth: "20px", padding: "5px 5px", textAlign: "center", border: "1px solid #E5E5E5" }}>
                    <Typography variant='subtitle2'>{size}</Typography>
                </div>)}
            </div>
            <Typography style={{ fontFamily: "'Average Sans', sans-serif" }} justifySelf="center" variant='h6' fontWeight={400} color="white">₹{product.price}</Typography>
        </div >
    )
}
