import React, { useState } from 'react';

// Individual accordion item component
const AccordionItem = ({ title, children, isOpen, onToggle }) => (
  <div className="border border-gray-300 rounded-lg mb-2 overflow-hidden">
    <button
      onClick={onToggle}
      className="w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 flex justify-between items-center text-left transition-colors duration-200"
    >
      <span className="font-semibold text-gray-800">{title}</span>
      <svg
        className={`w-5 h-5 text-gray-600 transform transition-transform duration-200 ${
          isOpen ? 'rotate-180' : 'rotate-0'
        }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>
    <div
      className={`overflow-hidden transition-all duration-300 ease-in-out ${
        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}
    >
      <div className="p-4 bg-white border-t border-gray-200">
        {children}
      </div>
    </div>
  </div>
);

// Main accordion component with multiple items
const Accordion = () => {
  const [openItems, setOpenItems] = useState(new Set());

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  const accordionData = [
    {
      title: "What is React?",
      content: "React is a JavaScript library for building user interfaces, particularly web applications. It was developed by Facebook and allows developers to create reusable UI components and manage application state efficiently."
    },
    {
      title: "How does state management work?",
      content: "State management in React involves controlling and updating the data that components need to render. You can use hooks like useState for local state, or more complex solutions like Redux or Context API for global state management."
    },
    {
      title: "What are React hooks?",
      content: "React hooks are functions that let you use state and other React features in functional components. Common hooks include useState, useEffect, useContext, and many others. They were introduced in React 16.8 to simplify component logic."
    }
  ];

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">FAQ Accordion</h1>
      <div className="space-y-2">
        {accordionData.map((item, index) => (
          <AccordionItem
            key={index}
            title={item.title}
            isOpen={openItems.has(index)}
            onToggle={() => toggleItem(index)}
          >
            <p className="text-gray-700 leading-relaxed">{item.content}</p>
          </AccordionItem>
        ))}
      </div>
    </div>
  );
};

export default Accordion;