import MaterialTable from "material-table";
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { forwardRef } from 'react';
import React, { Component } from 'react'; 
import { connect } from "react-redux";
import { addCategories, deleteCategories, loadCategories, updateCategories } from "../Actions/loadCategories";
import { Button, TextField } from "@material-ui/core";
import firestore, { storageRef } from "../Firebase";


const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};
 

export class TableFragment extends Component {
  constructor(props) {
    super(props) 
  
    this.state = {
       category: [],
       columns:[ 
        { title: 'Index', field: 'index', type:'numeric' },

        { title: 'Icon', field: 'icon',  editComponent: (props) => (
          <>
          <input
        accept="image/*"
        id="contained-button-file"
        
        onChange={e=>{
          if(e.target.files && e.target.files[0]) {
           
             this.setState({
                 image: e.target.files[0],
             })
             props.onChange(e.target.value);
             e.target.value = null;
          }
      }
  }
        hidden
        type="file"
        name="images"
      />
      <label htmlFor="contained-button-file">
        {this.state.image || props.value ? (
           <img src={this.state.image ? this.renderImageUrl(this.state.image) : props.value  } style={{width: 40,height: 40}}  />
        ):(
        <Button
         variant="contained" 
         color="primary"
          component="span">
          Add Image
        </Button>
        )}
      </label>
      </>
        ),  render: rowData => <img src={rowData.icon} style={{width: 40,height: 40}}/>  },
        { title: 'Category', field: 'categoryName', 
        editable: "onAdd",
        // editComponent: (props) => props.value ? (props.value) : (
          
        //   <TextField
        //   label="categoryName"
        //   variant="outlined"
        //   size="small"
        //   name="name"
        //   onChange={e=>{props.value = e.target.value;
        //   }}
        // />
          
        // ), 
      },
       
       
      ],
    
    //  data: props.categories,
    
       
    }
  }


  handleChange = (event, newValue) => {
    this.setState({
        value:newValue,
    })
  };

  onFieldChange = e=>{
    this.setState({
        [e.tatget.name] : e.target.value,
    })
}

  renderImageUrl = (item) =>{
    try{
      return URL.createObjectURL(item);
    } catch(error){
      return item;
    }
    
  }

  uploadImage = (onCompleted) =>{
   
    let file = this.state.image;

    try{
      if(file.startsWith("https")){
        // url.push(file);
        onCompleted(file);
      }
    }catch(error){
      var ts= String(new Date().getTime()),
      i=0,
      out='';
      for(i=0;i<ts.length;i+=2){
        out += Number(ts.substr(i,2)).toString(36);
      }
    }

   
     
      let filename = 'category' + out;
    

    var uploadTask = storageRef.child('categories/'+filename+'.jpg').put(file);

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
        // url.push(downloadURL);
      
          onCompleted(downloadURL);
        
      });
    });
  };

  deleteImage = (image,index,onComplete) =>{
   

    let splited_link = image[index].split("/");
    let name = splited_link[splited_link.length -1]
    .split("?")[0]
    .replace("banners%2F", "");

    storageRef
    .child("categories/" + name)
    .delete()
    .then(()=>{
     
        onComplete();
      
    }).catch((error)=>{
       onComplete(false);
    })
  }
    
 
  render() {
   
    return (
      <MaterialTable
        icons={tableIcons}
        title="Editable Preview"
        columns={this.state.columns}
         data={this.props.categories}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              // setTimeout(() => {
              //   resolve();
              //   this.setState([...this.data, newData]);
                
               
              // }, 1000)
              if(newData.index && newData.categoryName && newData.icon){
                this.uploadImage(url=>{
                  newData['icon'] = url;
                  this.props.addCategory(newData,()=>resolve(),
                  (error)=>resolve())
                 
          
                })
              }else{
              resolve();
              this.setState({
                image: null,
              })
              }
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              if(newData.index === oldData.index &&
                newData.icon === oldData.icon ) {
                resolve();
                this.setState({
                  image: null,
                });
              }else if(newData.icon === oldData.icon){
               
                
                  this.props.updateCategory(newData,()=>resolve(),
                  (error)=>resolve());
                 
          
                
              }else{
                this.deleteImage(oldData.icon,(success)=>{

                  if(success){
                    this.uploadImage(url=>{
                      newData['icon'] = url;
                      this.props.updateCategory(newData,()=>resolve(),
                      (error)=>resolve())
                     
              
                    })
                  }else{
                    resolve();
                  }
                })
              }
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              this.props.deleteCategory(oldData.categoryName,
                ()=> resolve(),
                (error)=>resolve()

              )
            }),
        }}
      />
    )
  }
}


const mapStateToProps = (state) =>{
  return{
      categories: state.categories,
     
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    addCategory: (data) => dispatch(addCategories(data)),
    updateCategory: (data) => dispatch(updateCategories(data)),
    deleteCategory: (name) => dispatch(deleteCategories(name)),
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(TableFragment);