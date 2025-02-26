'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function login(prevState: any, formData: FormData) {
  const password = formData.get('password');

  if (password === process.env.ADMIN_API_KEY) {
    const session = { username: 'admin' };
    const cookieStore = cookies();
    cookieStore.set('adminSession', JSON.stringify(session), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60,
      path: '/',
    });

    redirect('/notice');
  }

  return { error: '잘못된 비밀번호입니다.' };
}
