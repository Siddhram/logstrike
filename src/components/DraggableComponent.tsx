"use client"
import { useDrag } from 'react-dnd';
import { useRef } from 'react';

interface DraggableComponentProps {
  id: string;
  name: string;
  icon: string;
}

const DraggableComponent = ({ id, name, icon }: DraggableComponentProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: 'COMPONENT',
    item: { id, name },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  // Connect the drag ref to our element ref
  dragRef(ref);

  return (
    <div
      ref={ref}
      className={`flex items-center p-2 rounded-lg cursor-move border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
    >
      <div className="flex-shrink-0 text-gray-500 dark:text-gray-400" dangerouslySetInnerHTML={{ __html: icon }} />
      <span className="ml-3 text-sm font-medium text-gray-900 dark:text-white">{name}</span>
    </div>
  );
};

export default DraggableComponent;