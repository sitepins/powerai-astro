import theme from "@/config/theme.json";

import CardShape from "./shape/CardShape";

const svgPaths = {
  p309b5600:
    "M11.1799 15.6864L17.6989 8.82757C18.1004 8.40902 18.1004 7.73247 17.6989 7.31392C17.2974 6.89536 16.6484 6.89536 16.2468 7.31392L10.4539 13.4159L7.75315 10.5847C7.35164 10.1661 6.70265 10.1661 6.30113 10.5847C5.89962 11.0032 5.89962 11.6798 6.30113 12.0983L9.72792 15.6864C9.92816 15.8951 10.191 16 10.4539 16C10.7168 16 10.9797 15.8951 11.1799 15.6864Z",
};

type CellValue = "check" | "minus" | string;

interface PricingTableData {
  title: string;
  features: {
    name: string;
    key: string;
  }[];
  plans: {
    name: string;
    highlighted?: boolean;
    features: {
      key: string;
      value: CellValue;
    }[];
  }[];
}

function CheckIconDark({
  primaryColor,
  secondaryColor,
}: {
  primaryColor: string;
  secondaryColor: string;
}) {
  return (
    <div className="size-[24px] flex-shrink-0">
      <svg fill="none" viewBox="0 0 24 24" className="size-full">
        <defs>
          <linearGradient
            id="grad-dark"
            x1="12"
            x2="12"
            y1="0"
            y2="24"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={secondaryColor} />
            <stop offset="1" stopColor={primaryColor} />
          </linearGradient>
        </defs>
        <rect fill="url(#grad-dark)" height="24" rx="6" width="24" />
        <path d={svgPaths.p309b5600} fill="white" />
      </svg>
    </div>
  );
}

function CheckIconLight({
  primaryColor,
  secondaryColor,
}: {
  primaryColor: string;
  secondaryColor: string;
}) {
  return (
    <div className="size-[24px] flex-shrink-0">
      <svg fill="none" viewBox="0 0 24 24" className="size-full">
        <defs>
          <linearGradient
            id="grad-light"
            x1="12"
            x2="12"
            y1="7"
            y2="16"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={secondaryColor} />
            <stop offset="1" stopColor={primaryColor} />
          </linearGradient>
        </defs>
        <rect fill="white" height="24" rx="6" width="24" />
        <path d={svgPaths.p309b5600} fill="url(#grad-light)" />
      </svg>
    </div>
  );
}

function MinusIcon() {
  return (
    <div className="size-[24px] flex-shrink-0 flex items-center justify-center relative">
      <div className="absolute inset-0 rounded-[6px] bg-white/10" />
      <div className="relative z-10 h-[2px] w-3 bg-white/40 rounded-full" />
    </div>
  );
}

function renderCellContent(
  value: CellValue,
  highlighted: boolean,
  primaryColor: string,
  secondaryColor: string,
) {
  if (value === "check") {
    return (
      <div className="flex justify-center">
        {highlighted ? (
          <CheckIconLight
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
          />
        ) : (
          <CheckIconDark
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
          />
        )}
      </div>
    );
  }
  if (value === "minus") {
    return (
      <div className="flex justify-center">
        <MinusIcon />
      </div>
    );
  }
  return (
    <span className={highlighted ? "text-text" : "text-gray"}>{value}</span>
  );
}

const ROW_H = "h-[52px]";
const HEADER_H = "h-[60px]";

interface PricingTableProps {
  data?: PricingTableData;
}

export default function PricingTable({ data }: PricingTableProps) {
  const primaryColor =
    theme?.colors?.default?.theme_color?.primary || "#8F2FFE";
  const secondaryColor =
    theme?.colors?.default?.theme_color?.secondary || "#DF53FE";

  const plans = data?.plans || [];
  const features = data?.features || [];
  const title = data?.title || "Pricing Plan Comparison";

  return (
    <section>
      <div className="main-container"><div className="container">
        <div className="container-padding-y container-padding-x">
          <CardShape>
            <div className="flex justify-center">
              {" "}
              {/* Background top glow */}
              <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute left-1/2 -translate-x-1/2 -top-40 w-96 h-96 opacity-20">
                  <svg viewBox="0 0 384 384" fill="none" className="size-full">
                    <circle cx="192" cy="192" r="192" fill="url(#bg-glow)" />
                    <defs>
                      <radialGradient id="bg-glow" cx="50%" cy="50%" r="50%">
                        <stop stopColor={secondaryColor} />
                        <stop
                          offset="1"
                          stopColor={primaryColor}
                          stopOpacity="0"
                        />
                      </radialGradient>
                    </defs>
                  </svg>
                </div>
              </div>
              <div className="relative w-full ">
                {/* Title */}
                <h1
                  className="text-center text-text my-10 capitalize font-bold"
                  style={{
                    fontSize: "clamp(28px, 4vw, 48px)",
                    letterSpacing: "-0.04em",
                    lineHeight: 1.25,
                  }}
                >
                  {title}
                </h1>

                {/* Card */}
                <div className="relative overflow-hidden rounded-3xl border border-border/6 p-5 md:p-8 bg-card/70">
                  {/* Corner glows */}
                  <div className="absolute -bottom-32 -left-16 w-72 h-72 pointer-events-none opacity-40">
                    <svg
                      viewBox="0 0 288 288"
                      fill="none"
                      className="size-full"
                    >
                      <circle cx="144" cy="144" r="144" fill="url(#gl-bl)" />
                      <defs>
                        <radialGradient id="gl-bl">
                          <stop stopColor={primaryColor} />
                          <stop
                            offset="1"
                            stopColor={primaryColor}
                            stopOpacity="0"
                          />
                        </radialGradient>
                      </defs>
                    </svg>
                  </div>
                  <div className="absolute -top-32 -right-16 w-72 h-72 pointer-events-none opacity-40">
                    <svg
                      viewBox="0 0 288 288"
                      fill="none"
                      className="size-full"
                    >
                      <circle cx="144" cy="144" r="144" fill="url(#gl-tr)" />
                      <defs>
                        <radialGradient id="gl-tr">
                          <stop stopColor={secondaryColor} />
                          <stop
                            offset="1"
                            stopColor={secondaryColor}
                            stopOpacity="0"
                          />
                        </radialGradient>
                      </defs>
                    </svg>
                  </div>

                  {/* Pricing table */}
                  <div className="overflow-x-auto">
                    <div className="flex min-w-[540px] items-stretch py-5">
                      {/* ── Feature labels column ── */}
                      <div className="flex flex-col flex-[2]">
                        {/* header spacer */}
                        <div className={`${HEADER_H} flex items-center px-3`}>
                          <span className="text-text font-bold text-xl">
                            Features
                          </span>
                        </div>
                        {features.map((f, i) => (
                          <div
                            key={f.key + i}
                            className={`${ROW_H} flex items-center px-3 text-text text-sm md:text-base rounded-l-lg ${
                              i % 2 === 0 ? "bg-white/[0.06]" : ""
                            }`}
                          >
                            {f.name}
                          </div>
                        ))}
                      </div>

                      {/* ── Plan columns ── */}
                      {plans.map((plan) => (
                        <div
                          key={plan.name}
                          className={`flex flex-col ${
                            plan.highlighted
                              ? "flex-[1.2] -my-5 rounded-2xl overflow-hidden shadow-2xl shadow-purple-900/60 z-10"
                              : "flex-1"
                          }`}
                          style={
                            plan.highlighted
                              ? {
                                  background: `linear-gradient(180deg, ${secondaryColor} 0%, ${primaryColor} 100%)`,
                                }
                              : {}
                          }
                        >
                          {/* Plan name header */}
                          <div
                            className={`${plan.highlighted ? "h-[68px]" : HEADER_H} flex items-center justify-center px-3`}
                          >
                            <span className="text-text font-bold text-xl">
                              {plan.name}
                            </span>
                          </div>

                          {/* Feature value rows */}
                          {features.map((f, i) => {
                            const planFeature = plan.features.find(
                              (pf) => pf.key === f.key,
                            );
                            const value = planFeature?.value || "";
                            const isEven = i % 2 === 0;
                            const isLast = i === features.length - 1;
                            return (
                              <div
                                key={f.key + i}
                                className={`${plan.highlighted ? "h-[56px]" : ROW_H} flex items-center justify-center px-3 text-sm md:text-base ${
                                  !plan.highlighted && isEven
                                    ? "bg-white/[0.06]"
                                    : ""
                                } ${!plan.highlighted && isLast ? "rounded-r-lg" : ""}`}
                              >
                                {renderCellContent(
                                  value,
                                  plan.highlighted ?? false,
                                  primaryColor,
                                  secondaryColor,
                                )}
                              </div>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardShape>
        </div>
      </div></div>
    </section>
  );
}
