export interface User {
  id: string;
  username: string;
  email: string;
  isClubOwner: boolean;
  clubName?: string;
  createdAt: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  clubId: string;
  clubName: string;
  date: string;
  time: string;
  venue: string;
  dutyLeaves: string;
  fee: number;
  category: string;
  createdAt: string;
  imageUrl?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  isClubOwner: boolean;
  clubName?: string;
  adminCode?: string;
}

export interface EventContextType {
  events: Event[];
  addEvent: (event: Omit<Event, 'id' | 'createdAt'>) => void;
  getEventById: (id: string) => Event | undefined;
  getEventsByClubId: (clubId: string) => Event[];
  loading: boolean;
}