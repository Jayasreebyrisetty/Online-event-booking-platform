import { useEffect, useMemo, useState } from 'react';

function DataViewer() {
  const [storageData, setStorageData] = useState({});

  useEffect(() => {
    const entries = {};
    for (let i = 0; i < localStorage.length; i += 1) {
      const key = localStorage.key(i);
      try {
        entries[key] = JSON.parse(localStorage.getItem(key));
      } catch {
        entries[key] = localStorage.getItem(key);
      }
    }
    setStorageData(entries);
  }, []);

  const keys = useMemo(() => Object.keys(storageData), [storageData]);

  return (
    <div className="data-viewer card-panel">
      <h2>Local Storage Viewer</h2>
      <p>View the browser storage data used by the application.</p>

      {keys.length ? (
        <div className="storage-list">
          {keys.map((key) => (
            <div key={key} className="storage-item">
              <h3>{key}</h3>
              <pre>{JSON.stringify(storageData[key], null, 2)}</pre>
            </div>
          ))}
        </div>
      ) : (
        <p className="muted">No local storage data available yet.</p>
      )}
    </div>
  );
}

export default DataViewer;
