type Appointment = {
  id: string;
  name: string;
  datetime: string;
  reason: string;
  phone: string;
  email: string;
  staff: string;
  countryCode: string;
  confirmed?: boolean; 
};

const STORAGE_KEY = 'appointments';

function loadAppointments(): Appointment[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function saveAppointments() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
}

const appointments: Appointment[] = loadAppointments();

export function addAppointment(data: Omit<Appointment, 'id'>): Appointment {
  const id = (appointments.length + 1).toString();
  const appointment = { id, ...data };
  appointments.push(appointment);
  saveAppointments();
  return appointment;
}

export function getAppointments(): Appointment[] {
  return [...appointments];
}

export function getAppointmentById(id: string): Appointment | undefined {
  return appointments.find(a => a.id === id);
}

export function confirmAppointment(id: string) {
  const appt = appointments.find(a => a.id === id);
  if (appt) {
    appt.confirmed = true;
    saveAppointments();
  }
}

export function updateAppointment(id: string, data: Partial<Appointment>) {
  const appt = appointments.find(a => a.id === id);
  if (appt) {
    Object.assign(appt, data);
    saveAppointments();
  }
}

type UserProfile = {
  name: string;
  email: string;
  avatar: string;
  role: string;
  phone: string;
  address: string;
  department: string;
  joined: string;
  countryCode: string;
};

const USER_KEY = 'currentUser';

// Mock user database
const mockUsers: { username: string; password: string; profile: UserProfile }[] = [
  {
    username: 'admin',
    password: 'admin123',
    profile: {
      name: 'Admin User',
      email: 'admin@example.com',
      avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff',
      role: 'Clinic Staff',
      phone: '555-123-4567',
      address: '123 Main St, Springfield',
      department: 'General Medicine',
      joined: 'Jan 10, 2022',
      countryCode: '+1',
    },
  },
];

export function login(username: string, password: string): Promise<UserProfile | null> {
  return new Promise((resolve) => {
    const user = mockUsers.find(u => u.username === username && u.password === password);
    if (user) {
      localStorage.setItem(USER_KEY, JSON.stringify(user.profile));
      resolve(user.profile);
    } else {
      resolve(null);
    }
  });
}

export function getCurrentUser(): UserProfile | null {
  const data = localStorage.getItem(USER_KEY);
  return data ? JSON.parse(data) : null;
}

export function updateCurrentUser(profile: Partial<UserProfile>) {
  const current = getCurrentUser();
  if (current) {
    const updated = { ...current, ...profile };
    localStorage.setItem(USER_KEY, JSON.stringify(updated));
  }
}
