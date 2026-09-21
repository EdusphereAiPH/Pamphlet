import Image from "next/image";

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <Image
        src="/brand/edusphere-mark-white.png"
        alt=""
        width={952}
        height={777}
        priority
        className="h-7 w-auto"
      />
      <span className="text-[15px] font-semibold tracking-[-0.02em]">EduSphere</span>
      <span className="rounded-[5px] border border-current/40 px-1 text-[10px] font-medium leading-[1.5]">AI</span>
    </span>
  );
}
