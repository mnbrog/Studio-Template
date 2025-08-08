import React, { useState } from 'react';

// Icon components for different alert types
const Icons = {
  success: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  ),
  error: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
    </svg>
  ),
  warning: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
  ),
  info: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
    </svg>
  )
};

// Close icon
const CloseIcon = (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
  </svg>
);

// Alert type configurations
const alertStyles = {
  success: {
    container: "bg-green-50 border-green-200 text-green-800",
    icon: "text-green-500",
    button: "text-green-500 hover:text-green-700 hover:bg-green-100"
  },
  error: {
    container: "bg-red-50 border-red-200 text-red-800",
    icon: "text-red-500",
    button: "text-red-500 hover:text-red-700 hover:bg-red-100"
  },
  warning: {
    container: "bg-yellow-50 border-yellow-200 text-yellow-800",
    icon: "text-yellow-500",
    button: "text-yellow-500 hover:text-yellow-700 hover:bg-yellow-100"
  },
  info: {
    container: "bg-blue-50 border-blue-200 text-blue-800",
    icon: "text-blue-500",
    button: "text-blue-500 hover:text-blue-700 hover:bg-blue-100"
  }
};

// Individual Alert component
const AlertItem = ({ type, title, message, onClose, dismissible = true }) => {
  const styles = alertStyles[type];

  return (
    <div className={`border rounded-lg p-4 mb-4 transition-all duration-300 ${styles.container}`}>
      <div className="flex items-start">
        <div className={`flex-shrink-0 ${styles.icon}`}>
          {Icons[type]}
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-semibold">{title}</h3>
          {message && <p className="mt-1 text-sm opacity-90">{message}</p>}
        </div>
        {dismissible && (
          <button
            onClick={onClose}
            className={`flex-shrink-0 ml-4 p-1 rounded-md transition-colors ${styles.button}`}
          >
            {CloseIcon}
          </button>
        )}
      </div>
    </div>
  );
};

// Main Alert component with examples
const Alert = () => {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'success',
      title: 'Success!',
      message: 'Your changes have been saved successfully.',
      dismissible: true
    },
    {
      id: 2,
      type: 'error',
      title: 'Error occurred',
      message: 'There was a problem processing your request. Please try again.',
      dismissible: true
    },
    {
      id: 3,
      type: 'warning',
      title: 'Warning',
      message: 'This action cannot be undone. Please review before proceeding.',
      dismissible: true
    },
    {
      id: 4,
      type: 'info',
      title: 'Information',
      message: 'New features are now available in your dashboard.',
      dismissible: true
    }
  ]);

  const [showDemo, setShowDemo] = useState(false);

  const removeAlert = (id) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  const addAlert = (type) => {
    const messages = {
      success: 'Operation completed successfully!',
      error: 'An error occurred while processing.',
      warning: 'Please review this important information.',
      info: 'Here\'s some useful information for you.'
    };

    const newAlert = {
      id: Date.now(),
      type,
      title: type.charAt(0).toUpperCase() + type.slice(1),
      message: messages[type],
      dismissible: true
    };

    setAlerts([...alerts, newAlert]);
  };

  const resetAlerts = () => {
    setAlerts([
      {
        id: 1,
        type: 'success',
        title: 'Success!',
        message: 'Your changes have been saved successfully.',
        dismissible: true
      },
      {
        id: 2,
        type: 'error',
        title: 'Error occurred',
        message: 'There was a problem processing your request. Please try again.',
        dismissible: true
      },
      {
        id: 3,
        type: 'warning',
        title: 'Warning',
        message: 'This action cannot be undone. Please review before proceeding.',
        dismissible: true
      },
      {
        id: 4,
        type: 'info',
        title: 'Information',
        message: 'New features are now available in your dashboard.',
        dismissible: true
      }
    ]);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Alert Components</h1>
      
      {/* Control buttons */}
      <div className="mb-6 flex flex-wrap gap-2 justify-center">
        <button
          onClick={() => setShowDemo(!showDemo)}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          {showDemo ? 'Hide' : 'Show'} Controls
        </button>
      </div>

      {showDemo && (
        <div className="mb-6 p-4 bg-white rounded-lg border">
          <h2 className="text-lg font-semibold mb-3">Add New Alerts</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              onClick={() => addAlert('success')}
              className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              Add Success
            </button>
            <button
              onClick={() => addAlert('error')}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              Add Error
            </button>
            <button
              onClick={() => addAlert('warning')}
              className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
            >
              Add Warning
            </button>
            <button
              onClick={() => addAlert('info')}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Add Info
            </button>
          </div>
          <button
            onClick={resetAlerts}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
          >
            Reset All
          </button>
        </div>
      )}

      {/* Alert list */}
      <div>
        {alerts.length > 0 ? (
          alerts.map((alert) => (
            <AlertItem
              key={alert.id}
              type={alert.type}
              title={alert.title}
              message={alert.message}
              onClose={() => removeAlert(alert.id)}
              dismissible={alert.dismissible}
            />
          ))
        ) : (
          <div className="text-center text-gray-500 py-8">
            No alerts to display. Use the controls above to add some!
          </div>
        )}
      </div>
    </div>
  );
};

export default Alert;