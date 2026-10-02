import { Check, Layout } from "lucide-react";
import { useState } from "react";

function TemplateSelector({ selectedTemplate, onSelectTemplate }) {
  const [isOpen, setIsOpen] = useState(false);

  const templates = [
    {
      id: "classic",
      name: "Classic",
      description: "A traditional resume layout with a clean design.",
    },
    {
      id: "modern",
      name: "Modern",
      description: "A contemporary design with a focus on typography.",
    },
    {
      id: "minimal",
      name: "Minimal",
      description: "A simple and elegant layout with minimal distractions.",
    },
    {
      id: "minimal-image",
      name: "Minimal",
      description: "A minimal layout that includes a profile image.",
    },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-sm text-blue-600 bg-gradient-to-br from-blue-50 to-blue-100 ring-blue-300 hover:ring transition-all px-3 py-2 rounded-lg"
      >
        <Layout size={16} />{" "}
        <span className="max-sm:hidden">Select Template</span>
      </button>

      {isOpen && (
        <div className="absolute top-full w-xm p-3 mt-2 space-y-3 z-10 bg-white rounded-md border border-gray-200 shadow-sm">
          {templates.map((template) => (
            <div
              key={template.id}
              onClick={() => {
                onSelectTemplate(template.id);
                setIsOpen(false);
              }}
              className={`relative p-3 border rounded-md cursor-pointer transition-all ${selectedTemplate === template.id ? "border-blue-400 bg-blue-100" : "border-gray-300 hover:border-gray-400 hover:bg-gray-100"}`}
            >
              {selectedTemplate === template.id && (
                <div className="absolute top-2 right-2">
                  <div className="size-5 bg-blue-400 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                </div>
              )}

              <div className="space-y-1  ">
                <h4 className="font-medium text-gray-800">{template.name}</h4>
                <div className="mt-2 p-2 bg-blue-50 rounded text-sm text-gray-500 italic">
                  {template.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TemplateSelector;
