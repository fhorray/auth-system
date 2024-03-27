import db from '@/db/drizzle';
import { users } from '@/db/schema';
import AuthService from '@/services/auth-service';

import * as bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

async function createAccount(formData: FormData) {
  'use server';

  const fullName = formData.get('full-name') as string;
  const username = formData.get('username') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const hashPassword = await bcrypt.hash(password, 10);

  await db.insert(users).values({
    fullName: fullName,
    username: username,
    password: hashPassword,
    email: email,
  });

  redirect('/login');
}

async function login(formData: FormData) {
  'use server';

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (!user) {
    console.log('Erro no login');
    redirect('/login');
  }
  const isMatch = await bcrypt.compare(password, user.password || '');

  if (!isMatch) {
    console.log('Usuario ou senha invalidos');
    redirect('/login');
  }

  // IF USER AND PASS IS INVALID
  AuthService.createSessionToken({
    sub: user.id,
    name: user.fullName,
    isPremium: user.isPremium,
  });

  revalidatePath('/dashboard');
  redirect('/dashboard');
}

const authActions = {
  createAccount,
  login,
};

export default authActions;
