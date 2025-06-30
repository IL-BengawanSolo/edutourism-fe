import React, { useState } from "react";
import { useAuth } from "@/components/utils/AuthProvider";

import JumbotronNotTest from "@/components/recommendation/JumbotronNotTest.jsx";
import JumbotronNotLogin from "@/components/recommendation/JumbotronNotLogin.jsx";
import PreferenceTest from "@/components/recommendation/PreferenceTest.jsx";
import JumbotronTestProgress from "@/components/recommendation/JumbotronTestProgress.jsx";
import JumbotronTestCompleted from "@/components/recommendation/JumbotronTestCompleted.jsx";
import useCheckRecommendationSession from "@/api/useCheckRecommendationSession";
import useFetchQuestions from "@/api/useFetchQuestions";

const Recommendation = () => {
  const { user, checking } = useAuth();
  const { hasSession, loading: sessionLoading } =
    useCheckRecommendationSession();
  const {
    questions,
    loading: questionsLoading,
    error: questionsError,
    fetchQuestions,
  } = useFetchQuestions();

  const [beginTest, setBeginTest] = useState(false);
  const [isTestCompleted, setIsTestCompleted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]); // Array of array, satu index = satu pertanyaan

  console.log("answers", answers);

  const handleStartTest = () => {
    setBeginTest(true);
    fetchQuestions();
  };

  const handleAnswer = (selected) => {
    setAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[currentQuestion] = selected;
      return newAnswers;
    });
  };

  if (checking || sessionLoading || questionsLoading) return null; // atau spinner/loading

  // Jika belum login, tampilkan JumbotronNotLogin
  if (!user) {
    return <JumbotronNotLogin />;
  }

  // Jika user sudah pernah tes
  if (hasSession) {
    return <JumbotronTestCompleted />;
  }

  // Jika sudah login dan belum test
  if (!hasSession && !beginTest) {
    return <JumbotronNotTest onTestClick={handleStartTest} />;
  }

  // Jika sedang test dan belum selesai
  if (beginTest && !isTestCompleted) {
    if (questionsError) {
      return (
        <div className="text-red-500">
          Gagal mengambil data pertanyaan: {questionsError.message}
        </div>
      );
    }
    if (questionsLoading) return <div>Loading questions...</div>;
    const question = questions[currentQuestion];
    return (
      <>
        <JumbotronTestProgress
          current={currentQuestion + 1}
          total={questions.length}
        />
        <PreferenceTest
          currentQuestion={currentQuestion + 1}
          questionText={question?.question_text || ""}
          answerChoices={question?.answer_choices || []}
          selected={answers[currentQuestion] || []}
          setSelected={(selected) => handleAnswer(selected)}
          onNext={() => {
            if (currentQuestion < questions.length - 1) {
              setCurrentQuestion((prev) => prev + 1);
            } else {
              setIsTestCompleted(true);
            }
          }}
          onPrev={() => {
            if (currentQuestion > 0) setCurrentQuestion((prev) => prev - 1);
          }}
          isLast={currentQuestion === questions.length - 1}
          isFirst={currentQuestion === 0}
        />
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
