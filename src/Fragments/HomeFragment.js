import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadCategories } from '../Actions/loadCategories';
import { loadCategoryPage } from '../Actions/loadCategoryPage';
import 
{ Container, 
  Avatar,
  Backdrop, 
  CircularProgress,
  Slide,
  IconButton, 
  Button, 
  Fab, 
  Dialog, 
  FormControl,
  InputLabel,
  Select,
  MenuItem, 
  Toolbar, 
  TextField, 
  Checkbox, 
  Snackbar, 
  FormControlLabel} 
  from '@material-ui/core';
  import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import BannerSlider from '../Component/BannerSlider';
import ProductView from '../Component/ProductView';
import StripAdView from '../Component/StripAdView';
import HorizontalScroller from '../Component/HorizontalScroller';
import firestore, { storageRef } from '../Firebase';
import {  Close, Delete } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  }); 

export class HomeFragment extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            loading: true,
            value: 0,
            Page: "Home",
            addDialog: false,
            images: [],
            colors: [],
            viewtype: 0,
            selectedProducts: [],
            positionError:"",
            layout_titleError: "",
            snackbar: "",
            layout_bg:"#ffffff"
             
        }
    }

   

    componentDidMount(){
        if(this.props.categories === null){
           
             this.props.loadCategories();
           
        }
        if(this.props.categoryPages === null){
            this.props.loadPage("Home");
        }

        if(this.props.categoryPages !== null){
          this.setState({
            loading:false,
          })
        }
     }

    handleChange = (event, newValue) => {
        this.setState({
            value:newValue,
        })
      };
    
    onFieldChange = e=>{
        this.setState({
            [e.target.name] : e.target.value,
        })
    }

    save = () =>{
     
        // if(this.state.position){
        //   this.setState({
        //     positionError: "",
        //     layout_titleError: "",
        //   })

        //   return;
        // }
        switch(this.state.viewtype){
         
          case 0:
            if(this.state.images.length<2){
              this.setState({
                positionError: "Minimum 2 Images Required"
              })
              return;
            }

            let index = 0;
            let urls = [];
            console.log("working");
            this.setState({
              loading:true
            })
            this.uploadImages(this.state.images,index,urls,()=>{
              let data ={
                viewtype:0,
                no_of_banners:urls.length,
                index: parseInt(this.state.position),
              }
              for(let x=0;x<urls.length;x++){
                data["banner"+(x+1)] = urls[x]
                data['banner'+(x+1)+"_background"] = this.state.colors[x]
              }
              const onComplete = ()=>{
                let section = this.props.categoryPages[this.state.Page]
                section.push(data)
                section.sort((a,b)=>a.index-b.index);
    
                //this.props.addSection(this.state.Page,section);
               
                
                this.setState({
                  position:[],
                  image:[],
                  viewtype:0,
                  colors:[],
                  loading: false,
                  addDialog: false,
                  selecteProducts:[],
                  layout_title:null,
                  layout_background: null,
                })
              }
              firestore.collection("Categories").doc(this.state.Page).collection("TOP_DEALS")
              .doc().set(data)
              .then(function(){
                onComplete()
                
                
    
              }).catch(err=>{
                this.setState({
                  loading:false
                })
              })
            })

            break;
            case 1:
              if(this.state.images.length<1){
                this.setState({
                  positionError: "Image is Required"
                })
                return;
              }

              let index2 = 0;
              let urls2 = []
              this.setState({
                loading:true
              })
              this.uploadImages([this.state.images[0]],index2,urls2,()=>{
                let data ={
                  viewtype:1,
                  strip_ad_banner:urls2[0],
                  index: parseInt(this.state.position),
                  background:this.state.colors[0]
                }
                
                const onComplete = ()=>{
                  let section = this.props.categoryPages[this.state.Page]
                  section.push(data)
                  section.sort((a,b)=>a.index-b.index);
                  
                  this.props.addSection(this.state.Page,section);
                  
                  this.setState({
                    position:[],
                    image:[],
                    viewtype:0,
                    colors:[],
                    loading: false,
                    addDialog: false,
                    selecteProducts:[],
                    layout_titlen:null,
                    layout_background: null,
                  })
                }
                firestore.collection("Categories").doc(this.state.Page).collection("TOP_DEALS")
                .doc().set(data)
                .then(function(){
                  onComplete()
                  
                  
      
                }).catch(err=>{
                  this.setState({
                    loading:false
                  })
                })
              })
              
              break;
            case 2:
              if(!this.state.layout_title){
                this.setState({
                  layout_titleError: "Required"
                })
                return;
               }
               
              if(this.state.selectedProducts.length < 1){
                this.setState({
                  snackbar: "Please select at least 1 product"
                })
                return;
               }

              this.uploadProductSelection()
              break;
              default:


        }

      }

    removeImage = index =>{
        let images = this.state.images
        let colors = this.state.colors

        images.splice(index, 1);
        colors.splice(index, 1);

        this.setState({
          images,
          colors,
        })
      }

    uploadProductSelection = () =>{
        this.setState({
          loading: true,
        })

        let data ={
          viewtype:this.state.viewtype,
          layout_title:this.state.layout_title,
          index: parseInt(this.state.position),
          layout_background:this.state.layout_bg,
          products:this.state.selectedProducts,
        }
        
        const onComplete = ()=>{
          let section = this.props.categoryPages[this.state.Page]
          section.push(data)
          section.sort((a,b)=>a.index-b.index);

          //this.props.addSection(this.state.Page,section);
         
          
          this.setState({
            position:null,
            image:[],
            viewtype:0,
            colors:[],
            loading: false,
            addDialog: false
          })
        }
        firestore.collection("Categories").doc(this.state.Page).collection("Top_Deals")
        .doc().set(data)
        .then(function(){
          onComplete()
          
          

        }).catch(err=>{
          this.setState({
            loading:false
          })
        })

      }

    loadLatestProducts =() =>{
        firestore
        .collection("Products")
        .orderBy('added_on','desc').limit(8)
        .get()
        .then((querySnapshot) =>{
            let productlist=[];
               if(!querySnapshot.empty) {
              
               
                   querySnapshot.forEach((doc) =>{
                  
                     let data = {
                        id: doc.id,
                       image: doc.data().product_image_1,
                       title: doc.data().product_title,
                       price: doc.data().product_price

                     }
                     productlist.push(data);
                     console.log(data);
                   })
                }
              this.setState({
                productlist,
                searching:false
              })

            }
        ).catch((error)=>{
            console.log(error);
           
        })

      }

    searchProducts =() =>{

        if(!this.state.search) {
          this.loadLatestProducts();
          return;
        }

        this.setState({
          searching: true
        })

        let keywords = this.state.search.split(" ");

        firestore
        .collection("Products")
        .where('tags','array-contains-any' , keywords)
        .get()
        .then((querySnapshot) =>{
          let productlist=[];

               if(!querySnapshot.empty) {
                   querySnapshot.forEach((doc) =>{
                     let data = {
                       id: doc.id,
                       image: doc.data().product_image_1,
                       title: doc.data().product_title,
                       price: doc.data().product_price
                     }
                     productlist.push(data);
                   })
                }
              this.setState({
                productlist,
                searching: false
              })

            }
        ).catch((error)=>{
            console.log(error);
          
        })

      }

      uploadImages = (images,index,urls,onCompleted) =>{
        const uploadAgain = (images,index,urls,onCompleted)=>this.uploadImages(images,index,urls,onCompleted);

        let file = this.state.images[index];

       
          var ts= String(new Date().getTime()),
          i=0,
          out='';
          for(i=0;i<ts.length;i+=2){
            out += Number(ts.substr(i,2)).toString(36);
          }
          let filename = 'banner' + out;
        

        var uploadTask = storageRef.child('banners/'+filename+'.jpg').put(file);

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed', function(snapshot){
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
         {/* switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running');
              break;
          } */}
        }, function(error) {
          // Handle unsuccessful uploads
        }, function() {
          
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL)=>{
            urls.push(downloadURL);
            index++;
            if(index < images.length){
              uploadAgain(images,index,urls,onCompleted)
            }else{
              onCompleted();
            }
          });
        });
      };

      deleteImage = (images,index,onComplete) =>{
		   
        const deleteAgain = (images,index,onComplete)=>
        this.deleteImage(images,index,onComplete);
    
        let splited_link = images[index].split("/");
        let name = splited_link[splited_link.length -1]
        .split("?")[0]
        .replace("banners%2F", "");
    
        storageRef
        .child("banners/" + name)
        .delete()
        .then(()=>{
          index++;
          if(index < images.length){
            deleteAgain(images,index,onComplete);
          }else{
            onComplete();
          }
        }).catch((error)=>{
           console.log(error);
        })
      
      }
    
        
        





    
    render() {
        
        return (
            <div>
               <Container maxwidth="xs" fixed>
           
           <AppBar position="static">
             <Tabs value={this.state.value}
              onChange={this.handleChange} 
              indicatorColor="#000000"
              textColor = "#000000"
              variant="scrollable"
              scrollButtons="auto"
              aria-label="simple tabs example"
              >
               
            {this.props.categories ?
               this.props.categories.map((category)=>(
                   <Tab icon={<CategoryTab icon={category.icon} 
                   title={category.categoryName} />} 
                   onclick={e=>{
                       if(this.props.categoryPages[category.categoryName.toUpperCase()]){
                         this.setState({
                             Page: category.categoryName.toUpperCase(),
                         })
                       }else{
                           this.setState({loading:true})
                         this.props.loadPage(category.categoryName.toUpperCase(),
                         ()=>{
                             this.setState({loading: false,
                                 Page:category.categoryName.toUpperCase(),});
         
                          },
                          ()=>{
                             this.setState({loading: false});
                          })
                       }

                           
                   }}
                   />


               ))
               :null}  
             </Tabs>
           </AppBar>
<>
                   <br />
                   <br />
                   </>
           {this.props.categoryPages ?
           this.props.categoryPages[this.state.Page].map((item,index)=>{
               switch(item.view_type){
                   case 0:
                       let banners =[];
                       for(let index =1;index < item.no_of_banners +1; index++){
                           const banner=item["banner_"+ index];
                           const background=item["banner"+index+"_background"];
                           banners.push({banner,background});
                          }
                          return <BannerSlider Images={banners} />;
                         
                          case 1:
                           

                              return( <StripAdView 
                              image={item.strip_ad_banner}
                              background={item.background} />
                              );

                          case 2: 
                         

                          let products=[];
                                 for(let index =1;index < item.no_of_products +1; index++){
                                   let data={
                                   image : item['product_image_'+index],
                                   title : item['product_title_'+index],
                                   description :item['product_description_'+index],
                                   price : item['product_price_'+index]
                                   }
                                   products.push(data);
                                   }
                                 return <HorizontalScroller products={products} title={item.layout_title} background={item.layout_background} />
                             
                             
                       
                        }
                        
           }):null}



    
         <Fab color="primary" aria-label="add"
         onClick={(e)=>this.setState({addDialog:true})}
         style={{position:"fixed", bottom: "50px",right: "50px"}}>
             <AddIcon />
         </Fab>
           </Container>
         

         <Dialog fullScreen open={this.state.addDialog} onClose={e=>this.setState({
        addDialog: false
    })} 
    TransitionComponent={Transition}>
        <AppBar>
         <Toolbar>
         <IconButton edge="start" color="inherit" onClick={e=>this.setState({
             addDialog: false
         })} aria-label="close">
          <Close />
       </IconButton>
          <Typography variant="h6">
      Add Section
        </Typography>
        <Button autoFocus color="inherit"
        style={{position: "absolute", right: 0}}
         onClick={(e)=>
         this.save()}>
      save
        </Button>
    </Toolbar>
    </AppBar>

    <Toolbar />
    
   
    <FormControl  >
        <InputLabel id="demo-simple-select-label">View Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          defaultValue={0}
         onChange={e=>{
          console.log(this.state.images);
           this.onFieldChange(e)
          this.setState({
            colors:[],
            images:[],
            selectedProducts:[],
          })
          }}
         name="view_type"
        >
          <MenuItem value={0}>Banner Slider</MenuItem>
          <MenuItem value={1}>Horizontal Scroller</MenuItem>
          <MenuItem value={2}>Strip Ad View</MenuItem>
        </Select>
        <br/>

        <TextField
          label="Position"
          id="outlined-size-small"
          variant="outlined"
          type="number"
          size="small"
          error={this.state.positionError!== ""}
          helperText={this.state.positionError}
          onChange={this.onFieldChange}
          name="position"
          margin="dense"
        />
        </FormControl>
        <br />
        
        <Box display="flex" flexWrap="true"> 
        {this.state.images.map((item,index)=><Box margin="14px" >
            <img 
            src={URL.createObjectURL(item)} 
            style={{height: "90px", 
            width: this.state.viewtype===0
            ? "160px":this.state.viewtype===1?"210px"
            :0, objectFit:"scale-down",
             backgroundColor:this.state.colors[index] }} />
            <br />
            <input 
            id={"contained-button"+index} 
            type="color" 
            defaultValue="#000000" hidden 
            onChange={e=>{
                let colors = this.state.colors
                colors[index] =e.target.value
                this.setState({
                    colors
                })
            }} 
            defaultValue="#000000"
            />
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
               this.state.colors.push("#ffffff")
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

{this.state.viewtype===0 && this.state.images.length < 2 ? (
     
    
     <label htmlFor="contained-button-file">
       <Button
        variant="contained" 
        color="primary"
         component="span">
         Add Image
       </Button>
     </label>
     ):null} 

   {this.state.viewtype===1 && this.state.images.length < 1 ? (
    
   
    <label htmlFor="contained-button-file">
      <Button 
      variant="contained"
       color="primary" 
       component="span">
        Add Image
      </Button>
    </label>
    ):null}


{(this.state.viewtype === 2  || this.state.viewtype ===3)}
     

     <div>
     <Box style={{backgroundColor: this.state.layout_bg}}>
       <TextField
       id="filled-basic"
       label="Title"
       style={{width: "100%" }}
       error={this.state.positionError!== ""}
       helperText={this.state.layout_titleError}
       name="layout_title"
       variant="standard"

       />


     <input 
     type="text"
      placeholder="title"
       name="title" 
       onChnag={this.onFieldChange} />

     </Box>

     <input id={"contained-button-title"} type="color" defaultValue="#000000" hidden 
            onChange={this.onFieldChange}
            name="layout_bg"
            defaultValue="#ffffff"
             />
     <label htmlFor={"contained-button-title"}>
       
       <Button
       color="primary"
       arial-lebel="upload picture"
       component="span"
       >
         Layout Background
        </Button>
   </label>
   {/* <h4>Selected Product: {this.state.selecteProducts.length}</h4> */}
   <Box display="flex">
        <TextField 
        name="search" 
        style={{flexGrow: 1}}
        onChange={this.onFieldChange}
        label="search"
        variant="outlined" 
         size="small" />

   <Button 
   variant="contained" 
   color="primary" 
   onClick={e=>this.searchProducts()}>
     Search
     </Button>
   
   </Box>
   {this.state.searching ? (
     <Box display="flex" 
     justifyContent="center"
      bgColor="primary">
   <CircularProgress  /> 
   </Box>
   ):(
   
   <Box display="flex" flexWrap="true" bgcolor="#00000010">
     {this.state.productlist===undefined 
     ? this.loadLatestProducts()
     : this.state.productlist.map((item,index)=>(

     <FormControlLabel
     control={<Checkbox  
     onChange={e=>{
       if(e.target.checked){
         this.state.selectedProducts.push(item.id)

       }else{
         let posi = this.state.selectedProducts.indexOf(item.id)
         this.state.selectedProducts.splice(posi,1);
       }
       this.setState({});
     }}
     />}
     label={<ProductView item={item} /> }
     labelPlacement="bottom"
 
     /> 
        ))}

   </Box>

    )}
    </div>
     </Dialog> 
     {/* <Backdrop style={{ zIndex: 1200} } open={this.state.loading}>
    <CircularProgress color="inherit" />
        </Backdrop>
        <Snackbar 
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}

        open={this.state.snackbar!==""}
        autoHideDuration={6000}
        onClose={e=>this.setState({
          loading: false,
          snackbar: ""
        })}
        // onClose={handleClose}
        message={this.state.snackbar}
       
        />  */}

     
       
           
            </div>
        )
    }
}

export const CategoryTab=({icon,title})=>{
    return <Box>
        <Avatar alt="Remy Sharp" 
        variant="square" 
        src={icon} />
        <Typography variant="body2">{title}</Typography>
    </Box>
 }

const mapStateToProps = (state) =>{
    return{
        categories: state.categories,
        categoryPages: state.loadPage
    }
 }

 const mapDispatchToProps = (dispatch) =>{
    return{
        loadCategories:()=>dispatch(loadCategories()),
        loadPage:(category)=>dispatch(loadCategoryPage(category))
       
      
    }

 }


export default connect(mapStateToProps, mapDispatchToProps)(HomeFragment);





