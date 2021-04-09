import firestore from "../Firebase";



export const loadCategories = () => {
    return dispatch =>{
    
        firestore
        .collection("Categories").orderBy('index')
        .get() 
        .then((querySnapshot) =>{

               if(!querySnapshot.empty) {
                   let categories = [];
                   querySnapshot.forEach((doc) =>{
                       categories.push( doc.data());
                       
                   })

                   dispatch({type: "LOAD_CATEGORIES", payload:categories});
                   
               }

            }
        ).catch((error)=>{
            console.log(error);
           
        })

    }
}

export const addCategories = (data) => {
    return dispatch =>{

        firestore
        .collection("Categories")
        .doc(data.categoryName.toUpperCase())
        .set(data)
        .then(function (doc){

            dispatch({type: "ADD_CATEGORY", payload:data});
                   

            }
        ).catch((error)=>{
          console.log(error)
          
        })

    }


}

export const updateCategories = (data) => {
    return dispatch =>{

        firestore
        .collection("Categories")
        .doc(data.categoryName.toUpperCase())
        .update(data)
        .then(function (doc){

            dispatch({type: "UPDATE_CATEORY", payload:data});
                   

            }
        ).catch((error)=>{
          console.log(error)
          
        })

    }


}

export const deleteCategories = (categoryName) => {
    return dispatch =>{

        firestore
        .collection("Categories")
        .doc(categoryName.toUpperCase())
        .delete()
        .then(function (doc){

            dispatch({type: "DELETE_CATEGORY", payload:categoryName});
            dispatch({type: "DELETE_PAGE",payload:categoryName})       

            }
        ).catch((error)=>{
          console.log(error)
          
        })

    }


}



