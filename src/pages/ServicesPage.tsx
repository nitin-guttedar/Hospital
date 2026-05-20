import React from 'react';
import { Stethoscope, Zap, Baby, Heart, Brain, Eye } from 'lucide-react';
import { Service } from '../types';

export default function ServicesPage() {
  const services: Service[] = [
    {
      id: '1',
      name: 'Emergency Services',
      description: 'Rapid response emergency care available 24/7 for life-threatening conditions',
      icon: 'Zap',
      available24: true,
    },
    {
      id: '2',
      name: 'Cardiology',
      description: 'Comprehensive heart and cardiovascular disease treatment and diagnosis',
      icon: 'Heart',
      available24: false,
    },
    {
      id: '3',
      name: 'Pediatrics',
      description: 'Complete healthcare services for infants, children and adolescents',
      icon: 'Baby',
      available24: false,
    },
    {
      id: '4',
      name: 'Neurology',
      description: 'Treatment for brain and nervous system disorders',
      icon: 'Brain',
      available24: false,
    },
    {
      id: '5',
      name: 'Ophthalmology',
      description: 'Eye care and vision correction services',
      icon: 'Eye',
      available24: false,
    },
    {
      id: '6',
      name: 'General Medicine',
      description: 'Comprehensive medical care for all health conditions',
      icon: 'Stethoscope',
      available24: true,
    },
  ];

  const getIcon = (iconName: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      Stethoscope: <Stethoscope size={32} />,
      Zap: <Zap size={32} />,
      Baby: <Baby size={32} />,
      Heart: <Heart size={32} />,
      Brain: <Brain size={32} />,
      Eye: <Eye size={32} />,
    };
    return icons[iconName];
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-4 text-center">Our Services</h1>
        <p className="text-gray-600 text-center mb-12">
          Comprehensive medical services for your complete health needs
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service) => (
            <div key={service.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-4 mb-4">
                <div className="text-hospital-blue">{getIcon(service.icon)}</div>
                <div>
                  <h3 className="text-lg font-bold">{service.name}</h3>
                  {service.available24 && (
                    <span className="text-xs bg-hospital-green text-white px-2 py-1 rounded">
                      Available 24/7
                    </span>
                  )}
                </div>
              </div>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>

        {/* Additional Services Info */}
        <div className="bg-hospital-blue text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Complete Healthcare Solution</h2>
          <p className="mb-6">
            In addition to our core services, we also offer specialized treatments, diagnostic facilities,
            and rehabilitation services to ensure your complete recovery and wellness.
          </p>
          <button className="bg-white text-hospital-blue px-6 py-3 rounded-lg font-bold hover:bg-gray-100">
            Learn More
          </button>
        </div>

        {/* Departments */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-8 text-center">Our Departments</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: 'Cardiology', doctors: 8 },
              { name: 'Orthopedics', doctors: 6 },
              { name: 'Neurology', doctors: 5 },
              { name: 'General Surgery', doctors: 10 },
              { name: 'Pediatrics', doctors: 7 },
              { name: 'Psychiatry', doctors: 4 },
            ].map((dept, idx) => (
              <div key={idx} className="bg-white rounded-lg p-6 border-l-4 border-hospital-blue">
                <h3 className="font-bold text-lg mb-2">{dept.name}</h3>
                <p className="text-gray-600">{dept.doctors} Specialists Available</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
