import { useState } from "react";
import { AudioUploader } from "@/components/AudioUploader";
import { LanguageSelect } from "@/components/LanguageSelect";
import { FilenameInput } from "@/components/FilenameInput";
import { TranscriptionResult } from "@/components/TranscriptionResult";
import { Button } from "@/components/ui/button";
import { Sparkles, Wand2, Mic2, FileText, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [language, setLanguage] = useState("vi");
  const [filename, setFilename] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcription, setTranscription] = useState("");
  const { toast } = useToast();

  const handleConvert = async () => {
    if (!selectedFile) {
      toast({
        title: "Vui lòng chọn file",
        description: "Bạn cần tải lên file audio trước khi chuyển đổi.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate processing - in real app, this would call the API
    await new Promise((resolve) => setTimeout(resolve, 3000));
    
    // Demo result
    const demoText = `Đây là kết quả chuyển đổi mẫu từ file audio "${selectedFile.name}".

Trong ứng dụng thực tế, bạn cần kết nối với dịch vụ AI như OpenAI Whisper hoặc Google Speech-to-Text để thực hiện chuyển đổi thực sự.

Ngôn ngữ được chọn: ${language === "auto" ? "Tự động nhận diện" : language}

Tính năng của công cụ:
• Hỗ trợ nhiều định dạng audio phổ biến
• Nhận diện tự động ngôn ngữ
• Tải về file text với tên tùy chọn
• Giao diện thân thiện, dễ sử dụng`;

    setTranscription(demoText);
    setIsProcessing(false);
    
    toast({
      title: "Chuyển đổi thành công!",
      description: "File audio đã được chuyển thành văn bản.",
    });
  };

  const features = [
    { icon: Mic2, title: "Đa định dạng", desc: "MP3, WAV, M4A, FLAC..." },
    { icon: Zap, title: "Nhanh chóng", desc: "Xử lý trong vài giây" },
    { icon: FileText, title: "Xuất file", desc: "Tải về dạng TXT" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.15),transparent_50%)]" />
        <div className="container mx-auto px-4 py-12 md:py-20 relative">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in">
              <Sparkles className="w-4 h-4" />
              Công cụ AI chuyển đổi giọng nói
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Chuyển đổi{" "}
              <span className="gradient-text">Audio</span>
              <br />
              thành Văn bản
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Tải lên file audio và nhận ngay văn bản chính xác.
              <br className="hidden md:block" />
              Hỗ trợ đa ngôn ngữ, nhanh chóng và tiện lợi.
            </p>
          </div>

          {/* Features */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-3 px-5 py-3 rounded-xl bg-card border border-border"
              >
                <feature.icon className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-semibold text-foreground text-sm">{feature.title}</p>
                  <p className="text-xs text-muted-foreground">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Tool Section */}
      <div className="container mx-auto px-4 pb-20">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Upload */}
          <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <AudioUploader
              onFileSelect={setSelectedFile}
              selectedFile={selectedFile}
              isProcessing={isProcessing}
            />
          </div>

          {/* Options */}
          {selectedFile && (
            <div className="glass-card rounded-2xl p-6 space-y-6 animate-fade-in">
              <div className="grid md:grid-cols-2 gap-6">
                <LanguageSelect value={language} onChange={setLanguage} />
                <FilenameInput value={filename} onChange={setFilename} />
              </div>

              <Button
                onClick={handleConvert}
                disabled={isProcessing}
                className="w-full h-14 text-lg btn-gradient rounded-xl"
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                    Đang xử lý...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-5 h-5 mr-2" />
                    Bắt đầu chuyển đổi
                  </>
                )}
              </Button>
            </div>
          )}

          {/* Result */}
          {transcription && (
            <TranscriptionResult
              text={transcription}
              filename={filename || "transcript"}
            />
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm">
            Audio to Text Converter — Công cụ chuyển đổi giọng nói thành văn bản
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
