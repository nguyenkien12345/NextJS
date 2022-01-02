import { authApi } from 'apis';
import {useAuth} from 'hooks/use-auth';
import { useRouter } from 'next/router';
import React from 'react';

function LoginPage () {

    const router = useRouter();

    const {profile, login, logout} = useAuth({
      revalidateOnMount: false,
    });

    const handleLogin = async() => {
      try {
        await login();
        router.push('/about');
        console.log('Redirect To Dashboard');
      } catch (error) {
        console.log('Failed to login !',error);
      }
    }

    const handleGetProfile = async() => {
     try {
      await authApi.getProfile();
     } catch (error) {
      console.log('Failed to get profile !',error);
     }
    }

    const handleLogout = async() => {
      try {
        await logout();
        console.log('Redirect To Login');
      } catch (error) {
        console.log('Failed to logout !',error);
      }
    }

  return (
    <div>
      <h1>Login Page</h1>
      <div>Profile: {JSON.stringify(profile || {},null,4)}</div>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleGetProfile}>Get Profile</button>
      <button onClick={() => router.push('/about')}>Go To About</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default LoginPage;
