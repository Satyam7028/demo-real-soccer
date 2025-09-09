import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLeagues, createLeague, updateLeague, deleteLeague } from '../../features/leagues/leagueSlice';
import { notifySuccess, notifyError } from '../../utils/toast';

const LeaguesPage = () => {
  const dispatch = useDispatch();
  const { items: leagues, loading, error } = useSelector(state => state.leagues);
  const [showModal, setShowModal] = useState(false);
  const [editingLeague, setEditingLeague] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    season: '',
    description: ''
  });

  useEffect(() => {
    dispatch(fetchLeagues());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingLeague) {
        await dispatch(updateLeague({ id: editingLeague._id, leagueData: formData })).unwrap();
        notifySuccess('League updated successfully');
      } else {
        await dispatch(createLeague(formData)).unwrap();
        notifySuccess('League created successfully');
      }
      setShowModal(false);
      resetForm();
    } catch (err) {
      notifyError(err.message || 'Operation failed');
    }
  };

  const handleEdit = (league) => {
    setEditingLeague(league);
    setFormData({
      name: league.name,
      country: league.country,
      season: league.season,
      description: league.description
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this league?')) {
      try {
        await dispatch(deleteLeague(id)).unwrap();
        notifySuccess('League deleted successfully');
      } catch (err) {
        notifyError(err.message || 'Delete failed');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      country: '',
      season: '',
      description: ''
    });
    setEditingLeague(null);
  };

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Leagues Management</h1>
        <button
          onClick={openAddModal}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add League
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Season</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {leagues.map((league) => (
              <tr key={league._id}>
                <td className="px-6 py-4 whitespace-nowrap">{league.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{league.country}</td>
                <td className="px-6 py-4 whitespace-nowrap">{league.season}</td>
                <td className="px-6 py-4 whitespace-nowrap">{league.description}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleEdit(league)}
                    className="text-blue-600 hover:text-blue-900 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(league._id)}
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
                {editingLeague ? 'Edit League' : 'Add League'}
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Country</label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData({...formData, country: e.target.value})}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Season</label>
                  <input
                    type="text"
                    value={formData.season}
                    onChange={(e) => setFormData({...formData, season: e.target.value})}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    rows="3"
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
                    {editingLeague ? 'Update' : 'Create'}
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

export default LeaguesPage;
