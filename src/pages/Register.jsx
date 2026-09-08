import RegisterForm from "@/components/auth/RegisterForm.jsx";
import { Helmet } from "react-helmet-async";

export default function Register() {
  return (
    <>
      <Helmet>
        <title>Register — EduSolo</title>
        <meta
          name="description"
          content="Create your EduSolo account and start exploring Solo Raya's educational tourism with AI."
        />
      </Helmet>
      <RegisterForm />
    </>
  );
}
