import React, { useState } from 'react';
//import AdminImageUpload from '../components/admin/AdminImageUpload';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('images');

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="md:flex md:items-center md:justify-between mb-8">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Admin Management Portal
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage store products, images, and catalog categories.
            </p>
          </div>
        </div>

        {/* Quick Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
            <dt className="text-sm font-medium text-gray-500 truncate">Total Products</dt>
            <dd className="mt-1 text-2xl font-semibold text-gray-900">5</dd>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
            <dt className="text-sm font-medium text-gray-500 truncate">Active Categories</dt>
            <dd className="mt-1 text-2xl font-semibold text-gray-900">3</dd>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
            <dt className="text-sm font-medium text-gray-500 truncate">System Status</dt>
            <dd className="mt-1 text-sm font-semibold text-green-600 flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-green-500"></span> API Connected
            </dd>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('images')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'images'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Upload Product Images
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'products'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Products List
            </button>
          </nav>
        </div>

        {/* Tab Contents */}
        <div>
          {activeTab === 'images' && (
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 max-w-2xl mx-auto">
              <AdminImageUpload />
            </div>
          )}

          {activeTab === 'products' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Store Inventory</h3>
              <p className="text-gray-500 text-sm">
                Product table management view can be attached here to manage product details and pricing.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}