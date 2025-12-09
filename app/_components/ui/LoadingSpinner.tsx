import Image from 'next/image';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

export default function LoadingSpinner({ size = 'md', text = 'Chargement...' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className={`relative ${sizeClasses[size]} animate-spin`}>
        <div className="absolute inset-0 rounded-full border-4 border-primary-200"></div>
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary-600 animate-spin"></div>
        <div className="absolute inset-2 rounded-full bg-white flex items-center justify-center">
          <div className="relative w-3/4 h-3/4">
            <Image
              src="https://moomel.sn/wp-content/uploads/2024/12/Logo-512-4.png"
              alt="Moomel Logo"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
      {text && (
        <p className="text-neutral-600 font-medium animate-pulse">{text}</p>
      )}
    </div>
  );
} 