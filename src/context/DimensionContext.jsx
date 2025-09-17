// src/context/DimensionContext.js
import React, { createContext, useEffect, useState } from 'react';
import { Dimensions } from 'react-native';

export const DimensionContext = createContext();

export const DimensionProvider = ({ children }) => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));

  useEffect(() => {
    const onChange = ({ window }) => {
      setDimensions(window);
    };

    Dimensions.addEventListener?.('change', onChange);

    return () => {
      Dimensions.removeEventListener?.('change', onChange);
    };
  }, []);

  return (
    <DimensionContext.Provider value={dimensions}>
      {children}
    </DimensionContext.Provider>
  );
};
