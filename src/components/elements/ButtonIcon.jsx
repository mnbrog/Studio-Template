import React, { useState, useEffect } from 'react';

// Enhanced Icon System
const Icons = {
  heart: (
    <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  heartFilled: (
    <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
      <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
    </svg>
  ),
  download: (
    <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  share: (
    <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
    </svg>
  ),
  play: (
    <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
      <path d="M8 5v14l11-7z"/>
    </svg>
  ),
  pause: (
    <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
    </svg>
  ),
  plus: (
    <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  ),
  edit: (
    <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  ),
  trash: (
    <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  ),
  external: (
    <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  ),
  star: (
    <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  ),
  starFilled: (
    <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
      <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  ),
  check: (
    <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ),
  bookmark: (
    <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
    </svg>
  ),
  shopping: (
    <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v4a2 2 0 01-2 2H9a2 2 0 01-2-2v-4m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
    </svg>
  )
};

// Premium Ghost Button Component
const GhostButton = ({
  children,
  variant = 'default',
  size = 'md',
  color = 'slate',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  rounded = 'lg',
  animated = true,
  ripple = false,
  gradient = false,
  glow = false,
  className = '',
  onClick,
  ...props
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [ripples, setRipples] = useState([]);

  // Enhanced size system
  const sizes = {
    xs: 'px-2.5 py-1.5 text-xs min-h-[28px] gap-1.5',
    sm: 'px-3.5 py-2 text-sm min-h-[36px] gap-2',
    md: 'px-5 py-2.5 text-sm min-h-[42px] gap-2.5',
    lg: 'px-6 py-3 text-base min-h-[48px] gap-3',
    xl: 'px-8 py-4 text-lg min-h-[56px] gap-3',
    '2xl': 'px-10 py-5 text-xl min-h-[64px] gap-4'
  };

  const iconSizes = {
    xs: 'w-3.5 h-3.5',
    sm: 'w-4 h-4',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
    xl: 'w-5 h-5',
    '2xl': 'w-6 h-6'
  };

  // Rounded variants
  const roundedStyles = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    '3xl': 'rounded-3xl',
    full: 'rounded-full'
  };

  // Enhanced color schemes
  const colorSchemes = {
    slate: {
      default: 'text-slate-700 border-slate-300 hover:bg-slate-50 hover:border-slate-400 focus:ring-slate-500 hover:shadow-md',
      subtle: 'text-slate-600 hover:bg-slate-100 hover:text-slate-800 hover:shadow-sm',
      bold: 'text-slate-800 hover:bg-slate-200 hover:text-slate-900 border-slate-400 hover:border-slate-500',
      gradient: 'bg-gradient-to-r from-slate-100 to-slate-200 text-slate-800 hover:from-slate-200 hover:to-slate-300',
      glow: 'text-slate-700 border-slate-300 hover:bg-slate-50 hover:shadow-lg hover:shadow-slate-200/50'
    },
    blue: {
      default: 'text-blue-600 border-blue-300 hover:bg-blue-50 hover:border-blue-400 focus:ring-blue-500 hover:shadow-md hover:shadow-blue-100/50',
      subtle: 'text-blue-600 hover:bg-blue-50 hover:text-blue-700 hover:shadow-sm',
      bold: 'text-blue-700 hover:bg-blue-100 hover:text-blue-800 border-blue-400 hover:border-blue-500',
      gradient: 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 hover:from-blue-100 hover:to-indigo-100',
      glow: 'text-blue-600 border-blue-300 hover:bg-blue-50 hover:shadow-lg hover:shadow-blue-200/50'
    },
    emerald: {
      default: 'text-emerald-600 border-emerald-300 hover:bg-emerald-50 hover:border-emerald-400 focus:ring-emerald-500 hover:shadow-md hover:shadow-emerald-100/50',
      subtle: 'text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 hover:shadow-sm',
      bold: 'text-emerald-700 hover:bg-emerald-100 hover:text-emerald-800 border-emerald-400 hover:border-emerald-500',
      gradient: 'bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 hover:from-emerald-100 hover:to-teal-100',
      glow: 'text-emerald-600 border-emerald-300 hover:bg-emerald-50 hover:shadow-lg hover:shadow-emerald-200/50'
    },
    red: {
      default: 'text-red-600 border-red-300 hover:bg-red-50 hover:border-red-400 focus:ring-red-500 hover:shadow-md hover:shadow-red-100/50',
      subtle: 'text-red-600 hover:bg-red-50 hover:text-red-700 hover:shadow-sm',
      bold: 'text-red-700 hover:bg-red-100 hover:text-red-800 border-red-400 hover:border-red-500',
      gradient: 'bg-gradient-to-r from-red-50 to-pink-50 text-red-700 hover:from-red-100 hover:to-pink-100',
      glow: 'text-red-600 border-red-300 hover:bg-red-50 hover:shadow-lg hover:shadow-red-200/50'
    },
    purple: {
      default: 'text-purple-600 border-purple-300 hover:bg-purple-50 hover:border-purple-400 focus:ring-purple-500 hover:shadow-md hover:shadow-purple-100/50',
      subtle: 'text-purple-600 hover:bg-purple-50 hover:text-purple-700 hover:shadow-sm',
      bold: 'text-purple-700 hover:bg-purple-100 hover:text-purple-800 border-purple-400 hover:border-purple-500',
      gradient: 'bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 hover:from-purple-100 hover:to-pink-100',
      glow: 'text-purple-600 border-purple-300 hover:bg-purple-50 hover:shadow-lg hover:shadow-purple-200/50'
    },
    amber: {
      default: 'text-amber-600 border-amber-300 hover:bg-amber-50 hover:border-amber-400 focus:ring-amber-500 hover:shadow-md hover:shadow-amber-100/50',
      subtle: 'text-amber-700 hover:bg-amber-50 hover:text-amber-800 hover:shadow-sm',
      bold: 'text-amber-800 hover:bg-amber-100 hover:text-amber-900 border-amber-400 hover:border-amber-500',
      gradient: 'bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 hover:from-amber-100 hover:to-orange-100',
      glow: 'text-amber-600 border-amber-300 hover:bg-amber-50 hover:shadow-lg hover:shadow-amber-200/50'
    },
    indigo: {
      default: 'text-indigo-600 border-indigo-300 hover:bg-indigo-50 hover:border-indigo-400 focus:ring-indigo-500 hover:shadow-md hover:shadow-indigo-100/50',
      subtle: 'text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 hover:shadow-sm',
      bold: 'text-indigo-700 hover:bg-indigo-100 hover:text-indigo-800 border-indigo-400 hover:border-indigo-500',
      gradient: 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 hover:from-indigo-100 hover:to-purple-100',
      glow: 'text-indigo-600 border-indigo-300 hover:bg-indigo-50 hover:shadow-lg hover:shadow-indigo-200/50'
    },
    rose: {
      default: 'text-rose-600 border-rose-300 hover:bg-rose-50 hover:border-rose-400 focus:ring-rose-500 hover:shadow-md hover:shadow-rose-100/50',
      subtle: 'text-rose-600 hover:bg-rose-50 hover:text-rose-700 hover:shadow-sm',
      bold: 'text-rose-700 hover:bg-rose-100 hover:text-rose-800 border-rose-400 hover:border-rose-500',
      gradient: 'bg-gradient-to-r from-rose-50 to-pink-50 text-rose-700 hover:from-rose-100 hover:to-pink-100',
      glow: 'text-rose-600 border-rose-300 hover:bg-rose-50 hover:shadow-lg hover:shadow-rose-200/50'
    }
  };

  // Get color classes
  const getColorClasses = () => {
    const scheme = colorSchemes[color] || colorSchemes.slate;
    
    if (gradient) {
      return `border ${scheme.gradient}`;
    } else if (glow) {
      return `border ${scheme.glow}`;
    }
    
    switch (variant) {
      case 'subtle':
        return scheme.subtle;
      case 'bold':
        return `border ${scheme.bold}`;
      default:
        return `border ${scheme.default}`;
    }
  };

  // Handle ripple effect
  const createRipple = (event) => {
    if (!ripple) return;
    
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    const newRipple = {
      x,
      y,
      size,
      id: Date.now() + Math.random()
    };

    setRipples(prev => [...prev, newRipple]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);
  };

  const handleClick = (event) => {
    if (disabled || loading) return;
    
    createRipple(event);
    
    if (onClick) {
      onClick(event);
    }
  };

  // Base classes with enhanced styling
  const baseClasses = `
    relative inline-flex items-center justify-center font-medium select-none overflow-hidden
    transition-all duration-300 ease-out backdrop-blur-sm
    focus:outline-none focus:ring-2 focus:ring-offset-2
    ${sizes[size]}
    ${roundedStyles[rounded]}
    ${fullWidth ? 'w-full' : ''}
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    ${animated ? 'transform hover:scale-[1.02] active:scale-[0.98]' : ''}
    ${getColorClasses()}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <button
      className={baseClasses}
      onClick={handleClick}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      disabled={disabled}
      {...props}
    >
      {/* Ripple effects */}
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute bg-current opacity-20 rounded-full animate-ping pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
            transform: 'scale(0)',
            animation: 'ripple 0.6s linear'
          }}
        />
      ))}

      {/* Enhanced loading spinner */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-current bg-opacity-5 backdrop-blur-sm">
          <div className="relative">
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin opacity-70"></div>
            <div className="absolute inset-0 w-4 h-4 border border-current border-b-transparent rounded-full animate-spin opacity-30 animate-reverse"></div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className={`flex items-center ${loading ? 'opacity-0' : ''}`}>
        {icon && iconPosition === 'left' && (
          <span className={`flex-shrink-0 ${iconSizes[size]}`}>
            {Icons[icon] || icon}
          </span>
        )}
        
        <span className="whitespace-nowrap">{children}</span>
        
        {icon && iconPosition === 'right' && (
          <span className={`flex-shrink-0 ${iconSizes[size]}`}>
            {Icons[icon] || icon}
          </span>
        )}
      </div>
    </button>
  );
};

// Floating Action Button Component
const FloatingButton = ({ icon, onClick, color = 'blue', size = 'md' }) => {
  const sizes = {
    sm: 'w-12 h-12',
    md: 'w-14 h-14',
    lg: 'w-16 h-16'
  };

  const iconSizes = {
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-7 h-7'
  };

  return (
    <button
      onClick={onClick}
      className={`
        ${sizes[size]} ${iconSizes[size]}
        fixed bottom-6 right-6 bg-${color}-600 hover:bg-${color}-700 text-white
        rounded-full shadow-2xl shadow-${color}-600/25 hover:shadow-${color}-600/40
        transition-all duration-300 transform hover:scale-110 active:scale-95
        flex items-center justify-center z-50
      `}
    >
      <span className={iconSizes[size]}>
        {Icons[icon] || icon}
      </span>
    </button>
  );
};

// Enhanced Demo Component
const PremiumGhostButtonDemo = () => {
  const [likedItems, setLikedItems] = useState(new Set());
  const [bookmarkedItems, setBookmarkedItems] = useState(new Set());
  const [ratings, setRatings] = useState({});
  const [cartItems, setCartItems] = useState(0);
  const [loadingStates, setLoadingStates] = useState(new Set());
  const [selectedOptions, setSelectedOptions] = useState({
    variant: 'default',
    color: 'blue',
    size: 'md',
    rounded: 'lg'
  });

  const variants = [
    { key: 'default', name: 'Default', desc: 'Clean with subtle borders and refined hover states' },
    { key: 'subtle', name: 'Subtle', desc: 'Minimal design with gentle hover interactions' },
    { key: 'bold', name: 'Bold', desc: 'Strong presence with enhanced borders and colors' }
  ];

  const colors = ['slate', 'blue', 'emerald', 'red', 'purple', 'amber', 'indigo', 'rose'];
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
  const roundedOptions = ['sm', 'md', 'lg', 'xl', '2xl', 'full'];

  // Interactive handlers
  const toggleLike = (id) => {
    setLikedItems(prev => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  const toggleBookmark = (id) => {
    setBookmarkedItems(prev => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  const setRating = (id, rating) => {
    setRatings(prev => ({ ...prev, [id]: rating }));
  };

  const simulateLoading = (id) => {
    setLoadingStates(prev => new Set([...prev, id]));
    setTimeout(() => {
      setLoadingStates(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }, 2000);
  };

  const addToCart = () => {
    setCartItems(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-32 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-32 -left-40 w-80 h-80 bg-gradient-to-tr from-emerald-400/20 to-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold rounded-full shadow-lg">
                ✨ Premium UI Collection
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-6">
              Ghost Button
              <span className="block text-4xl md:text-5xl mt-2">Component Library</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed mb-8">
              Elevate your UI with our premium collection of ghost buttons. Featuring sophisticated hover effects, 
              smooth animations, and modern design patterns that convert visitors into customers.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <GhostButton size="lg" color="blue" icon="play" animated ripple>
                View Live Demo
              </GhostButton>
              <GhostButton size="lg" variant="bold" color="emerald" icon="download">
                Download Package
              </GhostButton>
            </div>
          </div>

          {/* Interactive Playground */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 mb-12 shadow-2xl border border-white/50">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <h2 className="text-2xl font-bold text-slate-900 ml-4">Interactive Playground</h2>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Controls */}
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  {/* Variant Control */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">Variant</label>
                    <div className="space-y-2">
                      {variants.map((variant) => (
                        <button
                          key={variant.key}
                          onClick={() => setSelectedOptions(prev => ({ ...prev, variant: variant.key }))}
                          className={`w-full p-3 rounded-xl border text-left transition-all ${
                            selectedOptions.variant === variant.key
                              ? 'bg-blue-600 text-white border-blue-600 shadow-lg'
                              : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300 hover:bg-blue-50'
                          }`}
                        >
                          <div className="font-medium text-sm">{variant.name}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Size Control */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">Size</label>
                    <div className="grid grid-cols-3 gap-2">
                      {sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedOptions(prev => ({ ...prev, size }))}
                          className={`p-2 rounded-lg border text-xs font-mono transition-all ${
                            selectedOptions.size === size
                              ? 'bg-blue-600 text-white border-blue-600'
                              : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Color Control */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">Color Scheme</label>
                  <div className="grid grid-cols-4 gap-3">
                    {colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedOptions(prev => ({ ...prev, color }))}
                        className={`relative p-3 rounded-xl border transition-all group ${
                          selectedOptions.color === color
                            ? `border-${color}-500 bg-${color}-50 shadow-lg`
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className={`w-6 h-6 rounded-full mx-auto mb-2 bg-gradient-to-r from-${color}-400 to-${color}-600 shadow-sm`}></div>
                        <div className="text-xs capitalize font-medium text-slate-700">{color}</div>
                        {selectedOptions.color === color && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                            <span className="w-3 h-3 text-white">
                              {Icons.check}
                            </span>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Rounded Control */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">Border Radius</label>
                  <div className="flex flex-wrap gap-2">
                    {roundedOptions.map((rounded) => (
                      <button
                        key={rounded}
                        onClick={() => setSelectedOptions(prev => ({ ...prev, rounded }))}
                        className={`px-4 py-2 border text-xs font-mono transition-all ${
                          selectedOptions.rounded === rounded
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300'
                        } ${rounded === 'full' ? 'rounded-full' : `rounded-${rounded}`}`}
                      >
                        {rounded}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Live Preview */}
              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
                <h4 className="font-semibold text-slate-800 mb-6">Live Preview</h4>
                <div className="space-y-6">
                  <div className="flex flex-wrap gap-4">
                    <GhostButton {...selectedOptions}>
                      Default Button
                    </GhostButton>
                    <GhostButton {...selectedOptions} icon="plus">
                      With Icon
                    </GhostButton>
                    <GhostButton {...selectedOptions} icon="external" iconPosition="right">
                      Trailing Icon
                    </GhostButton>
                  </div>
                  
                  <div className="flex flex-wrap gap-4">
                    <GhostButton {...selectedOptions} loading>
                      Loading State
                    </GhostButton>
                    <GhostButton {...selectedOptions} disabled>
                      Disabled State
                    </GhostButton>
                    <GhostButton {...selectedOptions} gradient>
                      Gradient Style
                    </GhostButton>
                  </div>

                  <div className="pt-4">
                    <GhostButton {...selectedOptions} fullWidth icon="download">
                      Full Width Button
                    </GhostButton>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* E-commerce Demo Section */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 mb-12 shadow-2xl border border-white/50">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">E-commerce Integration</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { id: 1, name: 'Premium Headphones', price: 299, image: '🎧', category: 'Audio' },
                { id: 2, name: 'Wireless Speaker', price: 199, image: '🔊', category: 'Audio' },
                { id: 3, name: 'Smart Watch', price: 399, image: '⌚', category: 'Wearables' }
              ].map((product) => (
                <div key={product.id} className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-6 border border-slate-200/50 hover:shadow-xl transition-all duration-300">
                  <div className="text-6xl text-center mb-4">{product.image}</div>
                  <div className="text-sm text-slate-500 mb-1">{product.category}</div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{product.name}</h3>
                  <div className="text-2xl font-bold text-blue-600 mb-4">${product.price}</div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setRating(product.id, star)}
                          className="w-5 h-5 text-amber-400 hover:text-amber-500 transition-colors"
                        >
                          {(ratings[product.id] || 0) >= star ? Icons.starFilled : Icons.star}
                        </button>
                      ))}
                    </div>
                    
                    <GhostButton
                      size="sm"
                      color="red"
                      variant="subtle"
                      icon={likedItems.has(product.id) ? 'heartFilled' : 'heart'}
                      onClick={() => toggleLike(product.id)}
                      animated
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <GhostButton
                        fullWidth
                        color="emerald"
                        variant="bold"
                        icon="shopping"
                        onClick={addToCart}
                        animated
                      >
                        Add to Cart
                      </GhostButton>
                      <GhostButton
                        color="slate"
                        variant="subtle"
                        icon={bookmarkedItems.has(product.id) ? 'bookmark' : 'bookmark'}
                        onClick={() => toggleBookmark(product.id)}
                      />
                    </div>
                    
                    <div className="flex gap-2">
                      <GhostButton
                        size="sm"
                        color="blue"
                        variant="subtle"
                        icon="share"
                        onClick={() => simulateLoading(`share-${product.id}`)}
                        loading={loadingStates.has(`share-${product.id}`)}
                      >
                        Share
                      </GhostButton>
                      <GhostButton
                        size="sm"
                        color="purple"
                        variant="subtle"
                        icon="external"
                        onClick={() => simulateLoading(`view-${product.id}`)}
                        loading={loadingStates.has(`view-${product.id}`)}
                      >
                        Quick View
                      </GhostButton>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Advanced Features Showcase */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 mb-12 shadow-2xl border border-white/50">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Advanced Features</h2>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Ripple Effects */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-100">
                <h3 className="text-xl font-bold text-purple-900 mb-6">Ripple Effects & Animations</h3>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-3">
                    <GhostButton color="purple" ripple animated size="lg">
                      Click for Ripple
                    </GhostButton>
                    <GhostButton color="pink" glow animated size="lg">
                      Glow Effect
                    </GhostButton>
                  </div>
                  <p className="text-sm text-purple-700">
                    Interactive feedback with smooth ripple animations and elegant glow effects.
                  </p>
                </div>
              </div>

              {/* Gradient Styles */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
                <h3 className="text-xl font-bold text-blue-900 mb-6">Gradient & Glass Effects</h3>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-3">
                    <GhostButton color="blue" gradient size="lg">
                      Gradient Style
                    </GhostButton>
                    <GhostButton color="indigo" glow size="lg" className="backdrop-blur-sm">
                      Glass Effect
                    </GhostButton>
                  </div>
                  <p className="text-sm text-blue-700">
                    Modern gradient backgrounds with glassmorphism effects for premium interfaces.
                  </p>
                </div>
              </div>

              {/* Size Variations */}
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 border border-emerald-100">
                <h3 className="text-xl font-bold text-emerald-900 mb-6">Complete Size System</h3>
                <div className="space-y-4">
                  {sizes.map((size) => (
                    <div key={size} className="flex items-center gap-4">
                      <span className="w-8 text-xs font-mono text-emerald-600">{size}</span>
                      <GhostButton size={size} color="emerald" icon="plus">
                        Button {size.toUpperCase()}
                      </GhostButton>
                    </div>
                  ))}
                </div>
              </div>

              {/* Loading States */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-100">
                <h3 className="text-xl font-bold text-amber-900 mb-6">Loading & State Management</h3>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-3">
                    {['Download', 'Process', 'Upload'].map((action, index) => (
                      <GhostButton
                        key={action}
                        color="amber"
                        variant="bold"
                        icon={action.toLowerCase()}
                        loading={loadingStates.has(`demo-${index}`)}
                        onClick={() => simulateLoading(`demo-${index}`)}
                      >
                        {action}
                      </GhostButton>
                    ))}
                  </div>
                  <p className="text-sm text-amber-700">
                    Sophisticated loading states with dual-ring spinners and smooth transitions.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Color Palette Showcase */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 mb-12 shadow-2xl border border-white/50">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Premium Color Palette</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {colors.map((color) => (
                <div key={color} className={`bg-gradient-to-br from-${color}-50 to-${color}-100 rounded-2xl p-6 border border-${color}-200`}>
                  <div className="text-center mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-r from-${color}-400 to-${color}-600 rounded-full mx-auto mb-3 shadow-lg`}></div>
                    <h3 className="font-bold text-slate-800 capitalize">{color}</h3>
                  </div>
                  
                  <div className="space-y-3">
                    {variants.map((variant) => (
                      <GhostButton
                        key={variant.key}
                        variant={variant.key}
                        color={color}
                        size="sm"
                        fullWidth
                        icon="star"
                      >
                        {variant.name}
                      </GhostButton>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Integration Examples */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 mb-12 shadow-2xl border border-white/50">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Real-World Applications</h2>
            
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Navigation Example */}
              <div className="bg-slate-900 rounded-2xl p-6 text-white">
                <h3 className="text-lg font-bold mb-6">Navigation Menu</h3>
                <nav className="space-y-2">
                  {['Home', 'Products', 'About', 'Contact'].map((item) => (
                    <GhostButton
                      key={item}
                      variant="subtle"
                      color="slate"
                      fullWidth
                      className="text-left justify-start text-white hover:bg-white/10 border-white/20"
                    >
                      {item}
                    </GhostButton>
                  ))}
                </nav>
              </div>

              {/* Form Example */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                <h3 className="text-lg font-bold text-blue-900 mb-6">Form Actions</h3>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <GhostButton color="emerald" variant="bold" icon="check" fullWidth>
                      Submit
                    </GhostButton>
                    <GhostButton color="slate" variant="subtle">
                      Reset
                    </GhostButton>
                  </div>
                  <div className="flex gap-2">
                    <GhostButton color="blue" variant="subtle" size="sm">
                      Save Draft
                    </GhostButton>
                    <GhostButton color="purple" variant="subtle" size="sm">
                      Preview
                    </GhostButton>
                  </div>
                </div>
              </div>

              {/* Social Actions */}
              <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-6 border border-rose-100">
                <h3 className="text-lg font-bold text-rose-900 mb-6">Social Interactions</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <GhostButton color="red" variant="subtle" icon="heart" size="sm">
                      Like
                    </GhostButton>
                    <GhostButton color="blue" variant="subtle" icon="share" size="sm">
                      Share
                    </GhostButton>
                    <GhostButton color="purple" variant="subtle" icon="bookmark" size="sm">
                      Save
                    </GhostButton>
                  </div>
                  <GhostButton color="rose" variant="bold" fullWidth icon="plus">
                    Follow
                  </GhostButton>
                </div>
              </div>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="text-center bg-gradient-to-r from-slate-900 to-blue-900 rounded-3xl p-12 text-white shadow-2xl">
            <h2 className="text-4xl font-bold mb-4">Ready to Elevate Your UI?</h2>
            <p className="text-xl text-slate-200 mb-8 max-w-2xl mx-auto">
              Get instant access to our complete ghost button library with full source code, 
              documentation, and commercial license.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <GhostButton 
                size="xl" 
                color="emerald" 
                variant="bold" 
                icon="download"
                className="bg-white text-emerald-600 hover:bg-emerald-50 border-white"
              >
                Download Now - $49
              </GhostButton>
              <GhostButton 
                size="xl" 
                variant="subtle" 
                icon="external"
                className="text-white hover:bg-white/10 border-white/30"
              >
                View Documentation
              </GhostButton>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <FloatingButton 
        icon="shopping" 
        onClick={() => alert(`Cart items: ${cartItems}`)}
        color="emerald"
      />

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
        .animate-reverse {
          animation-direction: reverse;
        }
      `}</style>
    </div>
  );
};

export default PremiumGhostButtonDemo;