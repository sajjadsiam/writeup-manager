'use client';

import React, { useState, useEffect } from 'react';

const DynamicYear: React.FC = () => {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  // Return a placeholder during hydration to prevent mismatch
  if (year === null) {
    return <>2024</>;
  }

  return <>{year}</>;
};

export default DynamicYear;