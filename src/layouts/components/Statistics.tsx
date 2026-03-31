
import Counter from "./Counter";

import theme from "@/config/theme.json";
import { motion } from "motion/react";
import {
  staggerContainerVariants,
  staggerItemVariants,
} from "@/lib/animations";

interface PageData {
  notFound?: boolean;
  content?: string;
  frontmatter: {
    enable: boolean;
    stats_list: {
      label: string;
      value: {
        prefix: string;
        suffix: string;
        number: number;
      };
    }[];
  };
}

const Statistics = ({ data }: { data: PageData }) => {
  const primaryColor = theme?.colors?.default?.theme_color?.primary;
  const secondaryColor = theme?.colors?.default?.theme_color?.secondary;

  return (
    data.frontmatter.enable && (
      <section>
        <div className="main-container"><div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px", amount: 0.1 }}
            variants={staggerContainerVariants}
            className="py-12.5 grid sm:grid-cols-2 lg:grid-cols-4 gap-2.5 container-padding-x"
          >
            {data.frontmatter.stats_list.map((item, index) => (
              <motion.div
                key={index}
                variants={staggerItemVariants}
                className="border border-border/6 py-10 px-12 rounded-2xl text-center bg-card relative overflow-hidden"
              >
                <div className="relative z-1">
                  <h3 className="text-[60px] font-light">
                    <Counter
                      target={item.value.number}
                      prefix={item.value.prefix}
                      suffix={item.value.suffix}
                    />
                  </h3>
                  <p className="text-text">{item.label}</p>
                </div>

                <svg
                  className="absolute bottom-0 left-1/2 -translate-x-1/2"
                  width="288"
                  height="160"
                  viewBox="0 0 288 160"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_f_35_7008)">
                    <circle
                      cx="144"
                      cy="210"
                      r="110"
                      fill="url(#paint0_linear_35_7008)"
                      fillOpacity="0.2"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_f_35_7008"
                      x="-66"
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
                        result="effect1_foregroundBlur_35_7008"
                      />
                    </filter>
                    <linearGradient
                      id="paint0_linear_35_7008"
                      x1="34"
                      y1="320"
                      x2="254"
                      y2="320"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop
                        stopColor={primaryColor ? primaryColor : "#9A4DFE"}
                      />
                      <stop
                        offset="1"
                        stopColor={secondaryColor ? secondaryColor : "#E87CFF"}
                      />
                    </linearGradient>
                  </defs>
                </svg>
              </motion.div>
            ))}
          </motion.div>
        </div></div>
      </section>
    )
  );
};

export default Statistics;
