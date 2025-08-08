import React, { useState } from 'react';

// Icon components
const Icons = {
  heart: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  heartFilled: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
    </svg>
  ),
  download: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  share: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
    </svg>
  ),
  play: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M8 5v14l11-7z"/>
    </svg>
  ),
  pause: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
    </svg>
  ),
  plus: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  ),
  edit: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  ),
  trash: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  ),
  external: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  )
};

// Main Ghost Button Component
const ButtonGhost = ({
  children,
  variant = 'default',
  size = 'md',
  color = 'gray',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  rounded = 'md',
  animated = true,
  ripple = false,
  className = '',
  onClick,
  ...props
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [ripples, setRipples] = useState([]);

  // Size variants
  const sizes = {
    xs: 'px-2 py-1 text-xs min-h-[24px]',
    sm: 'px-3 py-1.5 text-sm min-h-[32px]',
    md: 'px-4 py-2 text-sm min-h-[36px]',
    lg: 'px-6 py-3 text-base min-h-[44px]',
    xl: 'px-8 py-4 text-lg min-h-[52px]'
  };

  // Rounded variants
  const roundedStyles = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full'
  };

  // Color schemes for ghost buttons
  const colorSchemes = {
    gray: {
      default: 'text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400 focus:ring-gray-500',
      subtle: 'text-gray-600 hover:bg-gray-100 hover:text-gray-800',
      bold: 'text-gray-800 hover:bg-gray-200 hover:text-gray-900 border-gray-400'
    },
    blue: {
      default: 'text-blue-600 border-blue-300 hover:bg-blue-50 hover:border-blue-400 focus:ring-blue-500',
      subtle: 'text-blue-500 hover:bg-blue-50 hover:text-blue-700',
      bold: 'text-blue-700 hover:bg-blue-100 hover:text-blue-800 border-blue-400'
    },
    green: {
      default: 'text-green-600 border-green-300 hover:bg-green-50 hover:border-green-400 focus:ring-green-500',
      subtle: 'text-green-500 hover:bg-green-50 hover:text-green-700',
      bold: 'text-green-700 hover:bg-green-100 hover:text-green-800 border-green-400'
    },
    red: {
      default: 'text-red-600 border-red-300 hover:bg-red-50 hover:border-red-400 focus:ring-red-500',
      subtle: 'text-red-500 hover:bg-red-50 hover:text-red-700',
      bold: 'text-red-700 hover:bg-red-100 hover:text-red-800 border-red-400'
    },
    purple: {
      default: 'text-purple-600 border-purple-300 hover:bg-purple-50 hover:border-purple-400 focus:ring-purple-500',
      subtle: 'text-purple-500 hover:bg-purple-50 hover:text-purple-700',
      bold: 'text-purple-700 hover:bg-purple-100 hover:text-purple-800 border-purple-400'
    },
    yellow: {
      default: 'text-yellow-600 border-yellow-300 hover:bg-yellow-50 hover:border-yellow-400 focus:ring-yellow-500',
      subtle: 'text-yellow-600 hover:bg-yellow-50 hover:text-yellow-700',
      bold: 'text-yellow-700 hover:bg-yellow-100 hover:text-yellow-800 border-yellow-400'
    },
    indigo: {
      default: 'text-indigo-600 border-indigo-300 hover:bg-indigo-50 hover:border-indigo-400 focus:ring-indigo-500',
      subtle: 'text-indigo-500 hover:bg-indigo-50 hover:text-indigo-700',
      bold: 'text-indigo-700 hover:bg-indigo-100 hover:text-indigo-800 border-indigo-400'
    },
    pink: {
      default: 'text-pink-600 border-pink-300 hover:bg-pink-50 hover:border-pink-400 focus:ring-pink-500',
      subtle: 'text-pink-500 hover:bg-pink-50 hover:text-pink-700',
      bold: 'text-pink-700 hover:bg-pink-100 hover:text-pink-800 border-pink-400'
    }
  };

  // Get color classes based on variant
  const getColorClasses = () => {
    const scheme = colorSchemes[color] || colorSchemes.gray;
    
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
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    const newRipple = {
      x,
      y,
      size,
      id: Date.now()
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

  // Base classes
  const baseClasses = `
    relative inline-flex items-center justify-center font-medium select-none overflow-hidden
    transition-all duration-200 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-2
    ${sizes[size]}
    ${roundedStyles[rounded]}
    ${fullWidth ? 'w-full' : ''}
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    ${animated ? 'transform hover:scale-105 active:scale-95' : ''}
    ${getColorClasses()}
    ${className}
  `.trim();

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
          className="absolute bg-current opacity-30 rounded-full animate-ping"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
          }}
        />
      ))}

      {/* Loading spinner */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin opacity-60"></div>
        </div>
      )}

      {/* Content */}
      <div className={`flex items-center gap-2 ${loading ? 'opacity-0' : ''}`}>
        {icon && iconPosition === 'left' && (
          <span className="flex-shrink-0">
            {Icons[icon] || icon}
          </span>
        )}
        
        <span>{children}</span>
        
        {icon && iconPosition === 'right' && (
          <span className="flex-shrink-0">
            {Icons[icon] || icon}
          </span>
        )}
      </div>
    </button>
  );
};

// Interactive Demo Component
const ButtonGhostDemo = () => {
  const [likedItems, setLikedItems] = useState(new Set());
  const [isPlaying, setIsPlaying] = useState(false);
  const [loadingStates, setLoadingStates] = useState(new Set());
  const [selectedVariant, setSelectedVariant] = useState('default');
  const [selectedColor, setSelectedColor] = useState('blue');

  const variants = [
    { key: 'default', name: 'Default', desc: 'Clean with borders' },
    { key: 'subtle', name: 'Subtle', desc: 'Minimal hover effect' },
    { key: 'bold', name: 'Bold', desc: 'Strong borders & colors' }
  ];

  const colors = ['gray', 'blue', 'green', 'red', 'purple', 'yellow', 'indigo', 'pink'];

  const toggleLike = (id) => {
    setLikedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Premium Ghost Buttons
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Elegant, subtle buttons with sophisticated hover effects. Perfect for secondary actions and modern interfaces.
          </p>
        </div>

        {/* Interactive Playground */}
        <div className="bg-white rounded-2xl p-6 md:p-8 mb-8 shadow-xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Interactive Playground</h2>
          
          <div className="space-y-6">
            {/* Variant Controls */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Variant:</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {variants.map((variant) => (
                  <button
                    key={variant.key}
                    onClick={() => setSelectedVariant(variant.key)}
                    className={`p-4 rounded-lg border transition-all text-left ${
                      selectedVariant === variant.key
                        ? 'bg-blue-600 text-white border-blue-600 shadow-lg'
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="font-semibold">{variant.name}</div>
                    <div className="text-sm opacity-80">{variant.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Color Controls */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Color:</h3>
              <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`p-3 rounded-lg border-2 transition-all capitalize ${
                      selectedColor === color
                        ? `border-${color}-500 bg-${color}-50`
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full mx-auto mb-1 bg-${color}-500`}></div>
                    <div className="text-xs">{color}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Live Preview */}
            <div className="p-6 bg-gray-50 rounded-xl">
              <h4 className="font-semibold text-gray-700 mb-4">Live Preview</h4>
              <div className="flex flex-wrap gap-4">
                <ButtonGhost variant={selectedVariant} color={selectedColor}>
                  Default Button
                </ButtonGhost>
                <ButtonGhost variant={selectedVariant} color={selectedColor} icon="plus">
                  With Icon
                </ButtonGhost>
                <ButtonGhost variant={selectedVariant} color={selectedColor} icon="external" iconPosition="right">
                  Trailing Icon
                </ButtonGhost>
                <ButtonGhost variant={selectedVariant} color={selectedColor} disabled>
                  Disabled
                </ButtonGhost>
              </div>
            </div>
          </div>
        </div>

        {/* Size Variations */}
        <div className="bg-white rounded-2xl p-6 md:p-8 mb-8 shadow-xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Size Variations</h2>
          
          <div className="space-y-6">
            {['xs', 'sm', 'md', 'lg', 'xl'].map((size) => (
              <div key={size} className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="w-16 text-sm font-mono text-gray-600">{size}</div>
                <div className="flex flex-wrap items-center gap-4">
                  <ButtonGhost size={size} color="blue">
                    Ghost Button
                  </ButtonGhost>
                  <ButtonGhost size={size} color="green" icon="plus">
                    Add Item
                  </ButtonGhost>
                  <ButtonGhost size={size} color="red" icon="trash">
                    Delete
                  </ButtonGhost>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Examples */}
        <div className="bg-white rounded-2xl p-6 md:p-8 mb-8 shadow-xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Interactive Examples</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Like Button */}
            <div className="p-6 bg-red-50 rounded-xl">
              <h3 className="text-lg font-semibold text-red-900 mb-4">Like Button</h3>
              <div className="space-y-3">
                {['Article 1', 'Article 2', 'Article 3'].map((item, index) => (
                  <div key={item} className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <span className="text-gray-700">{item}</span>
                    <ButtonGhost
                      color="red"
                      variant="subtle"
                      icon={likedItems.has(index) ? 'heartFilled' : 'heart'}
                      onClick={() => toggleLike(index)}
                      animated={true}
                    >
                      {likedItems.has(index) ? 'Liked' : 'Like'}
                    </ButtonGhost>
                  </div>
                ))}
              </div>
            </div>

            {/* Loading States */}
            <div className="p-6 bg-blue-50 rounded-xl">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Loading States</h3>
              <div className="space-y-3">
                {['Download', 'Share', 'Export'].map((action, index) => (
                  <div key={action} className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <span className="text-gray-700">{action} File</span>
                    <ButtonGhost
                      color="blue"
                      variant="default"
                      icon={action.toLowerCase()}
                      loading={loadingStates.has(index)}
                      onClick={() => simulateLoading(index)}
                    >
                      {action}
                    </ButtonGhost>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Variant Showcase */}
        <div className="bg-white rounded-2xl p-6 md:p-8 mb-8 shadow-xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Variant Showcase</h2>
          
          <div className="space-y-8">
            {variants.map((variant) => (
              <div key={variant.key} className="p-6 bg-gray-50 rounded-xl">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">{variant.name}</h3>
                  <span className="text-sm text-gray-600 mt-1 md:mt-0">{variant.desc}</span>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  {colors.slice(0, 4).map((color) => (
                    <ButtonGhost
                      key={color}
                      variant={variant.key}
                      color={color}
                      icon="plus"
                    >
                      {color.charAt(0).toUpperCase() + color.slice(1)}
                    </ButtonGhost>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Special Features */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Special Features</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Ripple Effect */}
            <div className="p-6 bg-purple-50 rounded-xl">
              <h3 className="text-lg font-semibold text-purple-900 mb-4">Ripple Effect</h3>
              <div className="space-y-3">
                <ButtonGhost color="purple" ripple={true} size="lg">
                  Click Me!
                </ButtonGhost>
                <p className="text-sm text-purple-700">Click to see the ripple animation</p>
              </div>
            </div>

            {/* Rounded Variations */}
            <div className="p-6 bg-green-50 rounded-xl">
              <h3 className="text-lg font-semibold text-green-900 mb-4">Rounded Styles</h3>
              <div className="flex flex-wrap gap-3">
                <ButtonGhost color="green" rounded="none" size="sm">None</ButtonGhost>
                <ButtonGhost color="green" rounded="sm" size="sm">Small</ButtonGhost>
                <ButtonGhost color="green" rounded="md" size="sm">Medium</ButtonGhost>
                <ButtonGhost color="green" rounded="lg" size="sm">Large</ButtonGhost>
                <ButtonGhost color="green" rounded="full" size="sm">Full</ButtonGhost>
              </div>
            </div>

            {/* Media Controls */}
            <div className="p-6 bg-indigo-50 rounded-xl">
              <h3 className="text-lg font-semibold text-indigo-900 mb-4">Media Controls</h3>
              <div className="flex gap-3">
                <ButtonGhost
                  color="indigo"
                  variant="bold"
                  icon={isPlaying ? 'pause' : 'play'}
                  onClick={() => setIsPlaying(!isPlaying)}
                  animated={true}
                >
                  {isPlaying ? 'Pause' : 'Play'}
                </ButtonGhost>
                <ButtonGhost color="indigo" variant="subtle" icon="download">
                  Download
                </ButtonGhost>
                <ButtonGhost color="indigo" variant="subtle" icon="share">
                  Share
                </ButtonGhost>
              </div>
            </div>

            {/* Full Width */}
            <div className="p-6 bg-yellow-50 rounded-xl">
              <h3 className="text-lg font-semibold text-yellow-800 mb-4">Full Width</h3>
              <div className="space-y-3">
                <ButtonGhost color="yellow" variant="bold" fullWidth>
                  Full Width Button
                </ButtonGhost>
                <ButtonGhost color="yellow" variant="subtle" fullWidth icon="edit">
                  With Icon
                </ButtonGhost>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ButtonGhostDemo;