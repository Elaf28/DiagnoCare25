// import React from 'react';
// import { useSelector } from 'react-redux'; // أو أي طريقة تستخدميها لإدارة الـ state
// import DoctorProfile from '../PatientProfile/PatientProfile';
// import PatientProfile from '../DoctorProfile/DoctorProfile';
// import { Container, Card } from 'react-bootstrap';

// export default function UserProfile({ initialPatientData,doctorData}) {
//   const { user } = useSelector((state) => state.auth); // مثال: استجلاب الـ user من Redux

//   if (!user) {
//     return <Container className="my-4"><Card className="p-4">جاري تحميل الملف الشخصي...</Card></Container>;
//   }

//   return (
//     <Container className="my-4">
//       {user.role === 'doctor' ? (
//         <DoctorProfile doctorData={doctorData} />
//       ) : user.role === 'patient' (
//         <PatientProfile initialPatientData={initialPatientData}/>
//       ) }
//     </Container>
//   );
// }

import React from 'react'

export default function UserProfile() {
  return (
    <div>UserProfile</div>
  )
}
