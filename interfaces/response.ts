interface Source {
  title: string;
  image: string;
}

interface ContentItem {
  topic_id: number;
  title: string;
  description: string;
  source: Source;
  publishedDate: string;
  link: string;
  image: string;
  category: string;
  newsId: string;
}

interface NewsSection {
  section_id: number;
  section_name: string;
  section_layout: string;
  section_type: "news";
  content: ContentItem[];
}

interface GameContentItem {
  id: number;
  title: string;
  category: string;
  url: string;
  order: number;
  script: string;
  status: string;
  goal: string;
  instruction: null;
  isMuted: boolean;
  createdAt: string;
  updatedAt: string;
}

interface GamesSection {
  section_id: number;
  section_name: string;
  section_layout: string;
  section_type: "games";
  content: GameContentItem[];
}

interface QuizContentItem {
  id: number;
  title: string;
  social_proof_count: number;
  content_type: "Quiz";
}

interface QuizSection {
  section_id: number;
  section_layout: string;
  section_type: "Quiz";
  content: QuizContentItem[];
}

interface FlightContentItem {
  id: number;
  title: string;
  description: string;
  content_type: "Audio" | "Video" | "Article";
  content_type_title: "Listening" | "Watching" | "Reading";
  url?: string;
  source_id: number;
  format_id: number;
  section_id: number;
  source: string;
  format: "Listening" | "Watching" | "Reading";
}

interface FlightSection {
  points: number;
  section_id: number;
  section_name: string;
  section_layout: string;
  section_type: "Flight";
  content: FlightContentItem[];
}

type Section = NewsSection | GamesSection | QuizSection | FlightSection;

// const array: Section[] = /* Your array */;
