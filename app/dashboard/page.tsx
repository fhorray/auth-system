import { Button } from '@/components/ui/button';
import AuthService from '@/services/auth-service';
import Link from 'next/link';
import React from 'react';

const DashboardPage = () => {
  return (
    <div>
      <Button>
        <Link href={'/api/logout'}>Log out</Link>
      </Button>
      Bem Vindo: NOME DO USUARIO AQUI
    </div>
  );
};

export default DashboardPage;
