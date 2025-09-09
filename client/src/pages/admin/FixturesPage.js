import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFixtures, createFixture, updateFixture, deleteFixture } from '../../features/fixtures/fixtureSlice';
import { notifySuccess, notifyError } from '../../utils/toast';

const FixturesPage = () => {
  const dispatch = useDispatch();
  const { items: fixtures, loading, error } = useSelector(state => state.fixtures);
  const [showModal, setShowModal] = useState(false);
  const [editingFixture, setEditingFixture] = useState(null);
  const [formData, setFormData] = useState({
    homeTeam: '',
    awayTeam: '',
    date: '',
    location: '',
    status: ''
  });

  useEffect(() => {
    dispatch(fetchFixtures());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingFixture) {
        await dispatch(updateFixture({ id: editingFixture._id, fixtureData: formData })).unwrap();
        notifySuccess('Fixture updated successfully');
      } else {
        await dispatch(createFixture(formData)).unwrap();
        notifySuccess('Fixture created successfully');
      }
      setShowModal(false);
      resetForm();
    } catch (err) {
      notifyError(err.message || 'Operation failed');
    }
  };

  const handleEdit = (fixture) => {
    setEditingFixture(fixture);
    setFormData({
      homeTeam: fixture.homeTeam,
      awayTeam: fixture.awayTeam,
      date: fixture.date,
      location: fixture.location,
      status: fixture.status
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this fixture?')) {
      try {
        await dispatch(deleteFixture(id)).unwrap();
        notifySuccess('Fixture deleted successfully');
      } catch (err) {
        notifyError(err.message || 'Delete failed');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      homeTeam: '',
      awayTeam: '',
      date: '',
      location: '',
      status: ''
    });
    setEditingFixture(null);
  };

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Fixtures Management</h1>
        <button
          onClick={openAddModal}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Fixture
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Home Team</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Away Team</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {fixtures.map((fixture) => (
              <tr key={fixture._id}>
                <td className="px-6 py-4 whitespace-nowrap">{fixture.homeTeam}</td>
                <td className="px-6 py-4 whitespace-nowrap">{fixture.awayTeam}</td>
                <td className="px-6 py-4 whitespace-nowrap">{new Date(fixture.date).toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">{fixture.location}</td>
                <td className="px-6 py-4 whitespace-nowrap">{fixture.status}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleEdit(fixture)}
                    className="text-blue-600 hover:text-blue-900 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(fixture._id)}
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
                {editingFixture ? 'Edit Fixture' : 'Add Fixture'}
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Home Team</label>
                  <input
                    type="text"
                    value={formData.homeTeam}
                    onChange={(e) => setFormData({...formData, homeTeam: e.target.value})}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Away Team</label>
                  <input
                    type="text"
                    value={formData.awayTeam}
                    onChange={(e) => setFormData({...formData, awayTeam: e.target.value})}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Date</label>
                  <input
                    type="datetime-local"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  >
                    <option value="Scheduled">Scheduled</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
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
                    {editingFixture ? 'Update' : 'Create'}
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

export default FixturesPage;
