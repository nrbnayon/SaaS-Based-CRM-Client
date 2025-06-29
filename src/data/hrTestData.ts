/** @format */

import type { Plan } from "@/types/allTypes";

export const candidateBarChartData = [
  { label: "Area", value: 75 },
  { label: "DET", value: 12 },
  { label: "PS", value: 35 },
  { label: "ADT", value: 55 },
  { label: "STM", value: 32 },
  { label: "ORG", value: 65 },
  { label: "CRE", value: 90 },
  { label: "EXE", value: 75 },
  { label: "PRI", value: 12 },
  { label: "LDR", value: 35 },
  { label: "HRM", value: 55 },
  { label: "MOT", value: 32 },
  { label: "COM", value: 65 },
  { label: "TWK", value: 90 },
  { label: "EMP", value: 65 },
  { label: "AST", value: 90 },
];

export const hrTestCardData = [
  {
    testId: "41515",
    title: "Production HR Test",
    description:
      "A comprehensive evaluation designed to assess the effectiveness and efficiency of Human Resource...",
    candidateCount: 34,
    rejectedCount: 24,
    approvedCount: 10,
  },
  {
    testId: "41520",
    title: "Production HR Test",
    description:
      "A comprehensive evaluation designed to assess the effectiveness and efficiency of Human Resource...",
    candidateCount: 54,
    rejectedCount: 24,
    approvedCount: 30,
  },
  {
    testId: "41515",
    title: "Production HR Test",
    description:
      "A comprehensive evaluation designed to assess the effectiveness and efficiency of Human Resource...",
    candidateCount: 24,
    rejectedCount: 10,
    approvedCount: 14,
  },
];

export const candidateList: Plan[] = [
  {
    id: 1,
    name: "Rafiul Hasan",
    phone: "+8801712345678",
    email: "rafiul@example.com",
    download: "https://example.com/files/rafiul.pdf",
    image: "https://i.pravatar.cc/150?img=1",
    progress: 45, // Fixed progress value
  },
  {
    id: 2,
    name: "Nusrat Jahan",
    phone: "+8801812345679",
    email: "nusrat@example.com",
    download: "https://example.com/files/nusrat.pdf",
    image: "https://i.pravatar.cc/150?img=2",
    progress: 60, // Fixed progress value
  },
  {
    id: 3,
    name: "Tanvir Ahmed",
    phone: "+8801912345680",
    email: "tanvir@example.com",
    download: "https://example.com/files/tanvir.pdf",
    image: "https://i.pravatar.cc/150?img=3",
    progress: 97, // Fixed progress value
  },
  {
    id: 4,
    name: "Sumaiya Akter",
    phone: "+8801512345681",
    email: "sumaiya@example.com",
    download: "https://example.com/files/sumaiya.pdf",
    image: "https://i.pravatar.cc/150?img=4",
    progress: 20, // Fixed progress value
  },
  {
    id: 5,
    name: "Sabbir Rahman",
    phone: "+8801612345682",
    email: "sabbir@example.com",
    download: "https://example.com/files/sabbir.pdf",
    image: "https://i.pravatar.cc/150?img=5",
    progress: 90, // Fixed progress value
  },
  {
    id: 6,
    name: "Jannatul Ferdous",
    phone: "+8801712345683",
    email: "jannatul@example.com",
    download: "https://example.com/files/jannatul.pdf",
    image: "https://i.pravatar.cc/150?img=6",
    progress: 35, // Fixed progress value
  },
  {
    id: 7,
    name: "Mahmudul Hasan",
    phone: "+8801812345684",
    email: "mahmudul@example.com",
    download: "https://example.com/files/mahmudul.pdf",
    image: "https://i.pravatar.cc/150?img=7",
    progress: 55, // Fixed progress value
  },
  {
    id: 8,
    name: "Farzana Yasmin",
    phone: "+8801912345685",
    email: "farzana@example.com",
    download: "https://example.com/files/farzana.pdf",
    image: "https://i.pravatar.cc/150?img=8",
    progress: 75, // Fixed progress value
  },
  {
    id: 9,
    name: "Hasan Mahmud",
    phone: "+8801512345686",
    email: "hasan@example.com",
    download: "https://example.com/files/hasan.pdf",
    image: "https://i.pravatar.cc/150?img=9",
    progress: 50, // Fixed progress value
  },
  {
    id: 10,
    name: "Nazia Haque",
    phone: "+8801612345687",
    email: "nazia@example.com",
    download: "https://example.com/files/nazia.pdf",
    image: "https://i.pravatar.cc/150?img=10",
    progress: 40, // Fixed progress value
  },
  {
    id: 11,
    name: "Shahriar Kabir",
    phone: "+8801712345688",
    email: "shahriar@example.com",
    download: "https://example.com/files/shahriar.pdf",
    image: "https://i.pravatar.cc/150?img=11",
    progress: 65, // Fixed progress value
  },
  {
    id: 12,
    name: "Ayesha Siddiqua",
    phone: "+8801812345689",
    email: "ayesha@example.com",
    download: "https://example.com/files/ayesha.pdf",
    image: "https://i.pravatar.cc/150?img=12",
    progress: 25, // Fixed progress value
  },
  {
    id: 13,
    name: "Rasel Mia",
    phone: "+8801912345690",
    email: "rasel@example.com",
    download: "https://example.com/files/rasel.pdf",
    image: "https://i.pravatar.cc/150?img=13",
    progress: 70, // Fixed progress value
  },
  {
    id: 14,
    name: "Tanjina Islam",
    phone: "+8801512345691",
    email: "tanjina@example.com",
    download: "https://example.com/files/tanjina.pdf",
    image: "https://i.pravatar.cc/150?img=14",
    progress: 85, // Fixed progress value
  },
  {
    id: 15,
    name: "Fahim Chowdhury",
    phone: "+8801612345692",
    email: "fahim@example.com",
    download: "https://example.com/files/fahim.pdf",
    image: "https://i.pravatar.cc/150?img=15",
    progress: 30, // Fixed progress value
  },
];

export const summaryData = [
  {
    id: 1,
    pair: "Pair 1",
    status: "Consistent",
    frequency: "3%",
    statusColor: "text-green-400",
    bgColor: "bg-[#27AE601A]",
  },
  {
    id: 2,
    pair: "Pair 2",
    status: "Slightly Varied",
    frequency: "3%",
    statusColor: "",
    bgColor: "",
  },
  {
    id: 3,
    pair: "Pair 3",
    status: "Moderately Varied",
    frequency: "3%",
    statusColor: "",
    bgColor: "",
  },
  {
    id: 4,
    pair: "Pair 4",
    status: "Mostly Consistent",
    frequency: "3%",
    statusColor: "text-green-400",
    bgColor: "bg-[#27AE601A]",
  },
  {
    id: 5,
    pair: "Pair 5",
    status: "Somewhat Inconsistent",
    frequency: "3%",
    statusColor: "",
    bgColor: "",
  },
  {
    id: 6,
    pair: "Pair 6",
    status: "Inconsistent",
    frequency: "3%",
    statusColor: "text-red-400",
    bgColor: "bg-[#E74C3C1A]",
  },
  {
    id: 7,
    pair: "Pair 7",
    status: "Highly Inconsistent",
    frequency: "5%",
    statusColor: "",
    bgColor: "",
  },
  {
    id: 8,
    pair: "Pair 8",
    status: "Contradictory",
    frequency: "0%",
    statusColor: "",
    bgColor: "",
  },
];
