import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNews, createNewsArticle, updateNewsArticle, deleteNewsArticle } from '../../features/news/newsSlice';
import { notifySuccess, notifyError } from '../../utils/toast';

const NewsPage = () => {
  const dispatch = useDispatch();
  const { items: news, loading, error } = useSelector(state => state.news);
  const [showModal, setShowModal] = useState(false);
  const [editingNews, setEditingNews] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    date: ''
  });

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingNews) {
        await dispatch(updateNewsArticle({ id: editingNews._id, newsData: formData })).unwrap();
        notifySuccess('News article updated successfully');
      } else {
        await dispatch(createNewsArticle(formData)).unwrap();
        notifySuccess('News article created successfully');
      }
      setShowModal(false);
      resetForm();
    } catch (err) {
      notifyError(err.message || 'Operation failed');
    }
  };

  const handleEdit = (newsItem) => {
    setEditingNews(newsItem);
    setFormData({
      title: newsItem.title,
      content: newsItem.content,
      author: newsItem.author,
      date: newsItem.date
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this news article?')) {
      try {
        await dispatch(deleteNewsArticle(id)).unwrap();
        notifySuccess('News article deleted successfully');
      } catch (err) {
        notifyError(err.message || 'Delete failed');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      author: '',
      date: ''
    });
    setEditingNews(null);
  };

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">News Management</h1>
        <button
          onClick={openAddModal}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add News Article
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {news.map((newsItem) => (
              <tr key={newsItem._id}>
                <td className="px-6 py-4 whitespace-nowrap">{newsItem.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{newsItem.author}</td>
                <td className="px-6 py-4 whitespace-nowrap">{new Date(newsItem.date).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleEdit(newsItem)}
                    className="text-blue-600 hover:text-blue-900 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(newsItem._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingNews ? 'Edit News Article' : 'Add News Article'}
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Author</label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({...formData, author: e.target.value})}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Content</label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    rows="5"
                    required
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="mr-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 border border-gray-300 rounded-md hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                  >
                    {editingNews ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default NewsPage;
