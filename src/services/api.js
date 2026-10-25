const API_BASE_URL = 'http://localhost:5192/api';

// Helper for authenticated requests
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'accept': '*/*',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
};

export const fetchCategories = async () => {
  const res = await fetch(`${API_BASE_URL}/Categories`);
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
};

export const fetchProductsByCategory = async (categoryId) => {
  const endpoint = categoryId 
    ? `${API_BASE_URL}/Product/GetProductByCategory?categoryId=${categoryId}`
    : `${API_BASE_URL}/Products/getAllProduct`;
  const res = await fetch(endpoint);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
};

export const uploadProductImage = async (payload) => {
  const res = await fetch(`${API_BASE_URL}/ProductImages`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error('Failed to upload product image');
  return res.json();
};