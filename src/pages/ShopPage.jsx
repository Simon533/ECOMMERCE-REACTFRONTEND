import React, { useState, useEffect } from 'react';
import { fetchCategories, fetchProductsByCategory } from '../services/api';

export default function ShopPage() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetchCategories().then(setCategories).catch(console.error);
  }, []);

  useEffect(() => {
    fetchProductsByCategory(selectedCategory).then(setProducts).catch(console.error);
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Store UI rendered here */}
    </div>
  );
}