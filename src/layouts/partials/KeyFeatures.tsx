
import Badge from "@/components/Badge";

import MainContainer from "@/components/MainContainer";
import CardShape from "@/components/shape/CardShape";
import { motion } from "motion/react";
import {
  fadeInUpVariants,
  staggerContainerVariants,
  staggerItemVariants,
} from "@/lib/animations";
import { useEffect, useRef, useState } from "react";
interface PageData {
  notFound?: boolean;
  content?: string;
  frontmatter: {
    badge: string;
    title: string;
    track: {
      title: string;
      top_note: string;
      bottom_note: string;
      link: string;
    };
    features: {
      title: string;
      content: string;
      image: string;
      bullet_points: string[];
    }[];
  };
}

const KeyFeatures = ({ data }: { data: PageData }) => {
  const { badge, title, features, track } = data.frontmatter;
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    if (features.length <= 1) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (!visibleEntries.length) return;

        const nextIndex = Number(
          visibleEntries[0].target.getAttribute("data-feature-index"),
        );

        if (!Number.isNaN(nextIndex)) {
          setActiveFeatureIndex((prev) =>
            prev === nextIndex ? prev : nextIndex,
          );
        }
      },
      {
        threshold: [0.4, 0.6, 0.8],
        rootMargin: "-20% 0px -35% 0px",
      },
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, [features.length]);

  return (
    <section>
      <MainContainer>
        <div className="container-padding-y container-padding-x">
          <div className="grid md:grid-cols-2 gap-x-4 gap-y-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "0px", amount: 0.05 }}
              variants={fadeInUpVariants}
            >
              <div className="md:sticky top-30 xl:w-2/3">
                {badge && <Badge>{badge}</Badge>}
                <h1 className="mb-6 font-medium">{title}</h1>
                {track && (
                  <div className="flex flex-col gap-y-3">
                    <span className="text-light/50 text-lg">
                      {track.top_note}
                    </span>
                    <a
                      href={track.link}
                      className="text-lg font-medium text-text flex items-center gap-x-2 hover:text-primary transition-colors duration-300 group"
                    >
                      <motion.svg
                        width="12"
                        height="13"
                        viewBox="0 0 12 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        animate={{
                          rotate: activeFeatureIndex % 2 === 1 ? 90 : 0,
                          scale: activeFeatureIndex % 2 === 1 ? 1.06 : 1,
                        }}
                        transition={{ duration: 0.32, ease: "easeInOut" }}
                        className="origin-center"
                      >
                        <path
                          d="M0 0H0.980181V9.94549H0V0Z"
                          fill="currentColor"
                        />
                        <path
                          d="M0 8.95094H10.782V9.94549H0V8.95094Z"
                          fill="currentColor"
                        />
                        <path
                          d="M8.53465 5.96729L12.0001 9.48355L11.307 10.1868L7.84155 6.67054L8.53465 5.96729Z"
                          fill="currentColor"
                        />
                        <path
                          d="M11.307 8.78048L12.0001 9.48355L8.53465 13L7.84156 12.2967L11.307 8.78048Z"
                          fill="currentColor"
                        />
                      </motion.svg>

                      {track.title}
                    </a>
                    <span className="text-light/50 text-lg">
                      {track.bottom_note}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "0px", amount: 0.05 }}
              variants={staggerContainerVariants}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  ref={(node) => {
                    cardRefs.current[index] = node;
                  }}
                  data-feature-index={index}
                  variants={staggerItemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "0px", amount: 0.05 }}
                  whileHover="whileHover"
                  className="border border-border/6 bg-card rounded-4xl p-2.5 md:sticky top-30 mb-2.5"
                >
                  <div className="p-7.5 pb-12.5 lg:w-2/3">
                    <h2 className="text-h4 font-medium mb-2">
                      {feature.title}
                    </h2>
                    <p className="text-gray mb-5">{feature.content}</p>
                    <ul className="flex flex-col gap-y-1 list-disc list-inside">
                      {feature.bullet_points.map((point, i) => (
                        <li key={i} className="text-text font-medium">
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <CardShape>
                    <img
                      src={feature.image}
                      alt="Feature"
                      width={570}
                      height={360}
                      className="rounded-3xl object-cover relative z-1"
                    />
                  </CardShape>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </MainContainer>
    </section>
  );
};

export default KeyFeatures;
