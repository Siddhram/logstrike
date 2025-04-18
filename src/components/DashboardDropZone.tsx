"use client"
import { useDrop } from 'react-dnd';
import { componentsList } from './componentsList';
import { useRef } from 'react';

interface DashboardDropZoneProps {
  onDrop: (componentId: string) => void;
  components: string[];
}

const DashboardDropZone = ({ onDrop, components }: DashboardDropZoneProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: 'COMPONENT',
    drop: (item: { id: string }) => {
      onDrop(item.id);
      return undefined;
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  // Connect the drop ref to our element ref
  dropRef(ref);

  // Get component details for the dropped components
  const droppedComponents = components.map(id => 
    componentsList.find(component => component.id === id)
  );

  return (
    <div 
      ref={ref} 
      className={`mb-6 p-4 border-2 border-dashed rounded-lg ${
        isOver 
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
          : 'border-gray-300 dark:border-gray-700'
      }`}
    >
      {/* Rest of your component remains the same */}
      {components.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <svg className="w-12 h-12 text-gray-400 dark:text-gray-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          <p className="text-gray-500 dark:text-gray-400">Drag and drop components here to add them to your dashboard</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {droppedComponents.map((component, index) => {
            if (!component) return null;
            
            // Render the appropriate component based on the ID
            return (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
                {component.id === 'chart' ? (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      {component.name}
                    </h3>
                    <div className="h-48 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
                      <span className="text-gray-500 dark:text-gray-400">Chart Component</span>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      {component.name}
                    </h3>
                    <div className="h-48 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
                      <span className="text-gray-500 dark:text-gray-400">Table Component</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DashboardDropZone;