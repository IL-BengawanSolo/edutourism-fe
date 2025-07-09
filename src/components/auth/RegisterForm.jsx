import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { Show, Hide } from "react-iconly";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Link } from "react-router-dom";
import useRegister from "@/api/useRegister.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import ErrorAlert from "./ErrorAlert.jsx";

const formSchema = z
  .object({
    first_name: z
      .string()
      .min(1, { message: "Nama depan minimal 1 karakter." })
      .max(50, { message: "Nama depan maksimal 50 karakter." }),
    last_name: z
      .string()
      .max(50, { message: "Nama belakang maksimal 50 karakter." }),
    phone: z
      .string()
      .min(8, { message: "Nomor telepon minimal 8 digit." })
      .max(15, { message: "Nomor telepon maksimal 15 digit." })
      .regex(/^[0-9+\- ]+$/, { message: "Nomor telepon tidak valid." }),
    email: z
      .string()
      .min(1, { message: "Email tidak boleh kosong." })
      .email({ message: "Email tidak valid." }),
    password: z.string().min(6, { message: "Kata sandi minimal 6 karakter." }),
    confirm_password: z
      .string()
      .min(6, { message: "Konfirmasi kata sandi minimal 6 karakter." }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Konfirmasi kata sandi tidak sama.",
    path: ["confirm_password"],
  });

const RegisterForm = ({ className, ...props }) => {
  const { register, error } = useRegister();

  // State untuk toggle show/hide password
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      phone: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  const handleRegister = async (values) => {
    try {
      await register(values);
      setIsSuccess(true);
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      /* empty */
    }
  };

  if (isSuccess) {
    return (
      <>
        <Alert
          variant="info"
          className="bg-state-info/10 text-state-info flex items-start gap-4 p-6"
        >
          <div>
            <FontAwesomeIcon
              icon={faCircleCheck}
              className="text-state-info"
              size="3x"
            />
          </div>
          <div>
            <AlertTitle className="text-xl font-semibold">
              Registrasi Berhasil!
            </AlertTitle>
            <AlertDescription className="text-md mt-3 font-semibold">
              Akun Anda telah berhasil dibuat. Silakan login untuk melanjutkan.
            </AlertDescription>
          </div>
        </Alert>

        <div className="mt-6 text-center">
          <Button
            type="submit"
            className="bg-state-info mt-2 h-12 w-full rounded-xl font-semibold"
            asChild
          >
            <Link to="/login">Kembali ke Halaman Login</Link>
          </Button>
        </div>
      </>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleRegister)}
        className={cn("flex flex-col gap-8", className)}
        {...props}
      >
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-2xl font-bold">Daftar Akun Baru</h1>
          <p className="text-muted-foreground text-left text-sm">
            Silakan masukkan informasi Anda untuk membuat akun baru.
          </p>
        </div>

        {error && <ErrorAlert error={error} />}

        <div className="grid gap-6">
          <div className="grid grid-cols-2 gap-2">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Depan</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Masukkan nama depan"
                      className="h-12 bg-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Belakang</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Masukkan nama belakang"
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
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nomor Telepon</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="0812-3456-7890"
                      className="h-12 bg-white"
                      {...field}
                      onChange={(e) => {
                        // Formatter: otomatis beri tanda - setiap 4 digit
                        let value = e.target.value.replace(/[^\d]/g, "");
                        // Format: 4-4-4-... dst
                        let formatted = value.replace(
                          /^(\d{4})(\d{0,4})(\d{0,4})/,
                          (m, g1, g2, g3) =>
                            [g1, g2, g3].filter(Boolean).join("-"),
                        );
                        field.onChange(formatted);
                      }}
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="contoh@mail.com"
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
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Masukkan kata sandi"
                      className="h-12 bg-white pr-10"
                      {...field}
                    />
                    <Button
                      type="button"
                      tabIndex={-1}
                      className="absolute top-1/2 right-2 -translate-y-1/2"
                      variant="ghost"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <Show
                          set="bold"
                          className="text-neutral-dark-grey !h-5 !w-5"
                        />
                      ) : (
                        <Hide
                          set="bold"
                          className="text-neutral-dark-grey !h-5 !w-5"
                        />
                      )}
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="confirm_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Konfirmasi Kata Sandi</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Masukkan konfirmasi kata sandi"
                        className="h-12 bg-white pr-10"
                        {...field}
                      />
                      <Button
                        type="button"
                        tabIndex={-1}
                        className="absolute top-1/2 right-2 -translate-y-1/2"
                        variant="ghost"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <Show
                            set="bold"
                            className="text-neutral-dark-grey !h-5 !w-5"
                          />
                        ) : (
                          <Hide
                            set="bold"
                            className="text-neutral-dark-grey !h-5 !w-5"
                          />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button
          type="submit"
          className="mt-2 h-12 w-full rounded-xl font-semibold"
        >
          Daftar
        </Button>

        <div className="text-center text-sm">
          Sudah punya akun?{" "}
          <Link to="/login" className="underline underline-offset-4">
            Masuk
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default RegisterForm;
