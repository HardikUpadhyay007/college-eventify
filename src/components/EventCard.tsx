import React from 'react';
import { Link } from 'react-router-dom';
import { Event } from '../types';
import { Calendar, MapPin, Clock, DollarSign, ImageOff } from 'lucide-react';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const [imageError, setImageError] = React.useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden my-6 transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      {event.imageUrl && !imageError ? (
        <div className="w-full h-48 sm:h-56 md:h-64 overflow-hidden">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            onError={handleImageError}
          />
        </div>
      ) : (
        <div className="w-full h-48 sm:h-56 md:h-64 bg-gray-100 flex items-center justify-center">
          <div className="text-center text-gray-400">
            <ImageOff className="w-12 h-12 mx-auto mb-2" />
            <p>No image available</p>
          </div>
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium px-2 py-1 bg-purple-100 text-purple-800 rounded-full">
            {event.category}
          </span>
          <span className="text-xs text-gray-500">
            {event.clubName}
          </span>
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h2>
        <p className="text-gray-600 mb-4">{truncateText(event.description, 120)}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="w-4 h-4 mr-2" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{event.venue}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <DollarSign className="w-4 h-4 mr-2" />
            <span>{event.fee === 0 ? 'Free' : `₹${event.fee}`}</span>
          </div>
        </div>
        
        <Link
          to={`/event/${event.id}`}
          className="inline-block w-full text-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-200"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default EventCard;