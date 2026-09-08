import LoginForm from "@/components/auth/LoginForm.jsx";
import { Helmet } from "react-helmet-async";

export default function Login() {
  return (
    <>
      <Helmet>
        <title>Login — EduSolo</title>
        <meta
          name="description"
          content="Login to EduSolo to get personalized AI recommendations for Solo Raya educational tourism."
        />
      </Helmet>
      <LoginForm />
    </>
  );
}
