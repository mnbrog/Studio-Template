import React, { useState, useEffect } from 'react';

// Status indicator component
const StatusIndicator = ({ status, size = 'md', pulse = false }) => {
  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    away: 'bg-yellow-500',
    busy: 'bg-red-500',
    invisible: 'bg-gray-300'
  };

  const sizes = {
    xs: 'w-2 h-2',
    sm: 'w-3 h-3', 
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  return (
    <div className={`absolute bottom-0 right-0 rounded-full border-2 border-white ${statusColors[status]} ${sizes[size]} ${pulse ? 'animate-pulse' : ''}`}>
      {pulse && <div className={`absolute inset-0 rounded-full ${statusColors[status]} animate-ping opacity-75`}></div>}
    </div>
  );
};

// Badge/notification component
const Badge = ({ count, max = 99 }) => {
  const displayCount = count > max ? `${max}+` : count;
  
  return (
    <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full min-w-[20px] h-5 flex items-center justify-center px-1 font-semibold border-2 border-white">
      {displayCount}
    </div>
  );
};

// Main Avatar component
const Avatar = ({ 
  src, 
  name, 
  size = 'md', 
  status, 
  badge,
  showInitials = true,
  clickable = false,
  verified = false,
  bordered = false,
  rounded = 'full',
  pulse = false,
  gradient = false,
  fallbackColor = 'blue',
  className = '',
  onClick
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const sizes = {
    xs: 'w-8 h-8 text-xs',
    sm: 'w-10 h-10 text-sm',
    md: 'w-12 h-12 text-base',
    lg: 'w-16 h-16 text-lg',
    xl: 'w-20 h-20 text-xl',
    '2xl': 'w-24 h-24 text-2xl',
    '3xl': 'w-32 h-32 text-3xl'
  };

  const roundedStyles = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full'
  };

  const fallbackColors = {
    blue: 'bg-gradient-to-br from-blue-400 to-blue-600 text-white',
    green: 'bg-gradient-to-br from-green-400 to-green-600 text-white',
    purple: 'bg-gradient-to-br from-purple-400 to-purple-600 text-white',
    pink: 'bg-gradient-to-br from-pink-400 to-pink-600 text-white',
    orange: 'bg-gradient-to-br from-orange-400 to-orange-600 text-white',
    red: 'bg-gradient-to-br from-red-400 to-red-600 text-white',
    gray: 'bg-gradient-to-br from-gray-400 to-gray-600 text-white'
  };

  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  useEffect(() => {
    if (src) {
      setImageError(false);
      setImageLoaded(false);
    }
  }, [src]);

  const baseClasses = `
    relative inline-flex items-center justify-center font-semibold select-none overflow-hidden
    ${sizes[size]}
    ${roundedStyles[rounded]}
    ${bordered ? 'ring-2 ring-white ring-offset-2 ring-offset-gray-100' : ''}
    ${clickable ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}
    ${gradient && !src ? 'bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500' : ''}
    ${pulse ? 'animate-pulse' : ''}
    ${className}
  `;

  return (
    <div className={baseClasses} onClick={clickable ? onClick : undefined}>
      {/* Image */}
      {src && !imageError && (
        <img
          src={src}
          alt={name || 'Avatar'}
          className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onError={handleImageError}
          onLoad={handleImageLoad}
        />
      )}
      
      {/* Fallback with initials */}
      {(!src || imageError) && showInitials && (
        <div className={`w-full h-full flex items-center justify-center ${gradient ? '' : fallbackColors[fallbackColor]}`}>
          {getInitials(name)}
        </div>
      )}
      
      {/* Loading state */}
      {src && !imageLoaded && !imageError && (
        <div className="w-full h-full flex items-center justify-center bg-gray-200 animate-pulse">
          <svg className="w-1/2 h-1/2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
          </svg>
        </div>
      )}

      {/* Verified checkmark */}
      {verified && (
        <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      )}

      {/* Status indicator */}
      {status && (
        <StatusIndicator 
          status={status} 
          size={size === 'xs' || size === 'sm' ? 'sm' : 'md'}
          pulse={status === 'online'}
        />
      )}

      {/* Badge */}
      {badge && <Badge count={badge} />}
    </div>
  );
};

// Avatar Group component
const AvatarGroup = ({ avatars, max = 5, size = 'md', spacing = 'normal' }) => {
  const visibleAvatars = avatars.slice(0, max);
  const remainingCount = avatars.length - max;

  const spacingClasses = {
    tight: '-space-x-1',
    normal: '-space-x-2',
    loose: '-space-x-3'
  };

  return (
    <div className={`flex items-center ${spacingClasses[spacing]}`}>
      {visibleAvatars.map((avatar, index) => (
        <Avatar
          key={index}
          {...avatar}
          size={size}
          bordered={true}
          className="hover:z-10 transition-all duration-200 hover:scale-110"
        />
      ))}
      {remainingCount > 0 && (
        <Avatar
          name={`+${remainingCount}`}
          size={size}
          bordered={true}
          fallbackColor="gray"
          className="hover:z-10 transition-all duration-200 hover:scale-110 bg-gray-100 text-gray-600 font-bold"
        />
      )}
    </div>
  );
};

// Demo component showcasing all features
const AvatarDemo = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  const users = [
    { 
      name: 'Alex Johnson', 
      src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      status: 'online',
      verified: true
    },
    { 
      name: 'Sarah Chen', 
      src: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      status: 'away',
      badge: 3
    },
    { 
      name: 'Mike Rodriguez', 
      src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      status: 'busy'
    },
    { 
      name: 'Emma Wilson', 
      src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      status: 'offline'
    },
    { 
      name: 'David Kim', 
      status: 'online'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Premium Avatar System</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A comprehensive avatar component with status indicators, badges, groups, and extensive customization options.
          </p>
        </div>

        {/* Size Variants */}
        <div className="bg-white rounded-2xl p-8 mb-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Size Variants</h2>
          <div className="flex items-end gap-6 flex-wrap">
            {['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'].map(size => (
              <div key={size} className="text-center">
                <Avatar
                  name="John Doe"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
                  size={size}
                  status="online"
                />
                <p className="mt-2 text-sm text-gray-600 font-mono">{size}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Status & Features */}
        <div className="bg-white rounded-2xl p-8 mb-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Status & Features</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            <div className="text-center">
              <Avatar name="Online" status="online" fallbackColor="green" />
              <p className="mt-2 text-sm text-gray-600">Online</p>
            </div>
            <div className="text-center">
              <Avatar name="Away" status="away" fallbackColor="yellow" />
              <p className="mt-2 text-sm text-gray-600">Away</p>
            </div>
            <div className="text-center">
              <Avatar name="Busy" status="busy" fallbackColor="red" />
              <p className="mt-2 text-sm text-gray-600">Busy</p>
            </div>
            <div className="text-center">
              <Avatar name="Offline" status="offline" fallbackColor="gray" />
              <p className="mt-2 text-sm text-gray-600">Offline</p>
            </div>
            <div className="text-center">
              <Avatar name="Badge" badge={99} fallbackColor="blue" />
              <p className="mt-2 text-sm text-gray-600">Badge</p>
            </div>
            <div className="text-center">
              <Avatar name="Verified" verified fallbackColor="purple" />
              <p className="mt-2 text-sm text-gray-600">Verified</p>
            </div>
          </div>
        </div>

        {/* Shapes & Styles */}
        <div className="bg-white rounded-2xl p-8 mb-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Shapes & Styles</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div className="text-center">
              <Avatar
                name="Square"
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
                rounded="none"
                size="lg"
              />
              <p className="mt-2 text-sm text-gray-600">Square</p>
            </div>
            <div className="text-center">
              <Avatar
                name="Rounded"
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
                rounded="md"
                size="lg"
              />
              <p className="mt-2 text-sm text-gray-600">Rounded</p>
            </div>
            <div className="text-center">
              <Avatar
                name="Circle"
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
                rounded="full"
                size="lg"
              />
              <p className="mt-2 text-sm text-gray-600">Circle</p>
            </div>
            <div className="text-center">
              <Avatar
                name="Bordered"
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
                bordered
                size="lg"
              />
              <p className="mt-2 text-sm text-gray-600">Bordered</p>
            </div>
            <div className="text-center">
              <Avatar
                name="Gradient"
                gradient
                size="lg"
              />
              <p className="mt-2 text-sm text-gray-600">Gradient</p>
            </div>
          </div>
        </div>

        {/* Interactive Team */}
        <div className="bg-white rounded-2xl p-8 mb-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Interactive Team</h2>
          <div className="flex flex-wrap gap-6 mb-6">
            {users.map((user, index) => (
              <div
                key={index}
                className={`transition-all duration-200 ${selectedUser === index ? 'scale-110' : ''}`}
              >
                <Avatar
                  {...user}
                  size="xl"
                  clickable
                  bordered={selectedUser === index}
                  onClick={() => setSelectedUser(selectedUser === index ? null : index)}
                />
              </div>
            ))}
          </div>
          {selectedUser !== null && (
            <div className="bg-gray-50 rounded-lg p-4 mt-4">
              <h3 className="font-semibold text-gray-900">{users[selectedUser].name}</h3>
              <p className="text-sm text-gray-600 capitalize">Status: {users[selectedUser].status}</p>
            </div>
          )}
        </div>

        {/* Avatar Groups */}
        <div className="bg-white rounded-2xl p-8 mb-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Avatar Groups</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Team Alpha (8 members)</h3>
              <AvatarGroup avatars={users.concat(users).slice(0, 8)} max={5} spacing="normal" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Project Beta (12 members)</h3>
              <AvatarGroup avatars={users.concat(users).concat(users).slice(0, 12)} max={6} spacing="tight" size="sm" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Design Team (15 members)</h3>
              <AvatarGroup avatars={users.concat(users).concat(users).slice(0, 15)} max={4} spacing="loose" size="lg" />
            </div>
          </div>
        </div>

        {/* Color Variants */}
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Fallback Colors</h2>
          <div className="grid grid-cols-3 md:grid-cols-7 gap-6">
            {['blue', 'green', 'purple', 'pink', 'orange', 'red', 'gray'].map(color => (
              <div key={color} className="text-center">
                <Avatar name="TC" fallbackColor={color} size="lg" />
                <p className="mt-2 text-sm text-gray-600 capitalize">{color}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvatarDemo;