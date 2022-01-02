import StudentDetail from '@/components/swr/StudentDetail';
import React from 'react';

function SWRPage() {
  return (
    <div>
      <h1>SWR PAGE</h1>
      <ul>
          <li><StudentDetail studentId="sktwi1cgkkuif36f3"/></li>
          <li><StudentDetail studentId="sktwi1cgkkuif36f4"/></li>
          <li><StudentDetail studentId="sktwi1cgkkuif36f5"/></li>
      </ul>
    </div>
  );
}

export default SWRPage;