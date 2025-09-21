import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { GoogleSignIn } from '@/components/auth/GoogleSignIn';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <Card className="w-full max-w-sm bg-secondary/50 border-border">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Sign in to your account using Google.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <GoogleSignIn />
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <div className="text-center text-sm">
          Don't have an account?{' '}
          <Link href="#" className="underline">
            Sign up
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
