import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";

type Props = {
  reportContent: string;
};

export const ReportPage: React.FC<Props> = ({ reportContent }) => {
  if (!reportContent) {
    return (
      <div className="rounded-lg bg-white p-8 text-center shadow-md">
        <p className="text-red-500">לא נמצא תוכן להצגה.</p>
        <Link
          to="/"
          className="mt-4 inline-block text-blue-500 hover:underline"
        >
          חזור לטופס
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl rounded-lg bg-white p-8 text-right shadow-md">
      <h1 className="mb-6 border-b pb-4 text-3xl font-bold text-gray-800">
        דוח תאימות רגולטורית
      </h1>
      <article className="prose prose-lg prose-p:text-right prose-headings:text-right prose-li:text-right max-w-none">
        <ReactMarkdown>{reportContent}</ReactMarkdown>
      </article>
      <Link
        to="/"
        className="mt-8 inline-block rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      >
        חזור לטופס
      </Link>
    </div>
  );
};
