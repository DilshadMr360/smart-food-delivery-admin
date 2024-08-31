import React, { useState } from 'react';
import './Category.css';  
import axios from 'axios';
import { toast } from 'react-toastify';

const Category = ({url}) => {

    const [categoryName, setCategoryName] = useState("")

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${url}/api/category/addcategory`, { categoryName });
      if (response.data.success) {
        toast.success(response.data.message);
        setCategoryName("");  // Reset form
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error adding category");
    }
  };

  return (
    <div className='add'>
    <form className='flex-col' onSubmit={onSubmitHandler}>
      <div className="add-product-name flex-col">
        <p>Category Name</p>
        <input type="text" name="categoryName" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} placeholder='Type here' />
      </div>
      <button type='submit' className='add-btn'>ADD</button>
    </form>
  </div>
  );
}

export default Category;
