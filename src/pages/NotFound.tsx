import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '../components/shared/Button';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-24 text-center bg-slate-50">
      <div className="max-w-md mx-auto space-y-6">
        <span className="text-6xl sm:text-7xl font-extrabold font-mono text-amber-600">
          404
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Page Not Found
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed font-normal">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <div className="pt-4 flex items-center justify-center gap-4">
          <Button variant="primary" href="/" icon={<Home className="w-4 h-4 text-slate-950" />} iconPosition="left">
            Return to Homepage
          </Button>
          <Button variant="secondary" href="/#services">
            View Services
          </Button>
        </div>
      </div>
    </div>
  );
};
