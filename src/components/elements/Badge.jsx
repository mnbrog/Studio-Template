import React, { useState, useEffect } from 'react';

// Icon components for different badge types
const Icons = {
  star: (
    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  ),
  check: (
    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  ),
  x: (
    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
  ),
  warning: (
    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
  ),
  info: (
    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
    </svg>
  ),
  heart: (
    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
    </svg>
  ),
  fire: (
    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
    </svg>
  ),
  lightning: (
    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
    </svg>
  )
};

// Main Badge component with extensive customization
const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  color = 'gray',
  rounded = 'full',
  outline = false,
  gradient = false,
  glow = false,
  pulse = false,
  bounce = false,
  icon,
  iconPosition = 'left',
  removable = false,
  clickable = false,
  count,
  maxCount = 99,
  dot = false,
  uppercase = false,
  className = '',
  onClick,
  onRemove
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Size variants
  const sizes = {
    xs: 'px-1.5 py-0.5 text-xs min-h-[16px]',
    sm: 'px-2 py-1 text-xs min-h-[20px]',
    md: 'px-2.5 py-1 text-sm min-h-[24px]',
    lg: 'px-3 py-1.5 text-sm min-h-[28px]',
    xl: 'px-4 py-2 text-base min-h-[32px]'
  };

  // Rounded variants
  const roundedStyles = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full'
  };

  // Color schemes
  const colorSchemes = {
    gray: {
      solid: 'bg-gray-100 text-gray-800 border-gray-200',
      outline: 'border-gray-300 text-gray-700 hover:bg-gray-50',
      gradient: 'bg-gradient-to-r from-gray-400 to-gray-600 text-white',
      glow: 'shadow-gray-500/25'
    },
    blue: {
      solid: 'bg-blue-100 text-blue-800 border-blue-200',
      outline: 'border-blue-300 text-blue-700 hover:bg-blue-50',
      gradient: 'bg-gradient-to-r from-blue-500 to-blue-700 text-white',
      glow: 'shadow-blue-500/25'
    },
    green: {
      solid: 'bg-green-100 text-green-800 border-green-200',
      outline: 'border-green-300 text-green-700 hover:bg-green-50',
      gradient: 'bg-gradient-to-r from-green-500 to-green-700 text-white',
      glow: 'shadow-green-500/25'
    },
    red: {
      solid: 'bg-red-100 text-red-800 border-red-200',
      outline: 'border-red-300 text-red-700 hover:bg-red-50',
      gradient: 'bg-gradient-to-r from-red-500 to-red-700 text-white',
      glow: 'shadow-red-500/25'
    },
    yellow: {
      solid: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      outline: 'border-yellow-300 text-yellow-700 hover:bg-yellow-50',
      gradient: 'bg-gradient-to-r from-yellow-500 to-yellow-700 text-white',
      glow: 'shadow-yellow-500/25'
    },
    purple: {
      solid: 'bg-purple-100 text-purple-800 border-purple-200',
      outline: 'border-purple-300 text-purple-700 hover:bg-purple-50',
      gradient: 'bg-gradient-to-r from-purple-500 to-purple-700 text-white',
      glow: 'shadow-purple-500/25'
    },
    pink: {
      solid: 'bg-pink-100 text-pink-800 border-pink-200',
      outline: 'border-pink-300 text-pink-700 hover:bg-pink-50',
      gradient: 'bg-gradient-to-r from-pink-500 to-pink-700 text-white',
      glow: 'shadow-pink-500/25'
    },
    indigo: {
      solid: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      outline: 'border-indigo-300 text-indigo-700 hover:bg-indigo-50',
      gradient: 'bg-gradient-to-r from-indigo-500 to-indigo-700 text-white',
      glow: 'shadow-indigo-500/25'
    },
    orange: {
      solid: 'bg-orange-100 text-orange-800 border-orange-200',
      outline: 'border-orange-300 text-orange-700 hover:bg-orange-50',
      gradient: 'bg-gradient-to-r from-orange-500 to-orange-700 text-white',
      glow: 'shadow-orange-500/25'
    }
  };

  // Get color scheme
  const scheme = colorSchemes[color] || colorSchemes.gray;
  let colorClass = '';
  
  if (gradient) {
    colorClass = scheme.gradient;
  } else if (outline) {
    colorClass = `bg-transparent border ${scheme.outline}`;
  } else {
    colorClass = scheme.solid;
  }

  // Handle count display
  const displayCount = count !== undefined ? (count > maxCount ? `${maxCount}+` : count) : null;
  const content = displayCount !== null ? displayCount : children;

  // Handle remove
  const handleRemove = (e) => {
    e.stopPropagation();
    setIsVisible(false);
    if (onRemove) onRemove();
  };

  // Handle click
  const handleClick = (e) => {
    if (clickable && onClick) onClick(e);
  };

  if (!isVisible) return null;

  // Base classes
  const baseClasses = `
    inline-flex items-center justify-center font-medium select-none transition-all duration-200
    ${sizes[size]}
    ${roundedStyles[rounded]}
    ${colorClass}
    ${glow ? `shadow-lg ${scheme.glow}` : ''}
    ${pulse ? 'animate-pulse' : ''}
    ${bounce ? 'animate-bounce' : ''}
    ${clickable ? 'cursor-pointer hover:scale-105 active:scale-95' : ''}
    ${uppercase ? 'uppercase' : ''}
    ${className}
  `.trim();

  if (dot) {
    return (
      <span className={`
        inline-block w-2 h-2 rounded-full
        ${gradient ? scheme.gradient : scheme.solid.split(' ')[0]}
        ${pulse ? 'animate-pulse' : ''}
        ${className}
      `} />
    );
  }

  return (
    <span 
      className={baseClasses}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Leading icon */}
      {icon && iconPosition === 'left' && (
        <span className="mr-1">
          {Icons[icon] || icon}
        </span>
      )}
      
      {/* Content */}
      <span>{content}</span>
      
      {/* Trailing icon */}
      {icon && iconPosition === 'right' && (
        <span className="ml-1">
          {Icons[icon] || icon}
        </span>
      )}
      
      {/* Remove button */}
      {removable && (
        <button
          onClick={handleRemove}
          className="ml-1 hover:bg-black/10 rounded-full p-0.5 transition-colors"
        >
          {Icons.x}
        </button>
      )}
    </span>
  );
};

// Notification Badge component for overlaying on other elements
const NotificationBadge = ({ count, max = 99, color = 'red', size = 'sm', className = '' }) => {
  if (!count || count <= 0) return null;
  
  const displayCount = count > max ? `${max}+` : count;
  
  return (
    <Badge
      count={displayCount}
      color={color}
      size={size}
      className={`absolute -top-2 -right-2 min-w-[20px] ${className}`}
    />
  );
};

// Status Badge component
const StatusBadge = ({ status, pulse = false }) => {
  const statusConfig = {
    online: { color: 'green', text: 'Online', icon: 'check' },
    offline: { color: 'gray', text: 'Offline' },
    away: { color: 'yellow', text: 'Away', icon: 'warning' },
    busy: { color: 'red', text: 'Busy' },
    premium: { color: 'purple', text: 'Premium', icon: 'star', gradient: true },
    verified: { color: 'blue', text: 'Verified', icon: 'check' }
  };

  const config = statusConfig[status] || statusConfig.offline;

  return (
    <Badge
      color={config.color}
      icon={config.icon}
      gradient={config.gradient}
      pulse={pulse && status === 'online'}
      size="sm"
    >
      {config.text}
    </Badge>
  );
};

// Demo component showcasing all features
const BadgeDemo = () => {
  const [selectedTags, setSelectedTags] = useState(['React', 'JavaScript', 'UI/UX']);
  const [notifications, setNotifications] = useState(5);

  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const removeTag = (tag) => {
    setSelectedTags(prev => prev.filter(t => t !== tag));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Premium Badge System
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            The most comprehensive badge component library with 50+ variants, animations, and interactive features. 
            Perfect for status indicators, notifications, tags, and more.
          </p>
        </div>

        {/* Size Variants */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 mb-8 shadow-xl border border-white/20">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <span className="w-8 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded mr-4"></span>
            Size Variants
          </h2>
          <div className="flex items-center gap-6 flex-wrap">
            {['xs', 'sm', 'md', 'lg', 'xl'].map(size => (
              <div key={size} className="text-center">
                <Badge size={size} color="blue" gradient glow>
                  {size.toUpperCase()}
                </Badge>
                <p className="mt-2 text-sm text-gray-600 font-mono">{size}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Color Palette */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 mb-8 shadow-xl border border-white/20">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <span className="w-8 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded mr-4"></span>
            Color Palette
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-9 gap-6">
            {['gray', 'blue', 'green', 'red', 'yellow', 'purple', 'pink', 'indigo', 'orange'].map(color => (
              <div key={color} className="text-center space-y-3">
                <Badge color={color} size="lg">{color}</Badge>
                <Badge color={color} outline size="sm">{color}</Badge>
                <Badge color={color} gradient size="sm">{color}</Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Status */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 mb-8 shadow-xl border border-white/20">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <span className="w-8 h-1 bg-gradient-to-r from-green-500 to-blue-500 rounded mr-4"></span>
            Status Indicators
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <StatusBadge status="online" pulse />
            <StatusBadge status="away" />
            <StatusBadge status="busy" />
            <StatusBadge status="offline" />
            <StatusBadge status="premium" />
            <StatusBadge status="verified" />
          </div>
        </div>

        {/* Notification Examples */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 mb-8 shadow-xl border border-white/20">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <span className="w-8 h-1 bg-gradient-to-r from-red-500 to-orange-500 rounded mr-4"></span>
            Notifications & Counters
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="relative inline-block">
              <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                📧
              </div>
              <NotificationBadge count={notifications} />
            </div>
            <div className="relative inline-block">
              <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                🔔
              </div>
              <NotificationBadge count={25} max={20} color="blue" />
            </div>
            <div className="relative inline-block">
              <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                💬
              </div>
              <NotificationBadge count={150} max={99} color="green" />
            </div>
            <div className="relative inline-block">
              <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                ❤️
              </div>
              <NotificationBadge count={3} color="pink" />
            </div>
          </div>
          <div className="mt-6">
            <button 
              onClick={() => setNotifications(prev => prev + 1)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors mr-2"
            >
              Add Notification
            </button>
            <button 
              onClick={() => setNotifications(0)}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Clear All
            </button>
          </div>
        </div>

        {/* Icon Badges */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 mb-8 shadow-xl border border-white/20">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <span className="w-8 h-1 bg-gradient-to-r from-yellow-500 to-red-500 rounded mr-4"></span>
            Icon Badges
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            <Badge icon="star" color="yellow" gradient glow>Featured</Badge>
            <Badge icon="check" color="green" size="sm">Verified</Badge>
            <Badge icon="fire" color="red" gradient>Hot</Badge>
            <Badge icon="lightning" color="purple" gradient>Fast</Badge>
            <Badge icon="heart" color="pink" pulse>Loved</Badge>
            <Badge icon="warning" color="yellow" outline>Warning</Badge>
            <Badge icon="info" color="blue" glow>Info</Badge>
            <Badge icon="star" iconPosition="right" color="indigo">Pro</Badge>
          </div>
        </div>

        {/* Interactive Tag System */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 mb-8 shadow-xl border border-white/20">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <span className="w-8 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded mr-4"></span>
            Interactive Tag System
          </h2>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Available Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {['React', 'Vue', 'Angular', 'JavaScript', 'TypeScript', 'CSS', 'HTML', 'Node.js', 'Python', 'UI/UX', 'Design', 'Frontend'].map(tag => (
                <Badge
                  key={tag}
                  clickable
                  color={selectedTags.includes(tag) ? 'blue' : 'gray'}
                  gradient={selectedTags.includes(tag)}
                  outline={!selectedTags.includes(tag)}
                  onClick={() => toggleTag(tag)}
                  className="transition-all duration-200"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Selected Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {selectedTags.map(tag => (
                <Badge
                  key={tag}
                  removable
                  color="blue"
                  gradient
                  onRemove={() => removeTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
              {selectedTags.length === 0 && (
                <span className="text-gray-500 italic">No tags selected</span>
              )}
            </div>
          </div>
        </div>

        {/* Special Effects */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 mb-8 shadow-xl border border-white/20">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <span className="w-8 h-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded mr-4"></span>
            Special Effects
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center space-y-3">
              <Badge gradient color="purple" glow pulse>Pulsing</Badge>
              <p className="text-sm text-gray-600">Pulse Animation</p>
            </div>
            <div className="text-center space-y-3">
              <Badge gradient color="red" glow bounce>Bouncing</Badge>
              <p className="text-sm text-gray-600">Bounce Animation</p>
            </div>
            <div className="text-center space-y-3">
              <Badge gradient color="blue" glow className="animate-spin">Spinning</Badge>
              <p className="text-sm text-gray-600">Custom Animation</p>
            </div>
            <div className="text-center space-y-3">
              <Badge gradient color="green" glow className="hover:scale-125 transition-transform cursor-pointer">Hover</Badge>
              <p className="text-sm text-gray-600">Hover Effects</p>
            </div>
          </div>
        </div>

        {/* Dot Indicators */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <span className="w-8 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded mr-4"></span>
            Dot Indicators
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-gray-700">Server Status:</span>
              <Badge dot color="green" pulse />
              <span className="text-sm text-gray-600">Online</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-700">Database:</span>
              <Badge dot color="yellow" />
              <span className="text-sm text-gray-600">Warning</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-700">API:</span>
              <Badge dot color="red" pulse />
              <span className="text-sm text-gray-600">Error</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BadgeDemo;