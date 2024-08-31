import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const List = ({url}) => {

  const [list, setList] = useState([]);
  const navigate = useNavigate();

  const fetcList =async ()=>{
    const response = await axios.get(`${url}/api/food/list`);
    // console.log(response.data);
    if (response.data.success){
      setList(response.data.data)

    }
    else{
      toast.error("Error")
    }
  }

  const removeFood =  async (foodId) =>{
// console.log(foodId)
    const response = await axios.post(`${url}/api/food/remove`,{id:foodId})
    await fetcList();
    if(response.data.success){
      toast.success(response.data.message)
    }
    else{
      toast.error("Error");
    }

  }

  // const editFood = async (foodId) => {
  //   try {
  //     const response = await axios.get(`${url}/api/food/edit/${foodId}`);
  //     if (response.data.success) {
  //       console.log('Food details:', response.data.data);
  //       navigate(`/edit/${foodId}`); // Navigate to the edit page
  //     } else {
  //       toast.error('Error fetching food details');
  //     }
  //   } catch (error) {
  //     toast.error('Error fetching food details');
  //   }
  // };
  const editFood = (foodId) => {
    console.log('Editing food item with ID:', foodId); // Log the food ID
    navigate(`/edit/${foodId}`); // Navigate to the edit page with the food ID
  };

  useEffect(()=>{
 fetcList();
  }, []);


  return (
    <div className='list add flex-col'>
      <p>All Foods list</p>
      <div className='list-table'>
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => (
          <div key={index} className='list-table-format'>
            <img src={`${url}/images/` + item.image} alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>${item.price}</p>
            <div className='actions'>
              <p onClick={() => removeFood(item._id)} className='cursor'>X</p>
              <p onClick={() => editFood(item._id)} className='cursor'>Edit</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
}

export default List