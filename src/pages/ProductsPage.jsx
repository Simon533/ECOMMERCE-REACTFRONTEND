import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, LogOut, Filter, ShoppingCart, Star, Check } from 'lucide-react';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // Retrieve JWT Token
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    setLoading(true);
    setError('');
    
    try {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      };

      // Fetch Categories and Products in parallel
      const [catRes, prodRes] = await Promise.all([
        fetch('http://localhost:5192/api/Categories', { headers }),
        fetch('http://localhost:5192/api/Products/getAllProduct', { headers })
      ]);

      if (catRes.status === 401 || prodRes.status === 401) {
        // Token expired or invalid
        localStorage.removeItem('token');
        navigate('/login');
        return;
      }

      const catData = catRes.ok ? await catRes.json() : [];
      const prodData = prodRes.ok ? await prodRes.json() : [];

      setCategories(Array.isArray(catData) ? catData : []);
      setProducts(Array.isArray(prodData) ? prodData : []);
    } catch (err) {
      setError('Failed to load products. Please check if backend service is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  // Filter products by search term and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.categoryName === selectedCategory || product.categoryId === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', color: '#0f172a', fontFamily: 'sans-serif' }}>
      
      {/* Top Navigation Bar */}
      <nav style={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        padding: '16px 32px',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            backgroundColor: '#9333ea',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff'
          }}>
            <ShoppingBag size={20} />
          </div>
          <span style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', tracking: '-0.025em' }}>
            TechStore
          </span>
        </div>

        {/* Search Bar */}
        <div style={{
          position: 'relative',
          width: '100%',
          maxWidth: '420px',
          display: 'flex',
          alignItems: 'center'
        }}>
          <Search size={18} style={{ position: 'absolute', left: '14px', color: '#94a3b8' }} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products, brands, categories..."
            style={{
              width: '100%',
              padding: '10px 14px 10px 42px',
              backgroundColor: '#f1f5f9',
              border: '1px solid #e2e8f0',
              borderRadius: '9999px',
              fontSize: '13px',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
        </div>

        {/* Actions (Cart & Logout) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ position: 'relative', cursor: 'pointer' }}>
            <div style={{
              padding: '10px',
              borderRadius: '9999px',
              backgroundColor: '#f1f5f9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ShoppingCart size={20} style={{ color: '#475569' }} />
            </div>
            {cart.length > 0 && (
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                backgroundColor: '#9333ea',
                color: '#ffffff',
                fontSize: '10px',
                fontWeight: 700,
                borderRadius: '9999px',
                width: '18px',
                height: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {cart.length}
              </span>
            )}
          </div>

          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '9px 16px',
              border: '1px solid #cbd5e1',
              borderRadius: '8px',
              backgroundColor: '#ffffff',
              fontSize: '13px',
              fontWeight: 600,
              color: '#475569',
              cursor: 'pointer'
            }}
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 24px' }}>
        
        {/* Banner Section */}
        <div style={{
          background: 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)',
          borderRadius: '20px',
          padding: '36px 48px',
          color: '#ffffff',
          marginBottom: '32px',
          boxShadow: '0 10px 25px -5px rgba(147, 51, 234, 0.25)'
        }}>
          <h1 style={{ fontSize: '30px', fontWeight: 800, margin: '0 0 8px 0' }}>Discover Premium Tech Gear</h1>
          <p style={{ fontSize: '14px', opacity: 0.9, margin: 0, maxWidth: '500px', lineHeight: 1.5 }}>
            Explore our latest hardware, devices, and accessories with fast checkout and developer pricing.
          </p>
        </div>

        {/* Category Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflowX: 'auto', paddingBottom: '16px', marginBottom: '24px' }}>
          <button
            onClick={() => setSelectedCategory('All')}
            style={{
              padding: '8px 20px',
              borderRadius: '9999px',
              fontSize: '13px',
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
              backgroundColor: selectedCategory === 'All' ? '#9333ea' : '#ffffff',
              color: selectedCategory === 'All' ? '#ffffff' : '#64748b',
              boxShadow: selectedCategory === 'All' ? '0 4px 12px rgba(147, 51, 234, 0.25)' : 'none'
            }}
          >
            All Products
          </button>

          {categories.map((cat) => {
            const catName = typeof cat === 'string' ? cat : cat.name;
            return (
              <button
                key={cat.id || catName}
                onClick={() => setSelectedCategory(catName)}
                style={{
                  padding: '8px 20px',
                  borderRadius: '9999px',
                  fontSize: '13px',
                  fontWeight: 600,
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: selectedCategory === catName ? '#9333ea' : '#ffffff',
                  color: selectedCategory === catName ? '#ffffff' : '#64748b'
                }}
              >
                {catName}
              </button>
            );
          })}
        </div>

        {/* Status Messaging */}
        {error && (
          <div style={{ backgroundColor: '#fff1f2', borderLeft: '4px solid #ef4444', padding: '14px', borderRadius: '8px', color: '#b91c1c', fontSize: '13px', marginBottom: '24px' }}>
            {error}
          </div>
        )}

        {/* Product Cards Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#64748b', fontSize: '14px' }}>
            Loading catalog...
          </div>
        ) : filteredProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
            <p style={{ fontSize: '16px', fontWeight: 600, color: '#475569', margin: '0 0 4px 0' }}>No products found</p>
            <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0 }}>Try clearing your search or selecting another category.</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '24px'
          }}>
            {filteredProducts.map((product) => (
              <div
                key={product.id || product.name}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  border: '1px solid #e2e8f0',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
                }}
              >
                {/* Product Image Container */}
                <div style={{ width: '100%', height: '180px', backgroundColor: '#f8fafc', display: 'flex', alignItems: 'center', justifyCenter: 'center', overflow: 'hidden' }}>
                  <img
                    src={product.imageUrl || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&q=80&w=600'}
                    alt={product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                {/* Product Info */}
                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#9333ea', textTransform: 'uppercase', marginBottom: '6px' }}>
                    {product.categoryName || 'Tech'}
                  </div>
                  
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', margin: '0 0 6px 0', lineHeight: 1.3 }}>
                    {product.name}
                  </h3>

                  <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 16px 0', lineHeight: 1.4, flexGrow: 1 }}>
                    {product.description || 'High-performance hardware component designed for maximum productivity.'}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid #f1f5f9' }}>
                    <div>
                      <span style={{ fontSize: '10px', color: '#94a3b8', display: 'block', textTransform: 'uppercase', fontWeight: 600 }}>Price</span>
                      <span style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>
                        ${product.price ? product.price.toFixed(2) : '99.99'}
                      </span>
                    </div>

                    <button
                      onClick={() => addToCart(product)}
                      style={{
                        padding: '10px 16px',
                        backgroundColor: '#9333ea',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <ShoppingCart size={14} />
                      <span>Add</span>
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}