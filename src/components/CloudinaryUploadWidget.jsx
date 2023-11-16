/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react';

const CloudinaryScriptContext = createContext();

function CloudinaryUploadWidget({ uwConfig, setPublicId, setFileUrl }) {
  const [loaded, setLoaded] = useState(false);
  const [cloudinaryWidget, setCloudinaryWidget] = useState(null);

  useEffect(() => {
    // Check if the script is already loaded
    if (!loaded) {
      const uwScript = document.getElementById('uw');
      if (!uwScript) {
        // If not loaded, create and load the script
        const script = document.createElement('script');
        script.async = true;
        script.id = 'uw';
        script.src = 'https://upload-widget.cloudinary.com/global/all.js';
        script.addEventListener('load', () => setLoaded(true));
        document.body.appendChild(script);
      } else {
        // If already loaded, update the state
        setLoaded(true);
      }
    }

    return () => {
      // Cleanup function: destroy the Cloudinary widget when the component unmounts
      cloudinaryWidget?.destroy();
    };
  }, [loaded, cloudinaryWidget]);

  const initializeCloudinaryWidget = () => {
    if (loaded && !cloudinaryWidget) {
      const newWidget = window.cloudinary.createUploadWidget(uwConfig, (error, result) => {
        if (!error && result && result.event === 'success') {
          setPublicId(result.info.public_id);
          setFileUrl(result.info.secure_url);
        }
      });

      setCloudinaryWidget(newWidget);

      document.getElementById('upload_widget').addEventListener('click', () => {
        newWidget.open();
      });
    }
  };

  return (
    <CloudinaryScriptContext.Provider value={{ loaded }}>
      <button id="upload_widget" className="cloudinary-button" onClick={initializeCloudinaryWidget}>
        Upload
      </button>
    </CloudinaryScriptContext.Provider>
  );
}

export default CloudinaryUploadWidget;
export { CloudinaryScriptContext };
