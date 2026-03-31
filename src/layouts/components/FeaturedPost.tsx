
import type { Post } from "@/types/index";
import dateFormat from "@/lib/utils/dateFormat";
import { motion } from "motion/react";
import { cardVariants } from "@/lib/animations";

const FeaturedPost = ({ data }: { data: Post }) => {
  const { title, image, author, date } = data.frontmatter;

  return (
    <motion.div
      initial="initial"
      whileInView="visible"
      viewport={{ once: true, margin: "0px", amount: 0.05 }}
      variants={cardVariants}
      className="text-left relative bg-card/70 border border-border/6 rounded-3xl overflow-hidden w-full flex flex-col gap-0"
    >
      <PurpleGlow />

      {/* Hero Image */}
      <div className="p-5">
        <a href={`/blog/${data.slug}`}>
          <HeroImage image={image} title={title} />
        </a>
      </div>

      {/* Title */}
      <div className="px-6.5 sm:px-10 pt-6 pb-5">
        <a href={`/blog/${data.slug}`}>
          <h2 className="font-primary font-medium leading-[1.22] text-[22px] sm:text-[30px] lg:text-[36px] text-text hover:text-primary transition-colors duration-200">
            {title}
          </h2>
        </a>
      </div>

      {/* Divider */}
      <div className="mx-6.5 sm:mx-10 h-px bg-border/6" />

      {/* Author Row */}
      <div className="px-6.5 sm:px-10 py-5">
        <AuthorRow author={author} date={date} />
      </div>
    </motion.div>
  );
};

export default FeaturedPost;

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
          <g filter="url(#filter0_f_1_34)">
            <circle
              cx="272"
              cy="272"
              fill="url(#paint0_linear_1_34)"
              fillOpacity="0.12"
              r="172"
            />
          </g>
          <defs>
            <filter
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
              height="544"
              id="filter0_f_1_34"
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
              id="paint0_linear_1_34"
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

interface HeroImageProps {
  image?: string;
  title: string;
}

function HeroImage({ image, title }: HeroImageProps) {
  return (
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
    </div>
  );
}

interface AuthorInfoProps {
  name: string;
  designation?: string;
}

function AuthorInfo({ name, designation }: AuthorInfoProps) {
  return (
    <div className="flex flex-col shrink-0">
      <p className="font-primary font-medium leading-[1.33] text-text text-[18px] sm:text-[24px]">
        {name}
      </p>
      {designation && (
        <p className="font-primary font-normal leading-normal text-gray text-[13px] sm:text-[16px]">
          {designation}
        </p>
      )}
    </div>
  );
}

interface AuthorRowProps {
  author?: {
    name: string;
    avatar?: string;
    designation?: string;
  };
  date?: string;
}

function AuthorRow({ author, date }: AuthorRowProps) {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-3">
        {author?.avatar && (
          <div className="shrink-0 size-10 sm:size-12 rounded-full overflow-hidden">
            <img
              src={author.avatar}
              alt={author.name}
              width={48}
              height={48}
              className="object-cover size-full"
            />
          </div>
        )}
        {author && (
          <AuthorInfo name={author.name} designation={author.designation} />
        )}
      </div>
      {date && (
        <p className="font-primary font-normal text-gray text-[13px] sm:text-[16px] opacity-[0.78] whitespace-nowrap">
          {dateFormat(date)}
        </p>
      )}
    </div>
  );
}
