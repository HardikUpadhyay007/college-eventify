import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Calendar, CheckSquare, PlusCircle } from 'lucide-react';
import AuthContext from '../context/AuthContext';
import EventContext from '../context/EventContext';
import EventCard from '../components/EventCard';
import { Event } from '../types';

const ProfilePage: React.FC = () => {
  const { user, isAuthenticated } = useContext(AuthContext);
  const { getEventsByClubId } = useContext(EventContext);
  const [userEvents, setUserEvents] = useState<Event[]>([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    if (user && user.isClubOwner) {
      const events = getEventsByClubId(user.id);
      setUserEvents(events);
    }
  }, [user, isAuthenticated, navigate, getEventsByClubId]);

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Cover Photo */}
        <div className="h-48 bg-gradient-to-r from-purple-600 to-indigo-700 relative">
          <div className="absolute bottom-0 left-0 w-full p-6 text-white">
            <h1 className="text-3xl font-bold">{user.username}</h1>
            <p className="text-purple-100">
              {user.isClubOwner ? `Club Admin: ${user.clubName}` : 'Student'}
            </p>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Profile Information</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <User className="h-5 w-5 text-gray-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Username</p>
                      <p className="font-medium">{user.username}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-gray-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{user.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gray-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Joined</p>
                      <p className="font-medium">
                        {new Date(user.createdAt).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-2">
              {user.isClubOwner ? (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Your Events</h2>
                    <Link 
                      to="/create-event"
                      className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-150"
                    >
                      <PlusCircle className="h-4 w-4 mr-1" />
                      Create New Event
                    </Link>
                  </div>
                  
                  {userEvents.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6">
                      {userEvents.map(event => (
                        <EventCard key={event.id} event={event} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                      <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-medium text-gray-800 mb-2">No events yet</h3>
                      <p className="text-gray-600 mb-6">Start by creating your first event!</p>
                      <Link 
                        to="/create-event"
                        className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-150"
                      >
                        Create Event
                      </Link>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Registered Events</h2>
                  </div>
                  
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <CheckSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-medium text-gray-800 mb-2">No registered events</h3>
                    <p className="text-gray-600 mb-6">You haven't registered for any events yet.</p>
                    <Link 
                      to="/"
                      className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-150"
                    >
                      Browse Events
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;