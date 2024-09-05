import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import './EditCategory.css';
import Category from '../Category/Category';

const EditCategory = ({url}) => {

    const { id } = useParams(); // Get Category ID from URL
    const [name, setName] = useState('');
    const navigate = useNavigate();

    useEffect (()=>{
    const fetchCategory  = async () => {
        try {
            const response = await axios.get(`${url}/api/category/edit-category/${id}`);
            if(response.data.success){
                setName(response.data.data.categoryName);
            }
            else {
                toast.error('Error fetching Category details');
            }
        } catch (error) {
        toast.error('Error fetching Category details');
            
        }
    };
    fetchCategory();

    },[])

   const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data as JSON
    const data = { id, name };

    console.log('Sending form data:', data);

    try {
        const response = await axios.patch(`${url}/api/category/update-category/${id}`, data, {
            headers: {
                'Content-Type': 'application/json', // Set to 'application/json'
            },
        });
        console.log('Server Response:', response.data);
        if (response.data.success) {
            toast.success('Category item updated successfully');
            navigate('/category-list'); // Redirect to the list page
        } else {
            toast.error('Error updating Category item');
        }
    } catch (error) {
        toast.error('Error updating Category item');
    }
}

    
  return (
    <div className='edit'>
        {Category &&    (
    <form onSubmit={handleSubmit} className='flex-col' >
      <div className="add-category-name flex-col">
        <p>Category Name</p>
        <input value={name} type="text" name="categoryName"  onChange={(e) => setName(e.target.value)} placeholder='Type here' />
      </div>
      <button type='submit' className='add-btn'>Update</button>
    </form>
        )}

  </div>
  )
}

export default EditCategory