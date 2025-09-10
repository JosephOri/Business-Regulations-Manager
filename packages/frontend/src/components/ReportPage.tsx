import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import remarkGfm from "remark-gfm";

type Props = {
  reportContent: string;
};

const ReportPage = ({ reportContent }: Props) => {
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
    <div className="mx-auto max-w-4xl rounded-lg bg-white p-8 shadow-lg">
      <h1 className="mb-6 border-b pb-4 text-right text-3xl font-bold text-gray-800">
        דוח תאימות רגולטורית
      </h1>

      <article
        dir="rtl"
        className="prose prose-lg prose-p:my-4 prose-headings:font-bold prose-h2:text-2xl prose-h2:border-b prose-h2:pb-2 prose-h2:mb-4 prose-h2:mt-8 prose-strong:font-extrabold prose-strong:text-slate-900 prose-ul:pr-6 prose-ol:pr-6 max-w-none"
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {reportContent}
        </ReactMarkdown>
      </article>

      <div className="mt-8 text-right">
        <Link
          to="/"
          className="inline-block rounded-lg bg-blue-600 px-5 py-2 font-bold text-white transition-colors hover:bg-blue-700"
        >
          חזרה לטופס
        </Link>
      </div>
    </div>
  );
};

export default ReportPage;
