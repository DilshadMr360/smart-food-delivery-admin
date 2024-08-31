import React, { useEffect, useState } from 'react';
import './CategoryList.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const CategoryList = ({url}) => {

  const [categories, setCategories] = useState([]);
  const  navigate = useNavigate();
 


  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${url}/api/category/categories`);
       console.log(response.data);
      if (response.data.success) {
        setCategories(response.data.data);
      } else {
        toast.error("Error fetching categories");
      }
    } catch (error) {
      toast.error("Error fetching categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  },[]);


  const editCategory =(categoryId) =>{
    console.log('Editing Category item with ID:', categoryId); // Log the food ID
    navigate(`/edit-category/${categoryId}`); // Navigate to the edit page with the food ID
  }

  const removeCategory = async (categoryId)=>{

    const response = await axios.post(`${url}/api/category/remove-category`,{id:categoryId})
 await fetchCategories();
    if(response.data.success){
      toast.success(response.data.message)
    }
    else{
      toast.error("Error");
    }

        // try {
   
    // const response = await axios.post(`${url}/api/category/remove-category`,{id:categoryId})

    //     if (response.data.success) {
    //         toast.success(response.data.message);
    //         // Refresh the categories list
    //         fetchCategories();
    //     } else {
    //         toast.error("Error removing category");
    //     }
    // } catch (error) {
    //     toast.error("Error removing category");
    // }
  }



  return (
    <div className='category-lists add flex-col'>
      <p>All Category list</p>
      <div className='category-lists-format title'>
        <b>Name</b>
        <b>Action</b>
      </div>
      {categories.length > 0 ? (
        categories.map((item) => (
          <div key={item._id} className='category-lists-format'>
            <p>{item.categoryName}</p>
            <div className='category-actions'>
              <p onClick={()=>removeCategory(item._id)} className='cursor'>X</p>
              <p onClick={() => editCategory(item._id)} className='cursor'>Edit</p>
              
            </div>
          </div>
        ))
      ) : (
        <p>No categories found</p>
      )}
    </div>
  );
};

export default CategoryList;
