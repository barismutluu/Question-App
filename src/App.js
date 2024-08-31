import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import questions from "./questions"; // questions.js dosyasını içe aktarıyoruz

const App = () => {
  // State tanımlamaları
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(null); // Geçerli sorunun indeksini tutar, başlangıçta test başlamamış olacak
  const [showOptions, setShowOptions] = useState(false); // Cevap seçeneklerinin gösterilip gösterilmeyeceğini belirler
  const [userAnswers, setUserAnswers] = useState([]); // Kullanıcının verdiği cevapları tutar
  const [timeLeft, setTimeLeft] = useState(30); // Her soru için kalan süreyi takip eder
  const [testFinished, setTestFinished] = useState(false); // Testin bitip bitmediğini kontrol eder
  const [showDetailedResults, setShowDetailedResults] = useState(false); // Detaylı sonuçların gösterilip gösterilmeyeceğini kontrol eder

  // Testi başlatan fonksiyon
  const startTest = () => {
    setCurrentQuestionIndex(0); // İlk soruya başla
    setTimeLeft(30); // Zamanı 30 saniye olarak ayarla
  };

  // Geçerli soruyu alır, eğer currentQuestionIndex null ise null döner
  const currentQuestion =
    currentQuestionIndex !== null && questions[currentQuestionIndex]
      ? questions[currentQuestionIndex]
      : null;

  // Sonraki soruya geçişi yöneten fonksiyon
  const handleNextQuestion = useCallback(() => {
    setShowOptions(false); // Cevap seçeneklerini gizle
    setTimeLeft(30); // Zamanı sıfırla
    if (
      currentQuestionIndex !== null && // Eğer hala geçerli bir soru varsa
      currentQuestionIndex < questions.length - 1 // Ve soruların sonuna gelinmemişse
    ) {
      setCurrentQuestionIndex(currentQuestionIndex + 1); // Bir sonraki soruya geç
    } else {
      setTestFinished(true); // Testi bitir
    }
  }, [currentQuestionIndex]); // currentQuestionIndex bağımlılığı ile

  // Zamanlayıcıyı yöneten ve sorunun süresi dolduğunda sonraki soruya geçen useEffect
  useEffect(() => {
    console.log(questions); // Soruların doğru yüklendiğini kontrol etmek için
    if (currentQuestionIndex !== null && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000); // Her saniye zamanı bir azalt
      return () => clearTimeout(timer); // Temizlik işlemi
    } else if (timeLeft === 0) {
      handleNextQuestion(); // Zaman dolduysa sonraki soruya geç
    }
  }, [timeLeft, currentQuestionIndex, handleNextQuestion]); // timeLeft, currentQuestionIndex ve handleNextQuestion bağımlılıkları

  // Cevap seçeneklerinin gösterilmesini kontrol eden useEffect
  useEffect(() => {
    if (currentQuestionIndex !== null) {
      const showOptionsTimer = setTimeout(() => setShowOptions(true), 4000); // 4 saniye sonra seçenekleri göster
      return () => clearTimeout(showOptionsTimer); // Temizlik işlemi
    }
  }, [currentQuestionIndex]);

  // Kullanıcı bir cevaba tıkladığında çağrılan fonksiyon
  const handleAnswerClick = (option) => {
    if (currentQuestion) {
      setUserAnswers([
        ...userAnswers,
        { question: currentQuestion.question, answer: option }, // Kullanıcının cevabını kaydet
      ]);
    }
    handleNextQuestion(); // Sonraki soruya geç
  };

  // Testin sonuçlarını hesaplayan fonksiyon
  const getResult = () => {
    let correctAnswers = 0;
    let incorrectAnswers = 0;
    let unanswered = 0;

    // Detaylı sonuçları oluşturur
    const detailedResults = questions.map((question, index) => {
      const userAnswer = userAnswers.find(
        (answer) => answer.question === question.question
      );

      if (userAnswer) {
        if (userAnswer.answer === question.answer) {
          correctAnswers++; // Doğru cevabı say
        } else {
          incorrectAnswers++; // Yanlış cevabı say
        }
        return {
          question: question.question,
          userAnswer: userAnswer.answer,
          correctAnswer: question.answer,
        };
      } else {
        unanswered++; // Cevap verilmediğini say
        return {
          question: question.question,
          userAnswer: "Cevap verilmedi",
          correctAnswer: question.answer,
        };
      }
    });

    return {
      correct: correctAnswers, // Toplam doğru cevap sayısı
      incorrect: incorrectAnswers, // Toplam yanlış cevap sayısı
      unanswered: unanswered, // Toplam boş bırakılan soru sayısı
      detailedResults: detailedResults, // Detaylı sonuçlar
    };
  };

  const results = getResult(); // Sonuçları al

  return (
    <div className="App" style={{ width: "1400px", margin: "auto" }}>
      {currentQuestionIndex === null ? ( // Eğer test başlamamışsa
        <div className="start-screen">
          <h1>Teste Hoş Geldiniz</h1>
          <p>
            Bu test, bilgilerinizi ölçmek için 10 sorudan oluşmaktadır. Her soru
            için 30 saniyeniz var. "Teste Başla" butonuna tıklayarak teste
            başlayabilirsiniz.
          </p>
          <button id="start" onClick={startTest}>
            {" "}
            {/* Test başlatma butonu */}
            Teste Başla
          </button>
        </div>
      ) : !testFinished ? ( // Eğer test devam ediyorsa
        currentQuestion ? ( // Eğer geçerli bir soru varsa
          <>
            <div className="question-section">
              <h2>{currentQuestion.question}</h2> {/* Soruyu göster */}
              {currentQuestion.media && (
                <img
                  src={require(`./pictures/${currentQuestion.media}`)}
                  alt="question-related"
                />
              )}
              <div className="options-section">
                {showOptions ? ( // Seçenekleri göster
                  currentQuestion.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerClick(option)}
                    >
                      {option}
                    </button>
                  ))
                ) : (
                  <p>Cevap şıkları yükleniyor...</p> // Seçenekler yüklenirken mesaj göster
                )}
              </div>
            </div>
            <div className="timer-section">
              <p>Kalan süre: {timeLeft} saniye</p> {/* Kalan süreyi göster */}
            </div>
          </>
        ) : (
          <p>Soru yüklenemedi. Lütfen daha sonra tekrar deneyin.</p> // Sorular yüklenemediğinde hata mesajı
        )
      ) : (
        // Test bittiyse
        <div className="result-section">
          <h2>Test Sonuçları</h2>
          <p>Doğru Sayısı: {results.correct}</p>{" "}
          {/* Doğru cevap sayısını göster */}
          <p>Yanlış Sayısı: {results.incorrect}</p>{" "}
          {/* Yanlış cevap sayısını göster */}
          <p>Boş Bırakılan Sorular: {results.unanswered}</p>{" "}
          {/* Boş bırakılan soru sayısını göster */}
          <button
            onClick={() => setShowDetailedResults(!showDetailedResults)} // Detaylı sonuçları aç/kapat butonu
            className="toggle-button"
          >
            Detaylı Sonuçlar {showDetailedResults ? "Kapat" : "Aç"}
          </button>
          {showDetailedResults && ( // Eğer detaylı sonuçlar açılmışsa
            <ul>
              {results.detailedResults.map((result, index) => (
                <li key={index}>
                  <strong>Soru {index + 1}:</strong> {result.question}
                  <br />
                  <strong>Verilen Cevap:</strong> {result.userAnswer}
                  <br />
                  <strong>Doğru Cevap:</strong> {result.correctAnswer}
                  <br />
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
