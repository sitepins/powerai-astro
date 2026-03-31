import MainContainer from "@/components/MainContainer";
import SectionHeader from "@/components/SectionHeader";
import { motion } from "motion/react";
import {
  staggerContainerVariants,
  staggerItemVariants,
} from "@/lib/animations";

interface PageData {
  notFound?: boolean;
  content?: string;
  frontmatter: {
    badge: string;
    title: string;
    features: {
      title: string;
      content: string;
      image: string;
    }[];
  };
}

const EssentialFeatures = ({ data }: { data: PageData }) => {
  const { badge, title } = data.frontmatter;

  return (
    <section>
      <MainContainer>
        <div className="container-padding-y container-padding-x">
          <SectionHeader title={title} badge={badge} />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px", amount: 0.1 }}
            variants={staggerContainerVariants}
            className="grid md:grid-cols-6 gap-2.5"
          >
            {data.frontmatter.features.map((feature, index) => {
              return (
                <motion.div
                  key={index}
                  variants={staggerItemVariants}
                  className={`${index <= 1 ? "md:col-span-3" : "md:col-span-3 lg:col-span-2"} border border-border/7 bg-gradient-dark rounded-3xl p-2.5 relative group overflow-hidden`}
                >
                  <svg
                    className="absolute top-2/5 left-1/2 -translate-1/2"
                    width="420"
                    height="420"
                    viewBox="0 0 420 420"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g filter="url(#filter0_f_35_7138)">
                      <circle
                        cx="210"
                        cy="210"
                        r="110"
                        fill="url(#paint0_linear_35_7138)"
                        fillOpacity="0.8"
                      />
                    </g>
                    <defs>
                      <filter
                        id="filter0_f_35_7138"
                        x="0"
                        y="0"
                        width="420"
                        height="420"
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                      >
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="BackgroundImageFix"
                          result="shape"
                        />
                        <feGaussianBlur
                          stdDeviation="50"
                          result="effect1_foregroundBlur_35_7138"
                        />
                      </filter>
                      <linearGradient
                        id="paint0_linear_35_7138"
                        x1="100"
                        y1="320"
                        x2="320"
                        y2="320"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#9A4DFE" />
                        <stop offset="1" stopColor="#E87CFF" />
                      </linearGradient>
                    </defs>
                  </svg>

                  <img
                    src={feature.image}
                    alt={feature.title}
                    width={570}
                    height={310}
                    className="w-full h-auto  object-cover relative z-1"
                  />
                  <div className="mt-6 px-6 pb-12 relative z-1">
                    <h3 className="text-h5 font-medium mb-5">
                      {feature.title}
                    </h3>
                    <p className="text-gray">{feature.content}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </MainContainer>
    </section>
  );
};

export default EssentialFeatures;
