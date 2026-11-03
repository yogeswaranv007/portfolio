import React, { useState, useEffect } from 'react';
import { Layers } from 'lucide-react';
import { portfolioService } from '../../services/portfolioService';

const PREFERRED_GROUP_ORDER = [
  'Languages',
  'Backend',
  'Databases',
  'Frontend',
  'AI',
  'Tools',
  'Core CS'
];

const groupSkills = (data) => {
  if (!Array.isArray(data)) return {};
  const map = {};
  data.forEach((skill) => {
    if (skill.enabled !== false) {
      const category = skill.category || 'General';
      if (!map[category]) map[category] = [];
      map[category].push(skill.name);
    }
  });
  return map;
};

export function TechRadar() {
  const [skillsData, setSkillsData] = useState(() => groupSkills(portfolioService.getLocalSkills()));

  useEffect(() => {
    let isMounted = true;
    portfolioService.getSkills().then((data) => {
      if (isMounted && Array.isArray(data) && data.length > 0) {
        setSkillsData(groupSkills(data));
      }
    }).catch(() => {});
    return () => { isMounted = false; };
  }, []);

  // Sort groups by preferred order
  const orderedCategories = Object.keys(skillsData).sort((a, b) => {
    const idxA = PREFERRED_GROUP_ORDER.indexOf(a);
    const idxB = PREFERRED_GROUP_ORDER.indexOf(b);
    if (idxA !== -1 && idxB !== -1) return idxA - idxB;
    if (idxA !== -1) return -1;
    if (idxB !== -1) return 1;
    return a.localeCompare(b);
  });

  return (
    <section className="space-y-8" id="skills">
      {/* Section Header */}
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
          <Layers className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-text">
            Technical Skills
          </h2>
          <p className="text-xs sm:text-sm text-text-muted">
            Grouped technologies and core competencies
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {orderedCategories.map((category) => {
          const skills = skillsData[category] || [];
          return (
            <div
              key={category}
              className="p-5 rounded-2xl bg-cards border border-borders hover:border-primary/40 transition-all duration-200 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <h3 className="text-sm font-semibold text-text uppercase tracking-wider font-mono">
                    {category}
                  </h3>
                  <span className="text-xs font-mono text-text-muted bg-background px-2 py-0.5 rounded border border-borders">
                    {skills.length}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 text-xs font-mono font-medium rounded-lg bg-background text-text border border-borders hover:border-primary/50 hover:text-primary transition-colors cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
