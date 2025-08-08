import React, { useState } from 'react';

// Icon components for breadcrumbs
const Icons = {
  home: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
    </svg>
  ),
  folder: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
      <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
    </svg>
  ),
  document: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
    </svg>
  ),
  chevronRight: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
    </svg>
  ),
  slash: (
    <span className="text-gray-400 font-light">/</span>
  ),
  dot: (
    <span className="text-gray-400">•</span>
  ),
  arrow: (
    <span className="text-gray-400">→</span>
  )
};

// Main Breadcrumb Component
const Breadcrumb = ({
  items = [],
  separator = 'chevronRight',
  variant = 'default',
  maxItems = 4,
  onItemClick
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Process items for collapsing
  let displayItems = [...items];
  const shouldCollapse = items.length > maxItems && !isExpanded;
  
  if (shouldCollapse) {
    const firstItem = items[0];
    const lastItems = items.slice(-2);
    displayItems = [firstItem, { label: '...', isEllipsis: true }, ...lastItems];
  }

  const getVariantClasses = (isLast, isEllipsis = false) => {
    if (isEllipsis) {
      return 'px-3 py-1.5 text-gray-500 hover:text-gray-700 cursor-pointer transition-colors';
    }

    const baseClasses = 'px-3 py-1.5 transition-all duration-200 flex items-center gap-2';
    
    switch (variant) {
      case 'pills':
        return `${baseClasses} rounded-full ${
          isLast 
            ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25' 
            : 'bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-700 cursor-pointer'
        }`;
      case 'underline':
        return `${baseClasses} ${
          isLast 
            ? 'text-blue-600 border-b-2 border-blue-600 font-semibold' 
            : 'text-gray-600 hover:text-blue-600 border-b-2 border-transparent hover:border-blue-300 cursor-pointer'
        }`;
      case 'buttons':
        return `${baseClasses} rounded-lg border ${
          isLast 
            ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-600/25 font-semibold' 
            : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300 hover:bg-blue-50 cursor-pointer shadow-sm'
        }`;
      case 'gradient':
        return `${baseClasses} rounded-lg ${
          isLast 
            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-600/25 font-semibold' 
            : 'text-gray-700 hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 hover:text-blue-700 cursor-pointer'
        }`;
      case 'minimal':
        return `${baseClasses} ${
          isLast 
            ? 'text-gray-900 font-bold' 
            : 'text-gray-600 hover:text-gray-900 cursor-pointer'
        }`;
      default:
        return `${baseClasses} ${
          isLast 
            ? 'text-gray-900 font-semibold' 
            : 'text-gray-600 hover:text-blue-600 cursor-pointer'
        }`;
    }
  };

  const handleItemClick = (item, index) => {
    if (item.isEllipsis) {
      setIsExpanded(true);
      return;
    }
    
    if (index < displayItems.length - 1 && onItemClick) {
      onItemClick(item);
    }
  };

  return (
    <nav aria-label="Breadcrumb" className="w-full">
      <ol className="flex items-center flex-wrap gap-1">
        {displayItems.map((item, index) => {
          const isLast = index === displayItems.length - 1;
          
          return (
            <React.Fragment key={item.path || index}>
              <li>
                <div
                  className={getVariantClasses(isLast, item.isEllipsis)}
                  onClick={() => handleItemClick(item, index)}
                >
                  {item.icon && Icons[item.icon]}
                  <span>{item.label}</span>
                </div>
              </li>
              
              {!isLast && (
                <li className="text-gray-400 px-1">
                  {Icons[separator]}
                </li>
              )}
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

// Demo Component
const BreadcrumbDemo = () => {
  const [activeDemo, setActiveDemo] = useState('ecommerce');
  const [selectedVariant, setSelectedVariant] = useState('default');
  const [currentPath, setCurrentPath] = useState('Product Details');

  const demoData = {
    ecommerce: [
      { label: 'Home', path: '/', icon: 'home' },
      { label: 'Electronics', path: '/electronics', icon: 'folder' },
      { label: 'Smartphones', path: '/electronics/smartphones', icon: 'folder' },
      { label: 'iPhone 15', path: '/electronics/smartphones/iphone-15', icon: 'document' }
    ],
    admin: [
      { label: 'Dashboard', path: '/dashboard', icon: 'home' },
      { label: 'Analytics', path: '/dashboard/analytics', icon: 'folder' },
      { label: 'Reports', path: '/dashboard/analytics/reports', icon: 'folder' },
      { label: 'Monthly', path: '/dashboard/analytics/reports/monthly', icon: 'document' }
    ],
    docs: [
      { label: 'Docs', path: '/docs', icon: 'home' },
      { label: 'Getting Started', path: '/docs/getting-started', icon: 'folder' },
      { label: 'Installation', path: '/docs/getting-started/installation', icon: 'document' }
    ],
    deep: [
      { label: 'Home', path: '/', icon: 'home' },
      { label: 'Level 1', path: '/1', icon: 'folder' },
      { label: 'Level 2', path: '/1/2', icon: 'folder' },
      { label: 'Level 3', path: '/1/2/3', icon: 'folder' },
      { label: 'Level 4', path: '/1/2/3/4', icon: 'folder' },
      { label: 'Level 5', path: '/1/2/3/4/5', icon: 'folder' },
      { label: 'Current Page', path: '/1/2/3/4/5/current', icon: 'document' }
    ]
  };

  const variants = [
    { key: 'default', name: 'Default', desc: 'Clean & minimal' },
    { key: 'pills', name: 'Pills', desc: 'Rounded design' },
    { key: 'underline', name: 'Underline', desc: 'Elegant borders' },
    { key: 'buttons', name: 'Buttons', desc: 'Button style' },
    { key: 'gradient', name: 'Gradient', desc: 'Modern gradients' },
    { key: 'minimal', name: 'Minimal', desc: 'Text only' }
  ];

  const separators = [
    { key: 'chevronRight', name: 'Chevron', symbol: '›' },
    { key: 'slash', name: 'Slash', symbol: '/' },
    { key: 'dot', name: 'Dot', symbol: '•' },
    { key: 'arrow', name: 'Arrow', symbol: '→' }
  ];

  const handleBreadcrumbClick = (item) => {
    setCurrentPath(item.label);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Premium Breadcrumbs
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Beautiful, interactive breadcrumb navigation with 6 styles, smart collapsing, and responsive design.
          </p>
        </div>

        {/* Interactive Demo */}
        <div className="bg-white rounded-2xl p-6 md:p-8 mb-8 shadow-xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Interactive Demo</h2>
          
          {/* Controls */}
          <div className="space-y-6">
            {/* Path Selection */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Choose Path:</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {Object.keys(demoData).map((key) => (
                  <button
                    key={key}
                    onClick={() => setActiveDemo(key)}
                    className={`p-3 rounded-lg border transition-all ${
                      activeDemo === key
                        ? 'bg-blue-600 text-white border-blue-600 shadow-lg'
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="font-medium capitalize">{key}</div>
                    <div className="text-xs opacity-75">{demoData[key].length} items</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Variant Selection */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Style:</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {variants.map((variant) => (
                  <button
                    key={variant.key}
                    onClick={() => setSelectedVariant(variant.key)}
                    className={`p-3 rounded-lg border transition-all ${
                      selectedVariant === variant.key
                        ? 'bg-purple-600 text-white border-purple-600 shadow-lg'
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="font-medium">{variant.name}</div>
                    <div className="text-xs opacity-75">{variant.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Live Preview */}
            <div className="p-6 bg-gray-50 rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium text-gray-700">Live Preview</h4>
                <span className="text-sm text-gray-500">Current: {currentPath}</span>
              </div>
              <Breadcrumb
                items={demoData[activeDemo]}
                variant={selectedVariant}
                onItemClick={handleBreadcrumbClick}
              />
            </div>
          </div>
        </div>

        {/* Style Showcase */}
        <div className="bg-white rounded-2xl p-6 md:p-8 mb-8 shadow-xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Style Showcase</h2>
          
          <div className="space-y-8">
            {variants.map((variant) => (
              <div key={variant.key} className="p-6 bg-gray-50 rounded-xl">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">{variant.name}</h3>
                  <span className="text-sm text-gray-600 mt-1 md:mt-0">{variant.desc}</span>
                </div>
                <Breadcrumb
                  items={demoData.admin}
                  variant={variant.key}
                  onItemClick={handleBreadcrumbClick}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Separator Options */}
        <div className="bg-white rounded-2xl p-6 md:p-8 mb-8 shadow-xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Separator Options</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {separators.map((sep) => (
              <div key={sep.key} className="p-6 bg-gray-50 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-800">{sep.name}</h3>
                  <span className="text-2xl font-mono text-gray-400">{sep.symbol}</span>
                </div>
                <Breadcrumb
                  items={demoData.ecommerce.slice(0, 3)}
                  separator={sep.key}
                  variant="pills"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Smart Features */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Smart Features</h2>
          
          <div className="space-y-8">
            {/* Collapsing */}
            <div className="p-6 bg-blue-50 rounded-xl">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">
                Smart Collapsing
              </h3>
              <p className="text-blue-700 mb-4 text-sm">
                Long paths automatically collapse with expandable "..." - try clicking it!
              </p>
              <Breadcrumb
                items={demoData.deep}
                variant="gradient"
                maxItems={4}
                onItemClick={handleBreadcrumbClick}
              />
            </div>

            {/* Responsive */}
            <div className="p-6 bg-green-50 rounded-xl">
              <h3 className="text-lg font-semibold text-green-900 mb-3">
                Fully Responsive
              </h3>
              <p className="text-green-700 mb-4 text-sm">
                Adapts beautifully to any screen size with flexible wrapping.
              </p>
              <Breadcrumb
                items={demoData.ecommerce}
                variant="buttons"
                onItemClick={handleBreadcrumbClick}
              />
            </div>

            {/* Interactive */}
            <div className="p-6 bg-purple-50 rounded-xl">
              <h3 className="text-lg font-semibold text-purple-900 mb-3">
                Interactive Navigation
              </h3>
              <p className="text-purple-700 mb-4 text-sm">
                Click any breadcrumb (except the last one) to navigate back.
              </p>
              <Breadcrumb
                items={demoData.admin}
                variant="underline"
                onItemClick={handleBreadcrumbClick}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreadcrumbDemo;