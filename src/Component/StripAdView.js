import React from 'react'
import { Box } from '@material-ui/core';

const StripAdView = ({image,background}) => {
    return (
        <Box bgcolor="black">
            <img style={{height:'100px',width:'100%', background:background}} src={image}/>
            
        </Box>
    )
}

export default StripAdView;
