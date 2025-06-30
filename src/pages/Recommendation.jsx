import React, { useState } from "react";
import { useAuth } from "@/components/utils/AuthProvider";

import JumbotronNotTest from "@/components/recommendation/JumbotronNotTest.jsx";
import JumbotronNotLogin from "@/components/recommendation/JumbotronNotLogin.jsx";
import PreferenceTest from "@/components/recommendation/PreferenceTest.jsx";
import JumbotronTestProgress from "@/components/recommendation/JumbotronTestProgress.jsx";
import JumbotronTestCompleted from "@/components/recommendation/JumbotronTestCompleted.jsx";

const Recommendation = () => {
  const { user, checking } = useAuth();
  const [isTested, setIsTested] = useState(false);
  const [isTestCompleted, setIsTestCompleted] = useState(false);

  if (checking) return null; // atau spinner/loading

  // Jika belum login, tampilkan JumbotronNotLogin
  if (!user) {
    return <JumbotronNotLogin />;
  }

  // Jika sudah login dan belum test
  if (!isTested) {
    return <JumbotronNotTest onTestClick={() => setIsTested(true)} />;
  }

  // Jika sedang test dan belum selesai
  if (isTested && !isTestCompleted) {
    return (
      <>
        <JumbotronTestProgress />
        <PreferenceTest onTestCompleted={() => setIsTestCompleted(true)} />
      </>
    );
  }

  // Jika test sudah selesai
  if (isTestCompleted) {
    return <JumbotronTestCompleted />;
  }

  return null;
};

export default Recommendation;