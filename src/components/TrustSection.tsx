import React from 'react';

const REVIEWS = [
  {
    quote: "We had a live site in under a week. I still don't understand how they pulled that off.",
    author: "Trace Holcomb, Co-Founder, Hunter Real Estate Group"
  },
  {
    quote: "The assistant catches leads at midnight that used to just sit in a general inbox until Monday.",
    author: "Chris Charboneau, Co-Founder, Hunter Real Estate Group"
  },
  {
    quote: "I got quotes from three agencies before I came close on price, and none of them came close on quality.",
    author: "Mr. Byrne, Owner, Byrne Company"
  },
  {
    quote: "It's the first site we've had that actually makes us money instead of just costing us money.",
    author: "Scott Carlson, Broker, Scott Carlson Real Estate"
  },
  {
    quote: "The whole process was simple. They handled everything, and we didn't have to worry about a thing.",
    author: "RER Solutions Manager, RER Solutions"
  }
];

export const TrustSection: React.FC = () => {
  return (
    <section className="relative w-full bg-[#000000] py-16 sm:py-24 md:py-28 border-t border-[var(--border-color)] overflow-hidden transition-colors duration-300">
      <div className="w-full max-w-[1800px] mx-auto px-5 sm:px-8 md:px-12 mb-10 sm:mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between">
          <div>
            <h2 className="font-headline font-bold text-white text-[clamp(1.35rem,4.5vw,2rem)] md:text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] md:leading-[0.9] tracking-[-0.03em]">
              A partner you can trust.
            </h2>
          </div>
        </div>
      </div>

      {/* Marquee Container with fade masks */}
      <div className="marquee-parent-container relative w-full overflow-hidden py-4 select-none">
        {/* Soft edge gradient fades */}
        <div className="hidden md:block absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="hidden md:block absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        {/* Dual Synchronized Pure CSS Infinite Tracks */}
        <div className="flex w-max">
          {/* Primary Track */}
          <div className="flex shrink-0 items-start gap-[60px] animate-infinite-scroll pr-[60px]">
            {REVIEWS.map((review, idx) => (
              <div
                key={`primary-${idx}`}
                className="w-[320px] sm:w-[450px] md:w-[600px] shrink-0 whitespace-normal flex flex-col justify-center text-left"
              >
                <blockquote className="font-headline font-bold text-white text-[clamp(1rem,2.2vw,1.45rem)] md:text-[clamp(1.15rem,2.5vw,1.55rem)] leading-[1.3] tracking-tight mb-3">
                  "{review.quote}"
                </blockquote>
                <cite className="not-italic font-sans text-[11px] sm:text-[13px] md:text-sm text-[#8A8A8A] font-medium tracking-normal">
                  — {review.author}
                </cite>
              </div>
            ))}
          </div>

          {/* Secondary Track (Seamless Loop Follower) */}
          <div className="flex shrink-0 items-start gap-[60px] animate-infinite-scroll pr-[60px]" aria-hidden="true">
            {REVIEWS.map((review, idx) => (
              <div
                key={`secondary-${idx}`}
                className="w-[320px] sm:w-[450px] md:w-[600px] shrink-0 whitespace-normal flex flex-col justify-center text-left"
              >
                <blockquote className="font-headline font-bold text-white text-[clamp(1rem,2.2vw,1.45rem)] md:text-[clamp(1.15rem,2.5vw,1.55rem)] leading-[1.3] tracking-tight mb-3">
                  "{review.quote}"
                </blockquote>
                <cite className="not-italic font-sans text-[11px] sm:text-[13px] md:text-sm text-[#8A8A8A] font-medium tracking-normal">
                  — {review.author}
                </cite>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
