import firestore from "../Firebase";


export const loadCategoryPage = (category) => {
    return (dispatch , getState)=>{
    
        firestore
        .collection("Categories")
        .doc(category)
        .collection('TOP_DEALS').orderBy('index')
        .get()
        .then((querySnapshot) =>{
 
               if(!querySnapshot.empty) {
                   let pagedata = [];
                   querySnapshot.forEach((doc) =>{
                       pagedata.push( doc.data());
                   })
                   dispatch({type: "LOAD_PAGE",payload:pagedata,category});
                  
                }
               

            }
        ).catch((error)=>{
            console.log(error);
          
        })

    }
}

