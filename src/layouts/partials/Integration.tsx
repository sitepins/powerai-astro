import AnimatedButton from "@/components/AnimatedButton";
import MainContainer from "@/components/MainContainer";
import SectionHeader from "@/components/SectionHeader";
import type { Button } from "@/types/index";
import { motion } from "motion/react";
import { useState } from "react";
import { sectionHeaderVariants } from "@/lib/animations";

interface PageData {
  notFound?: boolean;
  content?: string;
  frontmatter: {
    badge: string;
    title: string;
    list: string[];
    button: Button;
  };
}

const Integration = ({ data }: { data: PageData }) => {
  const { badge, title, list, button } = data.frontmatter;
  const [introStarted, setIntroStarted] = useState(false);
  const [spinStarted, setSpinStarted] = useState(false);

  // Use all items (duplicated to reduce gap)
  const normalizedList = Array.isArray(list) ? list : [];
  const displayList = [
    ...normalizedList,
    ...normalizedList,
    ...normalizedList,
  ].slice(0, 25);

  // Arc configuration
  const angleSpan = 360; // Degrees to span
  const startAngle = 0; // Start from right
  const step = displayList.length > 0 ? angleSpan / displayList.length : 0;
  const toPercent = (value: number) => `${value.toFixed(3)}%`;
  const fadeDuration = 0.45;
  const fadeStagger = 0.08;
  const shouldSpin = displayList.length === 0 || spinStarted;

  return (
    <section className="overflow-hidden relative">
      <MainContainer>
        <div className="pt-30 pb-10 container-padding-x relative overflow-hidden">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "0px", amount: 0.05 }}
            variants={sectionHeaderVariants}
          >
            <SectionHeader title={title} badge={badge} />
          </motion.div>

          <div className="relative h-120 sm:h-[550px] flex justify-center items-end mt-8 overflow-hidden">
            {/* Main Circle Area */}
            <motion.div
              onViewportEnter={() => {
                if (!introStarted) {
                  setIntroStarted(true);
                }
              }}
              viewport={{ once: true, amount: 0.1 }}
              className={`absolute top-[80px] w-[900px] h-[900px] lg:w-[1370px] lg:h-[1370px] ${
                shouldSpin ? "animate-[spin_60s_linear_infinite]" : ""
              }`}
            >
              {/* Icons */}
              <div className="absolute inset-0">
                {displayList.map((item, index) => {
                  const angle = startAngle + step * index;
                  const radians = (angle * Math.PI) / 180;

                  // Position relative to center (percentages)
                  const x = 50 + 50 * Math.cos(radians);
                  const y = 50 + 50 * Math.sin(radians);

                  // Dot calculation (midpoint between this and next)
                  const dotAngle = angle + step / 2;
                  const dotRadians = (dotAngle * Math.PI) / 180;
                  const dotX = 50 + 50 * Math.cos(dotRadians);
                  const dotY = 50 + 50 * Math.sin(dotRadians);
                  const isLastItem = index === displayList.length - 1;
                  const logoDelay = index * fadeStagger;
                  const dotDelay = logoDelay + fadeDuration * 0.2;

                  return (
                    <div key={index}>
                      {/* Icon */}
                      <motion.div
                        className={`absolute rounded-full flex justify-center items-center transition-transform hover:scale-110 duration-300 bg-gradient-dark border border-border/4 w-[60px] h-[60px] md:w-[90px] md:h-[90px]`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: introStarted ? 1 : 0 }}
                        transition={{
                          duration: fadeDuration,
                          delay: logoDelay,
                          ease: "easeOut",
                        }}
                        onAnimationComplete={() => {
                          if (introStarted && isLastItem && !spinStarted) {
                            setSpinStarted(true);
                          }
                        }}
                        style={{
                          left: toPercent(x),
                          top: toPercent(y),
                          transform: "translate(-50%, -50%)",
                        }}
                      >
                        <div
                          className={
                            shouldSpin
                              ? "animate-[spin_60s_linear_infinite_reverse]"
                              : ""
                          }
                        >
                          <img
                            src={item}
                            alt={`Integration ${index + 1}`}
                            width={40}
                            height={40}
                            className={`w-8 h-8 md:w-10 md:h-10 object-contain`}
                          />
                        </div>
                      </motion.div>

                      {/* Dot */}
                      <motion.div
                        className="absolute rounded-full bg-white/20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: introStarted ? 1 : 0 }}
                        transition={{
                          duration: fadeDuration,
                          delay: dotDelay,
                          ease: "easeOut",
                        }}
                        style={{
                          width: "3px",
                          height: "3px",
                          left: toPercent(dotX),
                          top: toPercent(dotY),
                          transform: "translate(-50%, -50%)",
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* dots */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-30 sm:bottom-50 z-30 flex justify-center w-full">
              <svg
                width="415"
                height="57"
                viewBox="0 0 415 57"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.22455 50.2414C58.8362 22.1179 126.223 5 205.589 5C286.429 5 354.892 22.754 412.225 51.8257"
                  stroke="white"
                  strokeOpacity="0.1"
                  strokeWidth="10"
                  strokeDasharray="2 60"
                />
              </svg>
            </div>
            {/* CTA Button */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "0px", amount: 0.05 }}
              variants={sectionHeaderVariants}
              className="absolute bottom-10 z-10 flex justify-center w-full"
            >
              {button?.enable && (
                <AnimatedButton
                  classNames="btn btn-primary"
                  href={button?.link || "/"}
                >
                  {button?.label}
                </AnimatedButton>
              )}
            </motion.div>
          </div>
        </div>
      </MainContainer>
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2  w-[800px]">
        <svg
          width="919"
          height="308"
          viewBox="0 0 919 308"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_f_35_7436)">
            <circle
              cx="459.5"
              cy="459.5"
              r="289.5"
              fill="url(#paint0_linear_35_7436)"
              fillOpacity="0.5"
            />
          </g>
          <defs>
            <filter
              id="filter0_f_35_7436"
              x="0"
              y="0"
              width="919"
              height="919"
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
                stdDeviation="85"
                result="effect1_foregroundBlur_35_7436"
              />
            </filter>
            <linearGradient
              id="paint0_linear_35_7436"
              x1="170"
              y1="749"
              x2="749"
              y2="749"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#9A4DFE" />
              <stop offset="1" stopColor="#E87CFF" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default Integration;
