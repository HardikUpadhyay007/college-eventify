import React, { useContext, useState, useEffect } from 'react';
import EventContext from '../context/EventContext';
import EventCard from '../components/EventCard';
import { Event } from '../types';
import { Search, Calendar, Filter, X } from 'lucide-react';

const HomePage: React.FC = () => {
  const { events, loading } = useContext(EventContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Categories from events
  const categories = [...new Set(events.map(event => event.category))];

  useEffect(() => {
    let result = [...events];

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        event =>
          event.title.toLowerCase().includes(term) ||
          event.description.toLowerCase().includes(term) ||
          event.clubName.toLowerCase().includes(term)
      );
    }

    // Apply category filter
    if (categoryFilter) {
      result = result.filter(event => event.category === categoryFilter);
    }

    // Apply date filter
    if (dateFilter) {
      result = result.filter(event => {
        const eventDate = new Date(event.date);
        const filterDate = new Date(dateFilter);
        return (
          eventDate.getFullYear() === filterDate.getFullYear() &&
          eventDate.getMonth() === filterDate.getMonth() &&
          eventDate.getDate() === filterDate.getDate()
        );
      });
    }

    // Sort by date (newest first)
    result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    setFilteredEvents(result);
  }, [events, searchTerm, categoryFilter, dateFilter]);

  const clearFilters = () => {
    setSearchTerm('');
    setCategoryFilter('');
    setDateFilter('');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-700 to-indigo-800 rounded-xl shadow-lg p-8 mb-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Discover Campus Events
          </h1>
          <p className="text-purple-100 mb-8 text-lg">
            Find and join the best events happening on your campus. Connect with clubs, attend workshops, and make the most of your college experience.
          </p>
          <div className="relative max-w-xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search for events, clubs, or keywords..."
              className="w-full pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Upcoming Events</h2>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 transition duration-150"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </button>
        </div>

        {showFilters && (
          <div className="bg-white rounded-lg shadow-md p-4 mb-6 animate-slide-down">
            <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={categoryFilter}
                  onChange={e => setCategoryFilter(e.target.value)}
                  className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  value={dateFilter}
                  onChange={e => setDateFilter(e.target.value)}
                  className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={clearFilters}
                  className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700 transition duration-150"
                >
                  <X className="h-4 w-4 mr-1" />
                  Clear
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Event Cards */}
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="text-gray-400 mb-4">
            <Calendar className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-xl font-medium text-gray-800 mb-2">No events found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your filters or search terms</p>
          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-150"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;