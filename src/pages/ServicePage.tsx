import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ServiceDetail } from '../components/services/ServiceDetail';
import servicesData from '../data/services.json';
import { ServiceItem } from '../types';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { Button } from '../components/shared/Button';

export const ServicePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const currentService = (servicesData as ServiceItem[]).find(
    (s) => s.slug === slug
  );

  if (!currentService) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-20 text-center">
        <div className="max-w-md mx-auto space-y-6">
          <div className="w-16 h-16 rounded-full bg-amber-500/15 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/30">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-white">Service Line Not Found</h2>
          <p className="text-sm text-slate-400">
            The requested practice area does not exist or has been moved.
          </p>
          <Button variant="primary" href="/#services" icon={<ArrowLeft className="w-4 h-4" />} iconPosition="left">
            Back to All Services
          </Button>
        </div>
      </div>
    );
  }

  return <ServiceDetail service={currentService} />;
};
