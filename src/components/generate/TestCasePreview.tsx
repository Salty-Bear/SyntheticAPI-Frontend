
import React from "react";
import { Download } from "lucide-react";

interface TestCasePreviewProps {
  output_data?: any;
}

const TestCasePreview: React.FC<TestCasePreviewProps> = ({ output_data }) => {
  if (!output_data) {
    return null;
  }

  const handleDownload = () => {
    const dataStr = JSON.stringify(output_data, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "test-cases.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="rounded border p-4 bg-gray-50 mt-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold">Test Case Preview</h3>
        <button
          onClick={handleDownload}
          className="flex items-center gap-1 px-2 py-1 rounded bg-blue-500 hover:bg-blue-600 text-white text-xs"
          title="Download test cases as JSON"
        >
          <Download className="h-4 w-4" /> Download
        </button>
      </div>
      <pre className="whitespace-pre-wrap text-sm overflow-x-auto">
        {JSON.stringify(output_data, null, 2)}
      </pre>
    </div>
  );
};

export default TestCasePreview;
