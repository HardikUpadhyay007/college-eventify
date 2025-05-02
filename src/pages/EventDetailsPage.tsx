import React, { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
    Calendar,
    Clock,
    MapPin,
    DollarSign,
    FileText,
    Share2,
    ArrowLeft,
} from "lucide-react";
import EventContext from "../context/EventContext";
import { Event } from "../types";

const EventDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { getEventById } = useContext(EventContext);
    const [event, setEvent] = useState<Event | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            const eventData = getEventById(id);
            if (eventData) {
                setEvent(eventData);
            }
        }
        setLoading(false);
    }, [id, getEventById]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
        });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    if (!event) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Event not found
                </h2>
                <p className="text-gray-600 mb-8">
                    The event you're looking for doesn't exist or has been
                    removed.
                </p>
                <Link
                    to="/"
                    className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-150"
                >
                    Back to Home
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center text-purple-700 hover:text-purple-900 mb-6 transition duration-150"
            >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Events
            </button>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                {event.imageUrl && (
                    <div className="w-full h-64 sm:h-80 md:h-96 overflow-hidden">
                        <img
                            src={event.imageUrl}
                            alt={event.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}

                <div className="p-6 md:p-8">
                    <div className="flex flex-wrap items-center justify-between mb-4">
                        <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                            {event.category}
                        </span>
                        <span className="text-gray-600 text-sm mt-2 sm:mt-0">
                            Posted by {event.clubName}
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                        {event.title}
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                Event Details
                            </h2>
                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <Calendar className="w-5 h-5 text-purple-600 mt-0.5 mr-3" />
                                    <div>
                                        <p className="font-medium">Date</p>
                                        <p className="text-gray-600">
                                            {formatDate(event.date)}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <Clock className="w-5 h-5 text-purple-600 mt-0.5 mr-3" />
                                    <div>
                                        <p className="font-medium">Time</p>
                                        <p className="text-gray-600">
                                            {event.time}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <MapPin className="w-5 h-5 text-purple-600 mt-0.5 mr-3" />
                                    <div>
                                        <p className="font-medium">Venue</p>
                                        <p className="text-gray-600">
                                            {event.venue}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <DollarSign className="w-5 h-5 text-purple-600 mt-0.5 mr-3" />
                                    <div>
                                        <p className="font-medium">Fee</p>
                                        <p className="text-gray-600">
                                            {event.fee === 0
                                                ? "Free"
                                                : `₹${event.fee}`}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <FileText className="w-5 h-5 text-purple-600 mt-0.5 mr-3" />
                                    <div>
                                        <p className="font-medium">
                                            Duty Leaves
                                        </p>
                                        <p className="text-gray-600">
                                            {event.dutyLeaves}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                About This Event
                            </h2>
                            <p className="text-gray-700 whitespace-pre-line">
                                {event.description}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 border-t pt-6">
                        <button className="px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-150 w-full sm:w-auto">
                            Register Now
                        </button>

                        {/* <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition duration-150 w-full sm:w-auto justify-center">
              <Share2 className="h-4 w-4 mr-2" />
              Share Event
            </button> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetailsPage;
