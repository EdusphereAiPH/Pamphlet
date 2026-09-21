import Image from "next/image";

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Image
        src="/brand/edusphere-mark-white.png"
        alt=""
        width={952}
        height={777}
        priority
        className="h-7 w-auto"
      />
      <span className="text-[15px] font-medium tracking-tight">
        EduSphere <span className="text-muted-dark">AI</span>
      </span>
    </span>
  );
}
