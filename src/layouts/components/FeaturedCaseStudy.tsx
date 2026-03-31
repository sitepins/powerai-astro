
import type { CaseStudy } from "@/types/index";
import { plainify } from "@/lib/utils/textConverter";
import { useState } from "react";
import { motion } from "motion/react";
import { cardVariants } from "@/lib/animations";
import VideoModal from "./VideoModal";

const FeaturedCaseStudy = ({
  data,
  hideButton = false,
  disableLink = true,
}: {
  data: CaseStudy;
  hideButton?: boolean;
  disableLink?: boolean;
}) => {
  const [showModal, setShowModal] = useState(false);
  if (!data) return null;

  const { title, image, logo, description, review_video } = data.frontmatter;
  const caseStudyPath = `/case-studies/${data.slug}`;
  const excerpt = description || plainify(data.content || "");

  return (
    <motion.div
      initial="initial"
      whileInView="visible"
      viewport={{ once: true, margin: "0px", amount: 0.05 }}

      variants={cardVariants}
      className="relative bg-card/70 border border-border/6 rounded-3xl overflow-hidden w-full text-left"
    >
      <PurpleGlow />

      <div className="p-2.5">
        {disableLink ? (
          <div className="block">
            <div className="rounded-3xl overflow-hidden bg-dark/10 w-full aspect-1150/600 relative">
              {image ? (
                <img
                  src={image}
                  alt={title}
                  width={1150}
                  height={600}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray">
                  <span className="text-sm">No image available</span>
                </div>
              )}

              {/* Dark overlay with gradient */}
              <div className="absolute inset-0 bg-linear-to-b from-black/20 via-black/30 to-black/60" />
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage:
                    "linear-gradient(242.2deg, rgba(21, 16, 25, 0.16) 5.4%, rgba(21, 16, 25, 0.42) 23%)",
                }}
              />

              {logo && (
                <div className="absolute left-4 sm:left-6 top-4 sm:top-6 z-5">
                  <img
                    src={logo}
                    alt={`${title} logo`}
                    width={280}
                    height={80}
                    className="h-7 sm:h-10 w-auto object-contain"
                  />
                </div>
              )}

              {review_video && (
                <button
                  type="button"
                  onClick={() => setShowModal(true)}
                  className="absolute inset-0 flex items-center justify-center z-10 cursor-pointer group/play"
                  aria-label="Play video"
                >
                  <PlayButton />
                </button>
              )}
              {!review_video && <PlayButton />}
            </div>
          </div>
        ) : (
          <a href={caseStudyPath} className="block">
            <div className="rounded-3xl overflow-hidden bg-dark/10 w-full aspect-1150/600 relative">
              {image ? (
                <img
                  src={image}
                  alt={title}
                  width={1150}
                  height={600}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray">
                  <span className="text-sm">No image available</span>
                </div>
              )}

              {/* Dark overlay with gradient */}
              <div className="absolute inset-0 bg-linear-to-b from-black/20 via-black/30 to-black/60" />
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage:
                    "linear-gradient(242.2deg, rgba(21, 16, 25, 0.16) 5.4%, rgba(21, 16, 25, 0.42) 23%)",
                }}
              />

              {logo && (
                <div className="absolute left-4 sm:left-6 top-4 sm:top-6 z-5">
                  <img
                    src={logo}
                    alt={`${title} logo`}
                    width={280}
                    height={80}
                    className="h-7 sm:h-10 w-auto object-contain"
                  />
                </div>
              )}

              {review_video && (
                <button
                  type="button"
                  onClick={() => setShowModal(true)}
                  className="absolute inset-0 flex items-center justify-center z-10 cursor-pointer group/play"
                  aria-label="Play video"
                >
                  <PlayButton />
                </button>
              )}
              {!review_video && <PlayButton />}
            </div>
          </a>
        )}
      </div>

      <div className="px-5 sm:px-8 lg:px-10 pb-6 sm:pb-8 pt-4 sm:pt-6 grid lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-5 lg:gap-10">
        {disableLink ? (
          <h2 className="font-primary font-medium text-text leading-[1.15] text-h3 sm:text-h2 lg:text-h1 transition-colors duration-200">
            {title}
          </h2>
        ) : (
          <a href={caseStudyPath}>
            <h2 className="font-primary font-medium text-text leading-[1.15] text-h3 sm:text-h2 lg:text-h1 hover:text-primary transition-colors duration-200">
              {title}
            </h2>
          </a>
        )}

        <div className="lg:pb-1">
          <p className="text-gray text-base sm:text-lg leading-relaxed line-clamp-4">
            {excerpt}
          </p>
          {!hideButton && (
            <a
              href={caseStudyPath}
              className="mt-5 inline-flex items-center justify-center rounded-full border border-border/6 bg-gradient-dark px-5 py-2.5 text-base font-medium text-text"
            >
              Read Case Study
            </a>
          )}
        </div>
      </div>

      {/* Video Modal */}
      {showModal && review_video && (
        <VideoModal
          videoUrl={review_video}
          onClose={() => setShowModal(false)}
        />
      )}
    </motion.div>
  );
};

export default FeaturedCaseStudy;

function PurpleGlow() {
  return (
    <div className="absolute -translate-x-1/2 left-1/2 w-86 h-86 -top-48.75 pointer-events-none">
      <div className="absolute inset-[-29.07%]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 544 544"
        >
          <g filter="url(#filter0_f_featured_case_study)">
            <circle
              cx="272"
              cy="272"
              fill="url(#paint0_linear_featured_case_study)"
              fillOpacity="0.12"
              r="172"
            />
          </g>
          <defs>
            <filter
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
              height="544"
              id="filter0_f_featured_case_study"
              width="544"
              x="0"
              y="0"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                in="SourceGraphic"
                in2="BackgroundImageFix"
                mode="normal"
                result="shape"
              />
              <feGaussianBlur
                result="effect1_foregroundBlur_1_34"
                stdDeviation="50"
              />
            </filter>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id="paint0_linear_featured_case_study"
              x1="100"
              x2="444"
              y1="444"
              y2="444"
            >
              <stop stopColor="var(--color-primary)" />
              <stop offset="1" stopColor="var(--color-secondary)" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function PlayButton() {
  return (
    <div className="flex items-center justify-center pointer-events-none group-hover/play:scale-110 transition-transform duration-300 ease-out">
      <div className="size-20 sm:size-24 rounded-full bg-light flex items-center justify-center border border-border/10 shadow-lg">
        <svg
          width="33"
          height="35"
          viewBox="0 0 33 35"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.1885 5.38971C23.5906 7.32238 26.264 8.84115 28.1685 10.2324C30.086 11.6332 31.5044 13.0972 32.0123 15.0276C32.3848 16.443 32.3848 17.9322 32.0123 19.3476C31.5044 21.278 30.086 22.742 28.1685 24.1428C26.264 25.5341 23.5906 27.0528 20.1888 28.9855C16.9025 30.8524 14.1313 32.4268 12.0275 33.3218C9.90688 34.2237 7.97352 34.681 6.0945 34.1485C4.71358 33.757 3.45711 33.0143 2.44492 31.993C1.07123 30.6072 0.519813 28.6916 0.258938 26.3864C-4.13197e-05 24.0978 -2.04596e-05 21.1022 3.73702e-07 17.292V17.0833C-2.04596e-05 13.273 -4.13197e-05 10.2774 0.258938 7.98896C0.519813 5.68367 1.07123 3.76807 2.44492 2.38211C3.45711 1.3609 4.71358 0.618172 6.0945 0.22686C7.97352 -0.305598 9.90688 0.151568 12.0275 1.05357C14.1313 1.94838 16.9025 3.52271 20.1885 5.38971Z"
            fill="url(#paint0_linear_35_11220)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_35_11220"
              x1="16.1458"
              y1="0"
              x2="16.1458"
              y2="34.3753"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#DF53FE" />
              <stop offset="1" stopColor="#8F2FFE" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}
