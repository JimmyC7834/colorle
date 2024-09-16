import {useState, useEffect} from 'react';

interface Tab {
  id: string;
  label: string;
  content: JSX.Element;
}

interface ResponsiveTabsLayoutProps {
  tabs: Tab[];
}

const ResponsiveTabsLayout: React.FC<ResponsiveTabsLayoutProps> = ({tabs}) => {
  const [activeTab, setActiveTab] = useState<number>(0); // Store active tab index
  const [isRowLayout, setIsRowLayout] = useState<boolean>(false);

  // Check window size to determine layout (row or single tab with navigation)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 720) {
        setIsRowLayout(true);
      } else {
        setIsRowLayout(false);
      }
    };

    handleResize(); // Set initial state
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePrevTab = () => {
    setActiveTab((prev) => (prev === 0 ? tabs.length - 1 : prev - 1));
  };

  const handleNextTab = () => {
    setActiveTab((prev) => (prev === tabs.length - 1 ? 0 : prev + 1));
  };

  return (
    <div>
      {isRowLayout ? (
        // Row layout for larger screens
        <div className="flex gap-10 p-3">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className="flex-1">
              {tab.content}
            </div>
          ))}
        </div>
      ) : (
        // Single tab with navigation for smaller screens
        <div className="flex items-center">
          {/* Previous Button */}
          <button
            onClick={handlePrevTab}
            style={{cursor: 'pointer'}}
            className="mr-5 text-gray-500">
            {"◀"}
          </button>

          {/* Active Tab Content */}
          <div className="flex-1">
            {tabs[activeTab].content}
          </div>

          {/* Next Button */}
          <button
            onClick={handleNextTab}
            style={{cursor: 'pointer'}}
            className="ml-5 text-gray-500">
            {"▶"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ResponsiveTabsLayout;
