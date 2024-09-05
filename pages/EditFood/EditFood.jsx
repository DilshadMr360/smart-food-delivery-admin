import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import './EditFood.css';

const EditFood = ({ url }) => {
  const [food, setFood] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const { id } = useParams(); // Get food ID from URL
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await axios.get(`${url}/api/food/edit/${id}`);
        if (response.data.success) {
          setFood(response.data.data);
          setName(response.data.data.name);
          setDescription(response.data.data.description);
          setPrice(response.data.data.price);
          setQuantity(response.data.data.quantity);
          setCategory(response.data.data.category);
        } else {
          toast.error('Error fetching food details');
        }
      } catch (error) {
        toast.error('Error fetching food details');
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${url}/api/category/categories`);
        if (response.data.success) {
          setCategories(response.data.data);
        } else {
          toast.error('Error fetching categories');
        }
      } catch (error) {
        toast.error('Error fetching categories');
      }
    };

    fetchFood();
    fetchCategories();
  }, [id, url]); // Dependency array includes id

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('quantity', quantity);
    formData.append('category', category);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await axios.patch(`${url}/api/food/update/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data.success) {
        toast.success('Food item updated successfully');
        navigate('/list'); // Redirect to the list page
      } else {
        toast.error('Error updating food item');
      }
    } catch (error) {
      toast.error('Error updating food item');
    }
  };

  return (
    <div className='edit'>
      {food && (
        <form onSubmit={handleSubmit} className='flex-col'>
          <div className="edit-image-upload flex-col">
            <p>Upload Image</p>
            <label htmlFor="image">
              <img src={image ? URL.createObjectURL(image) : `${url}/images/${food.image}`} alt="Food" />
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                id="image"
                hidden
              />
            </label>
          </div>
          <div className="edit-product-name flex-col">
            <p>Product Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              name="name"
              placeholder='Type here'
              required
            />
          </div>
          <div className="edit-product-description flex-col">
            <p>Product Description</p>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              name="description"
              rows="6"
              placeholder='Write content here'
              required
            />
          </div>
          <div className="edit-category-price">
            <div className="edit-category flex-col">
              <p>Product Category</p>
              <select
                onChange={(e) => setCategory(e.target.value)}
                name="category"
                value={category}
                required
              >
                {categories.map(category => (
                  <option key={category._id} value={category.categoryName}>
                    {category.categoryName}
                  </option>
                ))}
              </select>
            </div>
            <div className="edit-price flex-col">
              <p>Product Price</p>
              <input
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                type="number"
                name="price"
                placeholder='$20'
                required
              />
            </div>
            <div className="edit-price flex-col">
              <p>Product Quantity</p>
              <input
                onChange={(e) => setQuantity(e.target.value)}
                value={quantity}
                type="number"
                name="quantity"
                placeholder='20'
                required
              />
            </div>
          </div>
          <button type='submit' className='edit-btn'>UPDATE</button>
        </form>
      )}
    </div>
  );
};

export default EditFood;
