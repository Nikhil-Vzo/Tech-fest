export interface Event {
  id: string;
  title: string;
  category: 'Trivia' | 'Dance' | 'Music' | 'Fashion' | 'Film' | 'Celebration';
  description: string;
  date: string;
  time: string;
  location: string;
  image?: string;
}

export interface Speaker {
  id: string;
  name: string;
  role: string;
  designation: string;
  image: string;
}

export interface TicketTier {
  id: string;
  name: string;
  price: number;
  capacity: number;
  available: number;
  type: 'VIP' | 'General';
  position: 'left' | 'right' | 'center';
}

export interface Attendee {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: 'Lead Investigator' | 'Team Member';
}

export interface BookingState {
  selectedTier: TicketTier | null;
  seatCount: number;
  attendees: Attendee[];
}
