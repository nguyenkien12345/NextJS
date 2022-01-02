import { LayoutProps } from '@/models/index';
import { useAuth } from 'hooks';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { Auth } from '../common';

function AdminLayout ({children}: LayoutProps) {
  
  const router = useRouter();

  const { profile,logout } = useAuth();

  const handleLogout = async() => {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.log('Failed to logout !',error);
    }
  }

  return (
    <Auth>
      <h1>Admin Layout</h1>
      <div>SideBar</div>
      <div>Profile: {JSON.stringify(profile)}</div>
      <div>{children}</div>
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </Auth>
  );
}

export { AdminLayout };

