import { Copy, Download, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface TranscriptionResultProps {
  text: string;
  filename: string;
}

export const TranscriptionResult = ({ text, filename }: TranscriptionResultProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${filename || "transcript"}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="glass-card rounded-2xl p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-semibold text-lg text-foreground">
          Kết quả chuyển đổi
        </h3>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="gap-2"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-accent" />
                Đã sao chép
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Sao chép
              </>
            )}
          </Button>
          <Button
            onClick={handleDownload}
            size="sm"
            className="btn-gradient gap-2"
          >
            <Download className="w-4 h-4" />
            Tải về
          </Button>
        </div>
      </div>
      <div className="bg-muted/50 rounded-xl p-4 max-h-64 overflow-y-auto">
        <p className="text-foreground whitespace-pre-wrap leading-relaxed">
          {text}
        </p>
      </div>
    </div>
  );
};
