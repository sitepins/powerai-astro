


import type { PricingType } from "@/types/index";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import {
  fadeInUpVariants,
  staggerContainerVariants,
  staggerItemVariants,
} from "@/lib/animations";

interface PageData {
  notFound?: boolean;
  content?: string;
  frontmatter: {
    enable?: boolean;
    title: string;
    subtitle?: string;
    badge: string;
    offer_yearly?: string;
    pricing_plans: Array<PricingType>;
  };
}

const Pricing = ({
  data,
  isHome = true,
}: {
  data: PageData;
  isHome?: boolean;
}) => {
  const { title, enable, badge, pricing_plans, offer_yearly } =
    data.frontmatter;
  const [isYearly, setIsYearly] = useState(false);
  const toggleRef = useRef<HTMLDivElement | null>(null);
  const sliderRef = useRef<HTMLSpanElement | null>(null);

  // measure and position the slider to match active tab
  useEffect(() => {
    const container = toggleRef.current;
    const slider = sliderRef.current;
    if (!container || !slider) return;

    const updateSlider = () => {
      const active = container.querySelector(
        '[role="tab"][aria-selected="true"]',
      ) as HTMLElement | null;
      if (!active) return;
      const containerRect = container.getBoundingClientRect();
      const activeRect = active.getBoundingClientRect();
      const left = activeRect.left - containerRect.left;
      const width = activeRect.width;
      slider.style.width = `${Math.round(width)}px`;
      slider.style.transform = `translateX(${Math.round(left)}px)`;
    };

    // initial position
    requestAnimationFrame(updateSlider);

    // update on resize
    window.addEventListener("resize", updateSlider);

    // observe small DOM changes that can affect sizing
    const observer = new MutationObserver(() =>
      requestAnimationFrame(updateSlider),
    );
    observer.observe(container, {
      childList: true,
      subtree: true,
      attributes: true,
    });

    return () => {
      window.removeEventListener("resize", updateSlider);
      observer.disconnect();
    };
  }, [isYearly]);

  useEffect(() => {
    const monthlyElements = document.querySelectorAll(
      "[data-price-tag-monthly]",
    );
    const yearlyElements = document.querySelectorAll("[data-price-tag-yearly]");

    if (isYearly) {
      // Remove active from monthly, add to yearly
      monthlyElements.forEach((el, index) => {
        setTimeout(() => {
          el.classList.remove("active");
          el.classList.add("inactive");
        }, index * 150);
      });
      yearlyElements.forEach((el, index) => {
        setTimeout(() => {
          el.classList.add("active");
          el.classList.remove("inactive");
        }, index * 150);
      });
    } else {
      // Add active to monthly, remove from yearly
      monthlyElements.forEach((el, index) => {
        setTimeout(() => {
          el.classList.add("active");
          el.classList.remove("inactive");
        }, index * 150);
      });
      yearlyElements.forEach((el, index) => {
        setTimeout(() => {
          el.classList.remove("active");
          el.classList.add("inactive");
        }, index * 150);
      });
    }
  }, [isYearly]);

  return (
    enable && (
      <section className="text-left">
        {isHome ? (
          <div className="main-container"><div className="container">
            <div className="container-padding-y container-padding-x">
              <div className="text-center mb-14">{badge && <div className="bg-gradient-primary p-px inline-block rounded-full mb-2"><div className="bg-gradient-black-grid px-4 py-1.5 rounded-full"><span className="gradient-text-primary">{badge}</span></div></div>}<h2 className="text-h2 font-medium lg:w-2/5 mx-auto">{title}</h2></div>

              <div className="flex flex-col gap-y-14">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "0px", amount: 0.05 }}
                  variants={fadeInUpVariants}
                  ref={toggleRef}
                  className="relative bg-lighter border border-border/30 px-1.5 py-1.25 rounded-full inline-flex w-max mx-auto gap-2"
                  role="tablist"
                  aria-label="Pricing toggle"
                >
                  {/* sliding background (positioned/sized by JS to match active tab) */}
                  <span
                    ref={sliderRef}
                    aria-hidden
                    style={{ width: 0, transform: "translateX(0px)" }}
                    className={`absolute top-1/2 -translate-y-1/2 left-0 h-[84%] rounded-full bg-gradient-button transition-all duration-300 pointer-events-none`}
                  />

                  <motion.button
                    role="tab"
                    aria-selected={!isYearly}
                    className={`px-6 py-2.5 rounded-full relative z-10 cursor-pointer text-text `}
                    onClick={() => setIsYearly(false)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Monthly
                  </motion.button>
                  <motion.button
                    role="tab"
                    aria-selected={isYearly}
                    className={`px-6 py-2 rounded-full relative z-10 cursor-pointer text-light`}
                    onClick={() => setIsYearly(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Yearly{" "}
                    <span
                      className={`${!isYearly ? "gradient-text-primary" : ""}`}
                    >
                      ({offer_yearly})
                    </span>
                  </motion.button>
                </motion.div>

                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "0px", amount: 0.05 }}
                  variants={staggerContainerVariants}
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {pricing_plans.map((plan, index) => (
                    <motion.div key={index} variants={staggerItemVariants}>
                      <div className="bg-card/70 border border-border/6 rounded-3xl p-2.5"><div className="bg-card border border-border/6 rounded-3xl p-7.5"><h3 className="text-h5 font-medium mb-2">{plan.name}</h3><p className="text-gray mb-6">{(plan as any).description}</p><div className="mb-6"><span className="text-text-light">{plan.price?.monthly?.prefix}</span><span className="text-[48px] font-light">{plan.price?.monthly?.number}</span><span className="text-text-light">{plan.price?.monthly?.suffix}</span></div>{plan.button?.enable && <a href={plan.button.link} className="btn btn-primary w-full text-center mb-8">{plan.button.label}</a>}{(plan as any).services && <ul className="flex flex-col gap-3">{(plan as any).services.map((service: string, si: number) => (<li key={si} className="flex items-center gap-3 text-gray">{service}</li>))}</ul>}</div></div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div></div>
        ) : (
          <div className="flex flex-col gap-y-14">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "0px", amount: 0.05 }}
              variants={fadeInUpVariants}
              ref={toggleRef}
              className="relative bg-lighter border border-border/30 px-1.5 py-1.25 rounded-full inline-flex w-max mx-auto gap-2"
              role="tablist"
              aria-label="Pricing toggle"
            >
              {/* sliding background (positioned/sized by JS to match active tab) */}
              <span
                ref={sliderRef}
                aria-hidden
                style={{ width: 0, transform: "translateX(0px)" }}
                className={`absolute top-1/2 -translate-y-1/2 left-0 h-[84%] rounded-full bg-gradient-button transition-all duration-300 pointer-events-none`}
              />

              <motion.button
                role="tab"
                aria-selected={!isYearly}
                className={`px-6 py-2.5 rounded-full relative z-10 cursor-pointer text-text `}
                onClick={() => setIsYearly(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Monthly
              </motion.button>
              <motion.button
                role="tab"
                aria-selected={isYearly}
                className={`px-6 py-2 rounded-full relative z-10 cursor-pointer text-light`}
                onClick={() => setIsYearly(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Yearly{" "}
                <span className={`${!isYearly ? "gradient-text-primary" : ""}`}>
                  ({offer_yearly})
                </span>
              </motion.button>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "0px", amount: 0.05 }}
              variants={staggerContainerVariants}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {pricing_plans.map((plan, index) => (
                <motion.div key={index} variants={staggerItemVariants}>
                  <div className="bg-card/70 border border-border/6 rounded-3xl p-2.5"><div className="bg-card border border-border/6 rounded-3xl p-7.5"><h3 className="text-h5 font-medium mb-2">{plan.name}</h3><p className="text-gray mb-6">{(plan as any).description}</p><div className="mb-6"><span className="text-text-light">{plan.price?.monthly?.prefix}</span><span className="text-[48px] font-light">{plan.price?.monthly?.number}</span><span className="text-text-light">{plan.price?.monthly?.suffix}</span></div>{plan.button?.enable && <a href={plan.button.link} className="btn btn-primary w-full text-center mb-8">{plan.button.label}</a>}{(plan as any).services && <ul className="flex flex-col gap-3">{(plan as any).services.map((service: string, si: number) => (<li key={si} className="flex items-center gap-3 text-gray">{service}</li>))}</ul>}</div></div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}
      </section>
    )
  );
};

export default Pricing;
