import MainContainer from "@/components/MainContainer";
import type { TrustedClientType } from "@/types/index";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface PageData {
  notFound?: boolean;
  content?: string;
  frontmatter: TrustedClientType;
}

const LOGO_GAP_PX = 72;
const MARQUEE_SPEED_PX_PER_SECOND = 90;

const TrustedClients = ({ data }: { data: PageData }) => {
  const brand_logos = data.frontmatter;
  const groupRef = useRef<HTMLDivElement>(null);
  const [groupWidth, setGroupWidth] = useState(0);

  useEffect(() => {
    const updateGroupWidth = () => {
      setGroupWidth(groupRef.current?.scrollWidth ?? 0);
    };

    updateGroupWidth();

    window.addEventListener("resize", updateGroupWidth);

    return () => {
      window.removeEventListener("resize", updateGroupWidth);
    };
  }, [brand_logos.client_list]);

  if (!brand_logos.client_list.length) {
    return null;
  }

  const loopDistance = groupWidth + LOGO_GAP_PX;
  const loopDuration = loopDistance
    ? loopDistance / MARQUEE_SPEED_PX_PER_SECOND
    : 12;

  const renderLogoList = (listKey: string, hidden = false) => (
    <div
      ref={hidden ? undefined : groupRef}
      className="flex shrink-0 gap-18"
      aria-hidden={hidden}
    >
      {brand_logos.client_list.map((logo, index) => (
        <div key={`${listKey}-${index}`} className="shrink-0">
          <a
            href={logo?.link}
            aria-label={`Visit ${logo?.link || "partner website"}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={logo?.logo}
              alt={`Partner logo ${index + 1}`}
              className="w-45 grayscale opacity-70 transition-all duration-300 hover:opacity-100 hover:grayscale-0"
              width="190"
              height="40"
            />
          </a>
        </div>
      ))}
    </div>
  );

  return (
    <section>
      <MainContainer>
        <div className="py-20">
          <h2 className="text-h6 text-center mb-10 text-text-light font-medium">
            {data.frontmatter.title}
          </h2>
          <div className="z-10 flex items-center relative  overflow-hidden">
            <motion.div
              className="flex w-max gap-18"
              animate={loopDistance ? { x: [0, -loopDistance] } : undefined}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: loopDuration,
                  ease: "linear",
                },
              }}
              style={{ willChange: "transform" }}
            >
              {renderLogoList("primary")}
              {renderLogoList("duplicate", true)}
            </motion.div>
          </div>
        </div>
      </MainContainer>
    </section>
  );
};

export default TrustedClients;
