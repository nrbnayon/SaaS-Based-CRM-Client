"use client";
import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Save,
  CheckCircle,
  Plus,
  Trash2,
  Edit3,
  Play,
  ArrowLeft,
  Copy,
} from "lucide-react";

const DynamicHRTestApp = () => {
  const [mode, setMode] = useState("builder"); // 'builder' or 'test'
  const [surveyData, setSurveyData] = useState({
    title: "HR Assessment Test",
    questions: [],
  });

  // Test taking state
  const [currentPage, setCurrentPage] = useState(1);
  const [answers, setAnswers] = useState({});
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);

  // Form builder state
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [newQuestion, setNewQuestion] = useState({
    title: "",
    type: "MULTIPLE_CHOICE",
    options: [""],
  });
  const [formKey, setFormKey] = useState(0); // Force re-render key

  const questionsPerPage = 4;
  const totalPages = Math.ceil(surveyData.questions.length / questionsPerPage);

  // Question Builder Component
  const QuestionBuilder = () => {
    const questionTypes = [
      { value: "SHORT_ANSWER", label: "Short Answer" },
      { value: "PARAGRAPH", label: "Paragraph" },
      { value: "MULTIPLE_CHOICE", label: "Multiple Choice" },
      { value: "CHECKBOX", label: "Checkbox" },
    ];

    const addOption = () => {
      setNewQuestion((prev) => ({
        ...prev,
        options: [...(prev.options || []), ""],
      }));
    };

    const updateOption = (index, value) => {
      setNewQuestion((prev) => ({
        ...prev,
        options: (prev.options || []).map((opt, i) =>
          i === index ? value : opt
        ),
      }));
    };

    const removeOption = (index) => {
      if (newQuestion.options && newQuestion.options.length > 1) {
        setNewQuestion((prev) => ({
          ...prev,
          options: prev.options.filter((_, i) => i !== index),
        }));
      }
    };

    const saveQuestion = () => {
      if (!newQuestion.title.trim()) {
        alert("Please enter a question title");
        return;
      }

      const question = {
        id: editingQuestion ? editingQuestion.id : Date.now(),
        title: newQuestion.title,
        type: newQuestion.type,
        ...(["MULTIPLE_CHOICE", "CHECKBOX"].includes(newQuestion.type) && {
          options: newQuestion.options.filter((opt) => opt.trim()),
        }),
      };

      if (editingQuestion) {
        setSurveyData((prev) => ({
          ...prev,
          questions: prev.questions.map((q) =>
            q.id === editingQuestion.id ? question : q
          ),
        }));
      } else {
        setSurveyData((prev) => ({
          ...prev,
          questions: [...prev.questions, question],
        }));
      }

      resetForm();
    };

    const resetForm = () => {
      setNewQuestion({
        title: "",
        type: "MULTIPLE_CHOICE",
        options: [""],
      });
      setEditingQuestion(null);
      setFormKey((prev) => prev + 1); // Force form reset
    };

    const editQuestion = (question) => {
      setEditingQuestion(question);
      setNewQuestion({
        title: question.title || "",
        type: question.type || "MULTIPLE_CHOICE",
        options: question.options ? [...question.options] : [""],
      });
      setFormKey((prev) => prev + 1); // Force form reset
    };

    const deleteQuestion = (id) => {
      if (confirm("Are you sure you want to delete this question?")) {
        setSurveyData((prev) => ({
          ...prev,
          questions: prev.questions.filter((q) => q.id !== id),
        }));
      }
    };

    const duplicateQuestion = (question) => {
      const newQ = {
        ...question,
        id: Date.now(),
        title: question.title + " (Copy)",
      };
      setSurveyData((prev) => ({
        ...prev,
        questions: [...prev.questions, newQ],
      }));
    };

    const importSampleData = () => {
      const sampleData = {
        title: "Customer Feedback Survey",
        questions: [
          {
            id: 1,
            title: "What is your full name?",
            type: "SHORT_ANSWER",
          },
          {
            id: 2,
            title: "Please describe your experience with our service.",
            type: "PARAGRAPH",
          },
          {
            id: 3,
            title: "How did you hear about us?",
            type: "MULTIPLE_CHOICE",
            options: ["Facebook", "Google", "Friend", "Other"],
          },
          {
            id: 4,
            title: "Which features do you use?",
            type: "CHECKBOX",
            options: ["Search", "Dashboard", "Notifications"],
          },
        ],
      };
      setSurveyData(sampleData);
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Header */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8 border border-white/20">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  Survey Builder
                </h1>
                <input
                  type="text"
                  value={surveyData.title}
                  onChange={(e) =>
                    setSurveyData((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  className="bg-white/20 text-white placeholder-white/70 border border-white/30 rounded-lg px-4 py-2 text-lg font-semibold"
                  placeholder="Survey Title"
                />
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={importSampleData}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
                >
                  Load Sample
                </button>
                {surveyData.questions.length > 0 && (
                  <button
                    onClick={() => setMode("test")}
                    className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Take Test
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Question Form */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/30">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {editingQuestion ? "Edit Question" : "Add New Question"}
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Question Title *
                  </label>
                  <input
                    key={`title-${formKey}`}
                    type="text"
                    value={newQuestion.title}
                    onChange={(e) =>
                      setNewQuestion((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your question here..."
                    autoComplete="off"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Question Type
                  </label>
                  <select
                    key={`type-${formKey}`}
                    value={newQuestion.type}
                    onChange={(e) => {
                      const newType = e.target.value;
                      setNewQuestion((prev) => ({
                        ...prev,
                        type: newType,
                        options: ["MULTIPLE_CHOICE", "CHECKBOX"].includes(
                          newType
                        )
                          ? prev.options || [""]
                          : [],
                      }));
                    }}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {questionTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                {["MULTIPLE_CHOICE", "CHECKBOX"].includes(newQuestion.type) && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Options
                    </label>
                    <div className="space-y-2">
                      {(newQuestion.options || [""]).map((option, index) => (
                        <div
                          key={`option-${formKey}-${index}`}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="text"
                            value={option}
                            onChange={(e) =>
                              updateOption(index, e.target.value)
                            }
                            className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder={`Option ${index + 1}`}
                            autoComplete="off"
                          />
                          {(newQuestion.options || []).length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeOption(index)}
                              className="p-2 text-red-500 hover:text-red-700 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={addOption}
                        className="flex items-center px-3 py-2 text-blue-600 hover:text-blue-800 border border-blue-300 rounded-lg hover:bg-blue-50 transition-all"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Option
                      </button>
                    </div>
                  </div>
                )}

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={saveQuestion}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all font-medium"
                  >
                    {editingQuestion ? "Update Question" : "Add Question"}
                  </button>
                  {editingQuestion && (
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-6 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition-all"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Questions List */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/30">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Questions ({surveyData.questions.length})
              </h2>

              {surveyData.questions.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>No questions added yet.</p>
                  <p className="text-sm mt-2">
                    Create your first question to get started!
                  </p>
                </div>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {surveyData.questions.map((question, index) => (
                    <div
                      key={question.id}
                      className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-all"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="font-medium text-gray-800">
                            {index + 1}. {question.title}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            Type:{" "}
                            {question.type.replace("_", " ").toLowerCase()}
                            {question.options &&
                              ` (${question.options.length} options)`}
                          </p>
                        </div>
                        <div className="flex space-x-1 ml-4">
                          <button
                            onClick={() => duplicateQuestion(question)}
                            className="p-1 text-gray-500 hover:text-blue-600"
                            title="Duplicate"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => editQuestion(question)}
                            className="p-1 text-gray-500 hover:text-blue-600"
                            title="Edit"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteQuestion(question.id)}
                            className="p-1 text-gray-500 hover:text-red-600"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* JSON Preview */}
          {surveyData.questions.length > 0 && (
            <div className="mt-8 bg-gray-900 rounded-2xl p-6 border border-white/20">
              <h3 className="text-white font-semibold mb-4">JSON Preview</h3>
              <pre className="text-green-400 text-sm overflow-x-auto">
                {JSON.stringify(surveyData, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Test Taking Component (same as before with minor adjustments)
  const TestTaker = () => {
    // Auto-save functionality
    useEffect(() => {
      const autoSave = setTimeout(() => {
        if (Object.keys(answers).length > 0) {
          setIsAutoSaving(true);
          setTimeout(() => {
            setIsAutoSaving(false);
            setLastSaved(new Date());
          }, 500);
        }
      }, 2000);

      return () => clearTimeout(autoSave);
    }, [answers]);

    const getCurrentPageQuestions = () => {
      const startIndex = (currentPage - 1) * questionsPerPage;
      const endIndex = Math.min(
        startIndex + questionsPerPage,
        surveyData.questions.length
      );
      return surveyData.questions.slice(startIndex, endIndex);
    };

    const handleAnswerChange = (questionId, value) => {
      setAnswers((prev) => ({
        ...prev,
        [questionId]: value,
      }));
    };

    const handleNext = () => {
      if (currentPage < totalPages) {
        setCurrentPage((prev) => prev + 1);
      }
    };

    const handlePrevious = () => {
      if (currentPage > 1) {
        setCurrentPage((prev) => prev - 1);
      }
    };

    const handleSave = () => {
      setIsAutoSaving(true);
      setTimeout(() => {
        setIsAutoSaving(false);
        setLastSaved(new Date());
        alert("Test saved successfully!");
      }, 1000);
    };

    const progressPercentage =
      totalPages > 1 ? ((currentPage - 1) / (totalPages - 1)) * 100 : 100;
    const currentQuestions = getCurrentPageQuestions();

    const renderQuestion = (question) => {
      switch (question.type) {
        case "SHORT_ANSWER":
          return (
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Type your answer here..."
              value={answers[question.id] || ""}
              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            />
          );

        case "PARAGRAPH":
          return (
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all min-h-[120px] resize-vertical"
              placeholder="Type your detailed answer here..."
              value={answers[question.id] || ""}
              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            />
          );

        case "MULTIPLE_CHOICE":
          return (
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <label
                  key={index}
                  className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-all group"
                >
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={option}
                    checked={answers[question.id] === option}
                    onChange={(e) =>
                      handleAnswerChange(question.id, e.target.value)
                    }
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-3 text-gray-700 group-hover:text-gray-900">
                    {option}
                  </span>
                </label>
              ))}
            </div>
          );

        case "CHECKBOX":
          return (
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <label
                  key={index}
                  className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-all group"
                >
                  <input
                    type="checkbox"
                    value={option}
                    checked={(answers[question.id] || []).includes(option)}
                    onChange={(e) => {
                      const currentAnswers = answers[question.id] || [];
                      if (e.target.checked) {
                        handleAnswerChange(question.id, [
                          ...currentAnswers,
                          option,
                        ]);
                      } else {
                        handleAnswerChange(
                          question.id,
                          currentAnswers.filter((a) => a !== option)
                        );
                      }
                    }}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-3 text-gray-700 group-hover:text-gray-900">
                    {option}
                  </span>
                </label>
              ))}
            </div>
          );

        default:
          return null;
      }
    };

    if (surveyData.questions.length === 0) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-4">
              No Questions Available
            </h2>
            <p className="text-white/80 mb-6">
              Please create some questions first before taking the test.
            </p>
            <button
              onClick={() => setMode("builder")}
              className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 mx-auto"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Builder
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Header */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8 border border-white/20">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <button
                  onClick={() => setMode("builder")}
                  className="flex items-center px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all mr-4"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Builder
                </button>
                <h1 className="text-2xl font-bold text-white">
                  {surveyData.title}
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                {isAutoSaving && (
                  <div className="flex items-center text-blue-300">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-300 mr-2"></div>
                    <span className="text-sm">Saving...</span>
                  </div>
                )}
                {lastSaved && !isAutoSaving && (
                  <div className="flex items-center text-green-300">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span className="text-sm">
                      Saved {lastSaved.toLocaleTimeString()}
                    </span>
                  </div>
                )}
                <div className="bg-white/20 rounded-full px-4 py-2 text-white font-medium">
                  {currentPage * questionsPerPage -
                    questionsPerPage +
                    currentQuestions.length}
                  /{surveyData.questions.length}
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-white/20 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <p className="text-white/80 text-sm mt-2">
              Page {currentPage} of {totalPages}
            </p>
          </div>

          {/* Questions */}
          <div className="space-y-8">
            {currentQuestions.map((question) => (
              <div
                key={question.id}
                className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/30"
              >
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    Question{" "}
                    {surveyData.questions.findIndex(
                      (q) => q.id === question.id
                    ) + 1}
                  </h2>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {question.title}
                    {question.type !== "CHECKBOX" && (
                      <span className="text-red-500 ml-1">*</span>
                    )}
                  </p>
                </div>

                <div className="mt-4">{renderQuestion(question)}</div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="mt-12 flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className="flex items-center px-6 py-3 bg-white/20 text-white rounded-xl hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 backdrop-blur-sm border border-white/30"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Previous
            </button>

            <div className="flex space-x-4">
              <button
                onClick={handleSave}
                className="flex items-center px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Save className="w-5 h-5 mr-2" />
                Save Progress
              </button>

              {currentPage === totalPages ? (
                <button
                  onClick={handleSave}
                  className="flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold"
                >
                  Submit Test
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Next
                  <ChevronRight className="w-5 h-5 ml-2" />
                </button>
              )}
            </div>
          </div>

          {/* Footer Info */}
          <div className="mt-8 text-center text-white/60 text-sm">
            <p>Your progress is automatically saved every 2 seconds</p>
          </div>
        </div>
      </div>
    );
  };

  return mode === "builder" ? <QuestionBuilder /> : <TestTaker />;
};

export default DynamicHRTestApp;
