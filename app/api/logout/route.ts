import AuthService from '@/services/auth-service';
import { redirect } from 'next/navigation';

export function GET() {
  AuthService.destroySession();

  redirect('/login');
}
