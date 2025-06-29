import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useLogin from "@/api/useLogin";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import ErrorAlert from "./ErrorAlert.jsx";

const formSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Email tidak boleh kosong.",
    })
    .email({
      message: "Email tidak valid.",
    }),
  password: z
    .string()
    .min(1, {
      message: "Kata sandi tidak boleh kosong.",
    })
    .min(6, {
      message: "Kata sandi harus memiliki minimal 6 karakter.",
    })
    .max(50, {
      message: "Kata sandi tidak boleh lebih dari 50 karakter.",
    }),
});

const LoginForm = ({ className, ...props }) => {
  const { login, error } = useLogin();
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const handleLogin = async (values) => {
    try {
      await login(values);
      navigate("/", { replace: true });
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      /* empty */
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleLogin)}
        className={cn("flex flex-col gap-8", className)}
        {...props}
      >
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-2xl font-bold">Masuk ke akun Anda</h1>
          <p className="text-muted-foreground text-left text-sm">
            Ayo login dan dapatkan rekomendasi tempat wisata terbaik untuk kamu
            dengan berbasis AI!
          </p>
        </div>

        {error && (
          <ErrorAlert error={error} />
        )}

        <div className="grid gap-4">
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="contoh@email.com"
                      className="h-12 bg-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kata Sandi</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Masukkan kata sandi"
                      className="h-12 bg-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center">
              <a
                href="#"
                className="ml-auto text-sm underline-offset-4 hover:underline"
              >
                Lupa kata sandi Anda?
              </a>
            </div>
          </div>
        </div>

        <Button
          type="submit"
          className="mt-2 h-12 w-full rounded-xl font-semibold"
        >
          Masuk
        </Button>

        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-neutral-bg text-muted-foreground relative z-10 px-2">
            Atau lanjutkan dengan
          </span>
        </div>

        <Button
          variant="outline"
          className="h-12 w-full rounded-full font-medium"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="!h-6 !w-6"
            viewBox="0 0 48 48"
          >
            <path
              fill="#FFC107"
              d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
            <path
              fill="#FF3D00"
              d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
            ></path>
            <path
              fill="#4CAF50"
              d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
            ></path>
            <path
              fill="#1976D2"
              d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
          </svg>
          Masuk dengan Google
        </Button>

        <div className="text-center text-sm">
          Belum punya akun?{" "}
          <Link to="/register" className="underline underline-offset-4">
            Daftar
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
