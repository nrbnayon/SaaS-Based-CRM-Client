// import React, { useState, useEffect } from "react";
// import { ChevronLeft, ChevronRight, Save, CheckCircle } from "lucide-react";

// const HRTestApp = () => {
//   // Sample data structure - in real app this would come from API
//   const sampleQuestions = {
//     title: "HR Assessment Test",
//     questions: Array.from({ length: 150 }, (_, i) => ({
//       id: i + 1,
//       title:
//         i < 50
//           ? "When you are given a challenging goal, how do you react?"
//           : i < 100
//           ? "How do you handle workplace conflicts?"
//           : "What motivates you most in your work environment?",
//       type: "MULTIPLE_CHOICE",
//       options: ["Casual", "Indifferent", "Precise", "Aggressive"],
//     })),
//   };

//   const questionsPerPage = 4;
//   const totalPages = Math.ceil(
//     sampleQuestions.questions.length / questionsPerPage
//   );

//   const [currentPage, setCurrentPage] = useState(1);
//   const [answers, setAnswers] = useState({});
//   const [isAutoSaving, setIsAutoSaving] = useState(false);
//   const [lastSaved, setLastSaved] = useState(null);

//   // Auto-save functionality
//   useEffect(() => {
//     const autoSave = setTimeout(() => {
//       if (Object.keys(answers).length > 0) {
//         setIsAutoSaving(true);
//         // Simulate API call
//         setTimeout(() => {
//           setIsAutoSaving(false);
//           setLastSaved(new Date());
//         }, 500);
//       }
//     }, 2000);

//     return () => clearTimeout(autoSave);
//   }, [answers]);

//   const getCurrentPageQuestions = () => {
//     const startIndex = (currentPage - 1) * questionsPerPage;
//     const endIndex = Math.min(
//       startIndex + questionsPerPage,
//       sampleQuestions.questions.length
//     );
//     return sampleQuestions.questions.slice(startIndex, endIndex);
//   };

//   const handleAnswerChange = (questionId, value) => {
//     setAnswers((prev) => ({
//       ...prev,
//       [questionId]: value,
//     }));
//   };

//   const handleNext = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage((prev) => prev + 1);
//     }
//   };

//   const handlePrevious = () => {
//     if (currentPage > 1) {
//       setCurrentPage((prev) => prev - 1);
//     }
//   };

//   const handleSave = () => {
//     setIsAutoSaving(true);
//     // Simulate API call
//     setTimeout(() => {
//       setIsAutoSaving(false);
//       setLastSaved(new Date());
//       alert("Test saved successfully!");
//     }, 1000);
//   };

//   const progressPercentage = ((currentPage - 1) / (totalPages - 1)) * 100;
//   const currentQuestions = getCurrentPageQuestions();

//   const renderQuestion = (question) => {
//     switch (question.type) {
//       case "SHORT_ANSWER":
//         return (
//           <input
//             type="text"
//             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//             placeholder="Type your answer here..."
//             value={answers[question.id] || ""}
//             onChange={(e) => handleAnswerChange(question.id, e.target.value)}
//           />
//         );

//       case "PARAGRAPH":
//         return (
//           <textarea
//             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all min-h-[120px] resize-vertical"
//             placeholder="Type your detailed answer here..."
//             value={answers[question.id] || ""}
//             onChange={(e) => handleAnswerChange(question.id, e.target.value)}
//           />
//         );

//       case "MULTIPLE_CHOICE":
//         return (
//           <div className="space-y-3">
//             {question.options.map((option, index) => (
//               <label
//                 key={index}
//                 className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-all group"
//               >
//                 <input
//                   type="radio"
//                   name={`question-${question.id}`}
//                   value={option}
//                   checked={answers[question.id] === option}
//                   onChange={(e) =>
//                     handleAnswerChange(question.id, e.target.value)
//                   }
//                   className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
//                 />
//                 <span className="ml-3 text-gray-700 group-hover:text-gray-900">
//                   {option}
//                 </span>
//               </label>
//             ))}
//           </div>
//         );

//       case "CHECKBOX":
//         return (
//           <div className="space-y-3">
//             {question.options.map((option, index) => (
//               <label
//                 key={index}
//                 className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-all group"
//               >
//                 <input
//                   type="checkbox"
//                   value={option}
//                   checked={(answers[question.id] || []).includes(option)}
//                   onChange={(e) => {
//                     const currentAnswers = answers[question.id] || [];
//                     if (e.target.checked) {
//                       handleAnswerChange(question.id, [
//                         ...currentAnswers,
//                         option,
//                       ]);
//                     } else {
//                       handleAnswerChange(
//                         question.id,
//                         currentAnswers.filter((a) => a !== option)
//                       );
//                     }
//                   }}
//                   className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//                 />
//                 <span className="ml-3 text-gray-700 group-hover:text-gray-900">
//                   {option}
//                 </span>
//               </label>
//             ))}
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
//       <div className="container mx-auto px-4 py-8 max-w-4xl">
//         {/* Header */}
//         <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8 border border-white/20">
//           <div className="flex justify-between items-center mb-4">
//             <h1 className="text-2xl font-bold text-white">
//               {sampleQuestions.title}
//             </h1>
//             <div className="flex items-center space-x-4">
//               {isAutoSaving && (
//                 <div className="flex items-center text-blue-300">
//                   <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-300 mr-2"></div>
//                   <span className="text-sm">Saving...</span>
//                 </div>
//               )}
//               {lastSaved && !isAutoSaving && (
//                 <div className="flex items-center text-green-300">
//                   <CheckCircle className="w-4 h-4 mr-2" />
//                   <span className="text-sm">
//                     Saved {lastSaved.toLocaleTimeString()}
//                   </span>
//                 </div>
//               )}
//               <div className="bg-white/20 rounded-full px-4 py-2 text-white font-medium">
//                 {currentPage * questionsPerPage -
//                   questionsPerPage +
//                   currentQuestions.length}
//                 /{sampleQuestions.questions.length}
//               </div>
//             </div>
//           </div>

//           {/* Progress Bar */}
//           <div className="w-full bg-white/20 rounded-full h-2">
//             <div
//               className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
//               style={{ width: `${progressPercentage}%` }}
//             ></div>
//           </div>
//           <p className="text-white/80 text-sm mt-2">
//             Page {currentPage} of {totalPages}
//           </p>
//         </div>

//         {/* Questions */}
//         <div className="space-y-8">
//           {currentQuestions.map((question, index) => (
//             <div
//               key={question.id}
//               className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/30"
//             >
//               <div className="mb-6">
//                 <h2 className="text-xl font-semibold text-gray-800 mb-2">
//                   Question {question.id}
//                 </h2>
//                 <p className="text-gray-700 text-lg leading-relaxed">
//                   {question.title}
//                   {question.type !== "CHECKBOX" && (
//                     <span className="text-red-500 ml-1">*</span>
//                   )}
//                 </p>
//               </div>

//               <div className="mt-4">{renderQuestion(question)}</div>
//             </div>
//           ))}
//         </div>

//         {/* Navigation */}
//         <div className="mt-12 flex justify-between items-center">
//           <button
//             onClick={handlePrevious}
//             disabled={currentPage === 1}
//             className="flex items-center px-6 py-3 bg-white/20 text-white rounded-xl hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 backdrop-blur-sm border border-white/30"
//           >
//             <ChevronLeft className="w-5 h-5 mr-2" />
//             Previous
//           </button>

//           <div className="flex space-x-4">
//             <button
//               onClick={handleSave}
//               className="flex items-center px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-200 shadow-lg hover:shadow-xl"
//             >
//               <Save className="w-5 h-5 mr-2" />
//               Save Progress
//             </button>

//             {currentPage === totalPages ? (
//               <button
//                 onClick={handleSave}
//                 className="flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold"
//               >
//                 Submit Test
//               </button>
//             ) : (
//               <button
//                 onClick={handleNext}
//                 className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl"
//               >
//                 Next
//                 <ChevronRight className="w-5 h-5 ml-2" />
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Footer Info */}
//         <div className="mt-8 text-center text-white/60 text-sm">
//           <p>Your progress is automatically saved every 2 seconds</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HRTestApp;
