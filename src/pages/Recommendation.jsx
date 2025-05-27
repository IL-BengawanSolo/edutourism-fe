import React, { useState } from "react";

import JumbotronNotTest from "@/components/JumbotronNotTest.jsx";
import JumbotronNotLogin from "@/components/JumbotronNotLogin.jsx";
import PreferenceTest from "@/components/PreferenceTest.jsx";
import JumbotronTestProgress from "@/components/JumbotronTestProgress.jsx";
import JumbotronTestCompleted from "@/components/JumbotronTestCompleted.jsx";

const Recommendation = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isTested, setIsTested] = useState(false);
  const [isTestCompleted, setIsTestCompleted] = useState(false);

  return (
    <>
      {isTested && !isTestCompleted && (
        <>
          <JumbotronTestProgress />
          <PreferenceTest onTestCompleted={() => setIsTestCompleted(true)} />
        </>
      )}

      {isTestCompleted && <JumbotronTestCompleted />}

      {/* not login boy */}
      {!isLogin && !isTested && (
        <JumbotronNotLogin onLoginClick={() => setIsLogin(true)} />
      )}

      {/* not test girl */}
      {isLogin && !isTested && (
        <JumbotronNotTest onTestClick={() => setIsTested(true)} />
      )}
    </>
  );
};

export default Recommendation;
