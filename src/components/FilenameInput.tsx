import { Input } from "@/components/ui/input";
import { FileText } from "lucide-react";

interface FilenameInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const FilenameInput = ({ value, onChange }: FilenameInputProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground flex items-center gap-2">
        <FileText className="w-4 h-4 text-primary" />
        Tên file tải về
      </label>
      <div className="flex items-center gap-2">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="transcript"
          className="flex-1 h-12 bg-card border-border text-foreground placeholder:text-muted-foreground"
        />
        <span className="text-muted-foreground font-medium">.txt</span>
      </div>
    </div>
  );
};
