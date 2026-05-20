export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  qualifications: string[];
  availableTime: string;
  phone: string;
  image?: string;
}

export interface Appointment {
  id: string;
  patientName: string;
  doctorId: string;
  date: string;
  time: string;
  reason: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  medicalHistory?: string;
  appointments: Appointment[];
}

export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  available24: boolean;
}

export interface Department {
  id: string;
  name: string;
  description: string;
  staffCount: number;
  services: string[];
}
