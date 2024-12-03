import LoginForm from "@/components/features/auth/login-form";
import Logo from "@/components/logo";

function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-lg p-8 space-y-8 shadow-md rounded-xl">
        <Logo className="w-auto h-12 mx-auto" />
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;
