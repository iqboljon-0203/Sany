'use client';

import { motion } from 'framer-motion';
import NextImage from 'next/image';
import { projects } from '@/data/projects';
import { useTranslation } from '@/lib/i18n';

export default function ProjectsSection() {
  const { t } = useTranslation();
  return (
    <section id="projects" className="section-padding bg-background relative">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sany-red text-sm font-bold uppercase tracking-widest mb-3 block"
          >
            {t.nav.projects}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4"
          >
            {t.nav.projects} <span className="gradient-text-red">Uzbekistan</span>
          </motion.h2>
          <p className="text-text-muted max-w-xl mx-auto">
            {t.about.missionText}
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative rounded-xl overflow-hidden bg-anthracite h-[380px] card-hover cursor-pointer"
            >
              {/* Background Image Layer */}
              <NextImage 
                src={project.image}
                alt={`${project.title} - major infrastructure project in Uzbekistan with SANY equipment`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Background Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-anthracite via-anthracite/80 to-anthracite/30 z-10 group-hover:via-anthracite/90 transition-all duration-500" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <span className="inline-block px-3 py-1 bg-sany-red/20 border border-sany-red/30 text-sany-red text-xs font-semibold uppercase tracking-wider rounded-full mb-3">
                  {project.category}
                </span>
                <h3 className="font-heading font-bold text-xl text-white mb-2 group-hover:text-sany-red transition-colors">
                  {project.title}
                </h3>
                <p className="text-white/50 text-sm mb-3 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {project.location}
                </p>

                {/* Hidden description revealed on hover */}
                <div className="max-h-0 overflow-hidden group-hover:max-h-24 transition-all duration-500">
                  <p className="text-white/40 text-xs leading-relaxed mb-3">
                    {project.description}
                  </p>
                </div>

                {/* Machines Tags */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.machines.map((machine) => (
                    <span key={machine} className="px-2 py-0.5 bg-white/5 text-white/50 text-[10px] rounded font-medium">
                      {machine}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hover overlay line */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-sany-red group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
