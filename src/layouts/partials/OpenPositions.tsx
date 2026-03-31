
import { useState, useMemo } from "react";



import type { Career } from "@/types/index";
import { AnimatePresence, motion } from "motion/react";

type OpenPositionsProps = {
  badge: string;
  title: string;
  careers: Career[];
};

const OpenPositions = ({ badge, title, careers }: OpenPositionsProps) => {
  const [activeFilter, setActiveFilter] = useState("All roles");

  const listTransition = {
    type: "spring",
    stiffness: 280,
    damping: 28,
  } as const;

  // Get unique departments and count
  const departments = useMemo(() => {
    const deptCounts: Record<string, number> = {};
    careers.forEach((career) => {
      const dept = career.frontmatter.job_info.department;
      deptCounts[dept] = (deptCounts[dept] || 0) + 1;
    });

    // Create filter list
    const filters = [
      { name: "All roles", count: careers.length },
      ...Object.entries(deptCounts).map(([name, count]) => ({
        name,
        count,
      })),
    ];

    return filters;
  }, [careers]);

  // Filter careers based on active filter
  const filteredCareers = useMemo(() => {
    if (activeFilter === "All roles") {
      return careers;
    }
    return careers.filter(
      (career) => career.frontmatter.job_info.department === activeFilter,
    );
  }, [activeFilter, careers]);

  return (
    <section>
      <div className="main-container"><div className="container">
        <div className="container-padding-x container-padding-y">
          {/* Section Header */}
          <div className="text-center mb-10">
            <div className="text-center mb-14">{badge && <div className="bg-gradient-primary p-px inline-block rounded-full mb-2"><div className="bg-gradient-black-grid px-4 py-1.5 rounded-full"><span className="gradient-text-primary">{badge}</span></div></div>}<h2 className="text-h2 font-medium lg:w-2/5 mx-auto">{title}</h2></div>

            {/* Category Filters */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-3 p-1.5 border border-border/6 rounded-2xl lg:rounded-full mt-10 flex-wrap justify-center"
            >
              {departments.map((dept) => (
                <motion.button
                  key={dept.name}
                  onClick={() => setActiveFilter(dept.name)}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 420, damping: 30 }}
                  className="relative overflow-hidden px-5 py-2.5 rounded-full cursor-pointer"
                >
                  {activeFilter === dept.name && (
                    <motion.span
                      layoutId="career-active-filter-pill"
                      transition={listTransition}
                      className="absolute inset-0 bg-gradient-primary"
                    />
                  )}
                  <span
                    className={
                      activeFilter === dept.name
                        ? "relative z-10 text-white"
                        : "relative z-10 text-text"
                    }
                  >
                    {dept.name}
                  </span>
                  <span
                    className={
                      activeFilter === dept.name
                        ? "relative z-10 text-white/80"
                        : "relative z-10 text-gray"
                    }
                  >
                    ({dept.count})
                  </span>
                </motion.button>
              ))}
            </motion.div>
          </div>

          {/* Career Cards */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 14 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  ...listTransition,
                  staggerChildren: 0.08,
                  delayChildren: 0.05,
                },
              }}
              exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
              className="flex flex-col gap-2.5"
            >
              {filteredCareers.map((career) => (
                <motion.div
                  key={career.slug}
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1, transition: listTransition }}
                >
                  <div className={"bg-card/70 border border-border/6 rounded-3xl p-10 flex lg:items-center lg:justify-between gap-8 group hover:bg-card/40 transition-all duration-300 flex-col lg:flex-row"}>
                    <div className="flex flex-col gap-1 min-w-0 flex-1">
                      <a href={`/careers/`}><h3 className="font-primary font-medium text-h6 text-text hover:text-primary transition-colors duration-200">{career.frontmatter.title}</h3></a>
                      <p className="text-gray">{career.frontmatter.job_info?.department}</p>
                    </div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-gray">{career.frontmatter.job_info?.employ_type}</span>
                      <div className="size-1 rounded-full bg-gray/40" />
                      <span className="text-gray">{career.frontmatter.job_info?.location}</span>
                      <div className="size-1 rounded-full bg-gray/40" />
                      <span className="text-gray">{career.frontmatter.job_info?.salary_range}</span>
                    </div>
                    <a href={`/careers/`} className="bg-gradient-dark btn btn-dark w-fit">Apply Now</a>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div></div>
    </section>
  );
};

export default OpenPositions;
