
import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DashboardSectionCustomizer from './DashboardSectionCustomizer';

interface DashboardSections {
  bmi: boolean;
  progress: boolean;
  meals: boolean;
  fitness: boolean;
}

interface DashboardHeaderProps {
  userId: string;
  sections: DashboardSections;
  onSectionsChange: (sections: DashboardSections) => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  userId,
  sections,
  onSectionsChange
}) => {
  const [customizeOpen, setCustomizeOpen] = useState(false);

  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Button 
        variant="outline" 
        size="sm" 
        className="flex items-center gap-2"
        onClick={() => setCustomizeOpen(true)}
      >
        <Settings className="w-4 h-4" />
        Customize
      </Button>
      
      <DashboardSectionCustomizer
        open={customizeOpen}
        onClose={() => setCustomizeOpen(false)}
        sections={sections}
        userId={userId}
        onSave={onSectionsChange}
      />
    </div>
  );
};

export default DashboardHeader;
