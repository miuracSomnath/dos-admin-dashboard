import { Button, Typography, TextField, Grid, IconButton, Popover } from '@mui/material';
import './homepage.css';
import { auth, logoutUser } from '../../redux-tool/auth';
import { PersonOutlineOutlined, CloudUploadOutlined, MoreVert, Edit } from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import { useDispatch } from 'react-redux';
import usePreviewImage from '../hooks/preview-image';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
// import { UploadModal } from '@dropout-store/upload-modal/src/index';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { SimpleModal } from 'libs/cmi/src/lib/features/custom_merch_interface(CMI)/ui-components/modal';
import { app } from '../../firebaseConfig/config';
import { ImageCropInput } from '@dropout-store/image-crop-input';
/* eslint-disable-next-line */
export interface StoreFrontProps { }

export function StoreFront(props: StoreFrontProps) {
  const dispatch = useDispatch()
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [imageurl, setImageurl] = useState<string>("")
  const [bannerFile, setBannerFile] = useState<File | string | undefined>("")
  const [editModal, setEditModal] = useState(false)
  const [error, setError] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [imageDimensions, setimageDimensions] = useState({
    height: 0,
    width: 0
  })


  // const logoPreview = usePreviewImage(imageFile)



  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  }

  const open = Boolean(anchorEl);
  const user = auth.currentUser

  const Input = styled('input')({
    display: 'none',
  });


  return (
    <div id="bg">
      {editModal && <ImageCropInput app={app} setEditModal={setEditModal} errorMessage={errorMessage} />}
      <div className='header'>
        <PersonOutlineOutlined fontSize='large' />
        <Typography variant='h6'>{user?.email}</Typography>
        <IconButton onClick={handleClick}>
          <MoreVert />
        </IconButton>
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
        >
          <Box sx={{ p: 2 }} onClick={() => dispatch(logoutUser())} style={{ cursor: "pointer" }}>Logout</Box>
        </Popover>
      </div>
      <Typography gutterBottom padding={5} variant='h4' align='center'>Customize Storefront</Typography>
      <div style={{ maxWidth: "60%", margin: "auto" }}>
        <div className='card'>
          <Typography>Upload store profile image :</Typography>
          {imageurl !== "" ? (
            <div style={{ position: "relative", width: "140px", margin: "auto" }}>
              <img className='logoImage' src={imageurl} alt="logo" />
              <IconButton onClick={() => { setEditModal(true) }} style={{ position: "absolute", bottom: "15px", right: "0px", backgroundColor: "grey" }}>
                <Edit color='primary' />
              </IconButton>
            </div>
          ) : (
            <div id='circle'>
              <label htmlFor="icon-button-file">
                <IconButton style={{ height: "100px", width: "100px" }} color="primary" aria-label="upload picture" component="span" onClick={() => {
                  setErrorMessage("upload image 120*120")
                  setimageDimensions({
                    height: 120,
                    width: 120
                  })
                  setEditModal(true)
                }}>
                  <CloudUploadOutlined fontSize='large' />
                </IconButton>
              </label>
            </div>
          )}
          <Typography >Name of the Storefront :</Typography>
          <TextField InputProps={{ style: { height: 40 } }} id="outlined-basic" fullWidth variant="outlined" />
        </div >
        <div className='card'>
          <Typography>Upload banner image</Typography>
          <section style={{ cursor: "pointer" }}>
            <div {...getRootProps({ className: 'dropzone' })} style={{ padding: "40px 30px 0px" }}>
              <input {...getInputProps()} />
              <div style={{ textAlign: "center" }}><CloudUploadOutlined fontSize='large' /></div>
              {/* <Typography variant='caption' display="block" color={'GrayText'} align='center'>or drop files to upload</Typography> */}
              <Typography variant='caption' display="block" color={'GrayText'} align='center'>1440 px (width) x 400px (height)</Typography>
            </div>
          </section>
        </div>
        <div className='card'>
          <Typography>Select the widget style :</Typography>

          {/* {gridConfig.map(gridTemplateAreas => (
            <div className="container gridStyle" style={{ gridTemplateAreas, margin: "auto" }}>
              <div className="grid-template grid1"></div>
              <div className="grid-template grid2"></div>
              <div className="grid-template grid3"></div>
              <div className="grid-template grid4"></div>
            </div>
          ))} */}
          {

          }



        </div>
      </div >
    </div >
  );
}


// const gridConfig = [
//   "'grid1 grid2' 'grid1 grid3'",
//   "'grid1 grid2' 'grid3 grid2'",
//   "'grid1 grid1' 'grid2 grid3'",
//   "'grid1 grid2' 'grid3 grid3'",
//   "'grid1 grid1' 'grid2 grid2'",
//   "'grid1 grid2' 'grid1 grid2'",
//   "'grid1 grid2' 'grid3 grid4'",
// ]