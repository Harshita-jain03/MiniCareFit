// 'use client';
// import React from 'react';
// import { Header } from 'next/dist/lib/load-custom-routes';
// // import Sidebar from './_container/Sidebar';
// import Dashboard fr
// // import Dashboard from './dashboard/page';

// export default function ParentDashboard() {
//   const [currentPage, setCurrentPage] = React.useState('dashboard');

//   const renderCurrentPage = () => {
//     switch (currentPage) {
//       case 'dashboard':
//         return <Dashboard />;
//       case 'health':
//         const Health = React.lazy(() => import('./health/page'));
//         return <Health />;
//       case 'rewards':
//         const Rewards = React.lazy(() => import('./rewards/page'));
//         return <Rewards />;
//       case 'todolist':
//         const TodoList = React.lazy(() => import('./todolist/page'));
//         return <TodoList />;
//       case 'profile':
//         const Profile = React.lazy(() => import('./profile/page'));
//         return <Profile />;
//       default:
//         return <Dashboard />;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header />
//       <div className="flex">
//         <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
//         <main className="flex-1 p-6">
//           <React.Suspense fallback={<div className="flex items-center justify-center h-64">Loading...</div>}>
//             {renderCurrentPage()}
//           </React.Suspense>
//         </main>
//       </div>
//     </div>
//   );
// }