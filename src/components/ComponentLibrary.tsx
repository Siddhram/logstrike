"use client"
import { useState } from 'react';
import DraggableComponent from './DraggableComponent';
import { componentsList } from './componentsList';

const ComponentLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredComponents = componentsList.filter(component => 
    component.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mt-2">
      <div className="mb-3">
        <input
          type="text"
          placeholder="Search components..."
          className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-2 text-sm text-gray-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        {filteredComponents.map(component => (
          <DraggableComponent 
            key={component.id}
            id={component.id}
            name={component.name}
            icon={component.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default ComponentLibrary;