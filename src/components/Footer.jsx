import React from 'react'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Twitter } from '@mui/icons-material'; 
import { YouTube } from '@mui/icons-material';

const Footer = () => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='flex gap-8 mb-[20px]'>
        <FacebookIcon />
        <InstagramIcon />
        <Twitter />
        <YouTube />
      </div>
      <div className='font-bold flex gap-4 mb-[20px]'>
        <p>Conditions of Use</p>
        <p>Privacy and Policy</p>
        <p>Press Room</p>
      </div>
      <div className='text-sm text-[#909090] font-semibold flex mb-[20px]'>
      © 2023 MovieBox By Alagbe Adeolu Ayoola
      </div>
    </div>
  )
}

export default Footer
