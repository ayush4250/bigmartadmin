import { Button, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React, { Component } from 'react'

export class AddProduct extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    

    removeImage = index =>{
        let images = this.state.images
        

        let image = images[index];

        images.splice(index, 1);
       

        try{
            if(image.startsWith("https")){
                this.setState({
                    loading:true},
                    // this.deleteImages([image],0, ()=>{
                    //     this.setState({
                    //         loading: false,
                    //         images,
                           
                    //     })
                    // })
                       
             )
            }
            
        }catch (error){
            this.setState({
                images,
               
            })
        }

       
    }

    renderImageUrl = (item) =>{
        try{
          return URL.createObjectURL(item);
        } catch(error){
          return item;
        }
        
      }

    render() {
        return (
            <Box bgcolor="#fff" boxShadow={1}> 

            <Box display="flex" flexWrap="true"> 
        {this.state.images.map((item,index)=><Box margin="14px" >
            <img 
            src={URL.createObjectURL(item)} 
            style={{height: "90px", 
            width: "16px",
             backgroundColor:this.state.colors[index] }} />
            <br />
            
             <IconButton
              arial-label="delete"
               onClick={e=>this.removeImage(index)} >
                 <Delete />
             </IconButton>
            <label htmlFor={"contained-button"+index}>
       
          <IconButton
          color="primary"
          arial-lebel="upload picture"
          component="span"
          >

          </IconButton>
      </label>

        </Box>
        )}
        </Box>
                <input
        accept="image/*"
        id="contained-button-file"
        
        onChange={e=>{
            if(e.target.files && e.target.files[0]) {
               let images=this.state.images;
               images.push(e.target.files[0])
               this.setState({
                   images,
               })
               e.target.value = null;
            }
        }
    }
       
        hidden
        type="file"
        name="images"
      />
     {this.state.images.length < 8 ? (
     
    
      <label htmlFor="contained-button-file">
        <Button
         variant="contained" 
         color="primary"
          component="span">
          Add Image
        </Button>
      </label>
      ):null} 

            </Box>
        )
    }
}

export default AddProduct
