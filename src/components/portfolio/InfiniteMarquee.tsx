"use client";

type Props = {
  text: string;
  separator?: string;
  className?: string;
};

export function InfiniteMarquee({
  text,
  separator = " \u2022 ",
  className,
}: Props) {
  const repeatedText = `${text}${separator}`.repeat(10);

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className ?? ""}`}>
      <div className="animate-marquee inline-flex">
        <span className="text-[80px] font-bold uppercase tracking-wide text-text-primary/10 md:text-[120px]">
          {repeatedText}
        </span>
        <span className="text-[80px] font-bold uppercase tracking-wide text-text-primary/10 md:text-[120px]">
          {repeatedText}
        </span>
      </div>
    </div>
  );
}
