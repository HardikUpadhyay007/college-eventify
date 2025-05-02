import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Event, EventContextType } from '../types';

// Create context with default values
export const EventContext = createContext<EventContextType>({
  events: [],
  addEvent: () => {},
  getEventById: () => undefined,
  getEventsByClubId: () => [],
  loading: true,
});

interface Props {
  children: ReactNode;
}

export const EventProvider: React.FC<Props> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load events from localStorage
    const storedEvents = localStorage.getItem('events');
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    } else {
      // Initialize with sample events if none exist
      const sampleEvents = getSampleEvents();
      setEvents(sampleEvents);
      localStorage.setItem('events', JSON.stringify(sampleEvents));
    }
    setLoading(false);
  }, []);

  const addEvent = (eventData: Omit<Event, 'id' | 'createdAt'>) => {
    const newEvent: Event = {
      ...eventData,
      id: `event-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    
    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    localStorage.setItem('events', JSON.stringify(updatedEvents));
  };

  const getEventById = (id: string) => {
    return events.find(event => event.id === id);
  };

  const getEventsByClubId = (clubId: string) => {
    return events.filter(event => event.clubId === clubId);
  };

  return (
    <EventContext.Provider
      value={{
        events,
        addEvent,
        getEventById,
        getEventsByClubId,
        loading,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

// Sample events for initial data
const getSampleEvents = (): Event[] => {
  return [
    {
      id: 'event-1',
      title: 'Annual Tech Fest',
      description: 'Join us for a day of innovation, technology, and fun! The Annual Tech Fest brings together the brightest minds on campus to showcase their projects, compete in coding challenges, and attend workshops led by industry professionals.',
      clubId: 'club-1',
      clubName: 'Tech Club',
      date: '2025-04-15',
      time: '10:00 AM - 5:00 PM',
      venue: 'Main Auditorium',
      dutyLeaves: 'Yes (8 hours)',
      fee: 50,
      category: 'Technology',
      createdAt: '2025-03-01T12:00:00Z',
      imageUrl: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 'event-2',
      title: 'Cultural Night',
      description: 'Experience the rich diversity of cultures through music, dance, and art at our annual Cultural Night. Student groups will perform traditional and contemporary pieces representing cultures from around the world.',
      clubId: 'club-2',
      clubName: 'Cultural Society',
      date: '2025-04-20',
      time: '6:00 PM - 10:00 PM',
      venue: 'Open Air Theater',
      dutyLeaves: 'Yes (4 hours)',
      fee: 0,
      category: 'Cultural',
      createdAt: '2025-03-05T14:30:00Z',
      imageUrl: 'https://images.pexels.com/photos/2263436/pexels-photo-2263436.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 'event-3',
      title: 'Entrepreneurship Workshop',
      description: 'Learn from successful entrepreneurs and gain insights into starting your own business. This workshop covers ideation, business planning, funding options, and marketing strategies for student entrepreneurs.',
      clubId: 'club-3',
      clubName: 'E-Cell',
      date: '2025-04-25',
      time: '2:00 PM - 5:00 PM',
      venue: 'Business School Auditorium',
      dutyLeaves: 'Yes (3 hours)',
      fee: 100,
      category: 'Workshop',
      createdAt: '2025-03-10T09:15:00Z',
      imageUrl: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }
  ];
};

export default EventContext;