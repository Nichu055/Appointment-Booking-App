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

//mock data for clinic staff
type ClinicStaff = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  phone: string;
  address: string;
  department: string;
  joined: string;
  countryCode: string;
  username: string;
  password: string;
};

const clinicStaffDb: ClinicStaff[] = [
  {
    id: 'dr-smith',
    name: 'Dr. John Smith',
    email: 'dr.smith@clinic.com',
    avatar: 'https://ui-avatars.com/api/?name=John+Smith&background=0D8ABC&color=fff',
    role: 'Doctor',
    phone: '555-111-2222',
    address: '101 Health Ave, Springfield',
    department: 'General Medicine',
    joined: 'Feb 15, 2020',
    countryCode: '+1',
    username: 'dr-smith',
    password: 'smith123',
  },
  {
    id: 'nurse-jane',
    name: 'Nurse Jane Doe',
    email: 'nurse.jane@clinic.com',
    avatar: 'https://ui-avatars.com/api/?name=Jane+Doe&background=0D8ABC&color=fff',
    role: 'Nurse',
    phone: '555-333-4444',
    address: '202 Wellness Rd, Springfield',
    department: 'Pediatrics',
    joined: 'May 22, 2021',
    countryCode: '+1',
    username: 'nurse-jane',
    password: 'jane123',
  },
  {
    id: 'dr-lee',
    name: 'Dr. Alice Lee',
    email: 'dr.lee@clinic.com',
    avatar: 'https://ui-avatars.com/api/?name=Alice+Lee&background=0D8ABC&color=fff',
    role: 'Doctor',
    phone: '555-555-6666',
    address: '303 Care Blvd, Springfield',
    department: 'Dermatology',
    joined: 'Aug 10, 2019',
    countryCode: '+1',
    username: 'dr-lee',
    password: 'lee123',
  },
];

// Update mockUsers to match clinicStaffDb
const mockUsers: { username: string; password: string; profile: ClinicStaff }[] = clinicStaffDb.map(staff => ({
  username: staff.username,
  password: staff.password,
  profile: staff,
}));

export function getClinicStaff(): ClinicStaff[] {
  return [...clinicStaffDb];
}
