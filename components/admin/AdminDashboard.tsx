"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  User,
  Link2,
  Briefcase,
  GraduationCap,
  FolderOpen,
  Wrench,
  Trophy,
  LogOut,
  Save,
  Plus,
  Trash2,
  X,
  ChevronRight,
  Eye,
  Menu,
} from "lucide-react";
import type {
  PortfolioData,
  ExperienceItem,
  EducationItem,
  ProjectItem,
  AchievementItem,
} from "@/lib/types";

/* ─── Shared UI helpers ───────────────────────────────────────── */

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`p-6 rounded-xl bg-zinc-900/60 border border-zinc-800 backdrop-blur-sm ${className}`}
    >
      {children}
    </div>
  );
}

function InputField({
  label,
  value,
  onChange,
  placeholder = "",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="mb-4">
      <label className="block text-sm text-gray-400 mb-1.5">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition-all"
      />
    </div>
  );
}

function TextAreaField({
  label,
  value,
  onChange,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <div className="mb-4">
      <label className="block text-sm text-gray-400 mb-1.5">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="w-full px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition-all resize-none"
      />
    </div>
  );
}

function AddButton({
  onClick,
  label,
}: {
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full py-4 border-2 border-dashed border-zinc-700 rounded-xl text-gray-400 hover:text-white hover:border-purple-500/60 transition-all flex items-center justify-center gap-2 group"
    >
      <Plus
        size={20}
        className="group-hover:rotate-90 transition-transform duration-300"
      />
      {label}
    </button>
  );
}

/* ─── Tab sub-components ──────────────────────────────────────── */

function ProfileTab({
  data,
  onUpdate,
}: {
  data: PortfolioData;
  onUpdate: (field: string, value: string) => void;
}) {
  return (
    <Card>
      <div className="grid md:grid-cols-2 gap-x-6">
        <InputField
          label="Name"
          value={data.profile.name}
          onChange={(v) => onUpdate("name", v)}
        />
        <InputField
          label="Title / Role"
          value={data.profile.title}
          onChange={(v) => onUpdate("title", v)}
        />
      </div>
      <TextAreaField
        label="Description"
        value={data.profile.description}
        onChange={(v) => onUpdate("description", v)}
        rows={4}
      />
      <div className="grid md:grid-cols-2 gap-x-6">
        <InputField
          label="Location"
          value={data.profile.location}
          onChange={(v) => onUpdate("location", v)}
        />
        <InputField
          label="Profile Image Path"
          value={data.profile.image}
          onChange={(v) => onUpdate("image", v)}
          placeholder="/me.png or https://..."
        />
      </div>
      <InputField
        label="Resume URL"
        value={data.profile.resumeUrl}
        onChange={(v) => onUpdate("resumeUrl", v)}
      />
    </Card>
  );
}

function SocialsTab({
  data,
  onUpdate,
}: {
  data: PortfolioData;
  onUpdate: (field: string, value: string) => void;
}) {
  return (
    <Card>
      <InputField
        label="GitHub"
        value={data.socials.github}
        onChange={(v) => onUpdate("github", v)}
        placeholder="https://github.com/username"
      />
      <InputField
        label="LinkedIn"
        value={data.socials.linkedin}
        onChange={(v) => onUpdate("linkedin", v)}
        placeholder="https://linkedin.com/in/username"
      />
      <InputField
        label="Instagram"
        value={data.socials.instagram}
        onChange={(v) => onUpdate("instagram", v)}
        placeholder="https://instagram.com/username"
      />
      <InputField
        label="Twitter / X"
        value={data.socials.twitter}
        onChange={(v) => onUpdate("twitter", v)}
        placeholder="https://twitter.com/username"
      />
      <InputField
        label="Email"
        value={data.socials.email}
        onChange={(v) => onUpdate("email", v)}
        placeholder="you@example.com"
      />
    </Card>
  );
}

function SkillsTab({
  skills,
  onAdd,
  onRemove,
}: {
  skills: string[];
  onAdd: (s: string) => void;
  onRemove: (i: number) => void;
}) {
  const [newSkill, setNewSkill] = useState("");

  const handleAdd = () => {
    if (newSkill.trim()) {
      onAdd(newSkill.trim());
      setNewSkill("");
    }
  };

  return (
    <Card>
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          placeholder="Type a skill and press Enter..."
          className="flex-1 px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500 transition"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAdd}
          className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 rounded-xl transition flex items-center gap-2 font-medium"
        >
          <Plus size={18} />
          Add
        </motion.button>
      </div>
      <div className="flex flex-wrap gap-2">
        <AnimatePresence>
          {skills.map((skill, i) => (
            <motion.span
              key={`${skill}-${i}`}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800 border border-zinc-700 rounded-lg text-sm group hover:border-red-500/40 transition-colors"
            >
              {skill}
              <button
                onClick={() => onRemove(i)}
                className="text-gray-500 hover:text-red-400 transition-colors"
              >
                <X size={14} />
              </button>
            </motion.span>
          ))}
        </AnimatePresence>
      </div>
    </Card>
  );
}

function ExperienceTab({
  experience,
  onUpdate,
  onAdd,
  onRemove,
  onAddBullet,
  onUpdateBullet,
  onRemoveBullet,
}: {
  experience: ExperienceItem[];
  onUpdate: (id: string, field: string, value: string) => void;
  onAdd: () => void;
  onRemove: (id: string) => void;
  onAddBullet: (id: string) => void;
  onUpdateBullet: (id: string, index: number, value: string) => void;
  onRemoveBullet: (id: string, index: number) => void;
}) {
  return (
    <div className="space-y-6">
      {experience.map((exp) => (
        <Card key={exp.id}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-purple-400">
              {exp.role || "New Experience"}
            </h3>
            <button
              onClick={() => onRemove(exp.id)}
              className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-all"
            >
              <Trash2 size={18} />
            </button>
          </div>
          <div className="grid md:grid-cols-2 gap-x-6">
            <InputField
              label="Role / Title"
              value={exp.role}
              onChange={(v) => onUpdate(exp.id, "role", v)}
            />
            <InputField
              label="Period"
              value={exp.period}
              onChange={(v) => onUpdate(exp.id, "period", v)}
              placeholder="Oct 2025 - Present"
            />
            <InputField
              label="Company"
              value={exp.company}
              onChange={(v) => onUpdate(exp.id, "company", v)}
            />
            <InputField
              label="Location"
              value={exp.location}
              onChange={(v) => onUpdate(exp.id, "location", v)}
            />
          </div>
          <div className="mt-2">
            <label className="block text-sm text-gray-400 mb-2">
              Bullet Points
            </label>
            {exp.bullets.map((bullet, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <span className="text-purple-400 mt-2.5 text-sm">▸</span>
                <input
                  type="text"
                  value={bullet}
                  onChange={(e) => onUpdateBullet(exp.id, i, e.target.value)}
                  className="flex-1 px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-xl text-white text-sm focus:outline-none focus:border-purple-500 transition"
                  placeholder="Describe what you did..."
                />
                <button
                  onClick={() => onRemoveBullet(exp.id, i)}
                  className="p-2 text-gray-500 hover:text-red-400 transition"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
            <button
              onClick={() => onAddBullet(exp.id)}
              className="text-sm text-purple-400 hover:text-purple-300 flex items-center gap-1 mt-2 ml-5"
            >
              <Plus size={14} /> Add bullet point
            </button>
          </div>
        </Card>
      ))}
      <AddButton onClick={onAdd} label="Add Experience" />
    </div>
  );
}

function EducationTab({
  education,
  onUpdate,
  onAdd,
  onRemove,
}: {
  education: EducationItem[];
  onUpdate: (id: string, field: string, value: string) => void;
  onAdd: () => void;
  onRemove: (id: string) => void;
}) {
  return (
    <div className="space-y-6">
      {education.map((edu) => (
        <Card key={edu.id}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-purple-400">
              {edu.degree || "New Education"}
            </h3>
            <button
              onClick={() => onRemove(edu.id)}
              className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-all"
            >
              <Trash2 size={18} />
            </button>
          </div>
          <div className="grid md:grid-cols-2 gap-x-6">
            <InputField
              label="Degree / Title"
              value={edu.degree}
              onChange={(v) => onUpdate(edu.id, "degree", v)}
            />
            <InputField
              label="Period"
              value={edu.period}
              onChange={(v) => onUpdate(edu.id, "period", v)}
              placeholder="2024 - Present"
            />
          </div>
          <InputField
            label="Institution"
            value={edu.institution}
            onChange={(v) => onUpdate(edu.id, "institution", v)}
          />
          <TextAreaField
            label="Description"
            value={edu.description}
            onChange={(v) => onUpdate(edu.id, "description", v)}
          />
        </Card>
      ))}
      <AddButton onClick={onAdd} label="Add Education" />
    </div>
  );
}

function ProjectCard({
  project,
  onUpdate,
  onRemove,
  onAddTech,
  onRemoveTech,
  onAddLink,
  onUpdateLink,
  onRemoveLink,
}: {
  project: ProjectItem;
  onUpdate: (field: string, value: string) => void;
  onRemove: () => void;
  onAddTech: (tech: string) => void;
  onRemoveTech: (i: number) => void;
  onAddLink: () => void;
  onUpdateLink: (i: number, field: string, value: string) => void;
  onRemoveLink: (i: number) => void;
}) {
  const [newTech, setNewTech] = useState("");

  const handleAddTech = () => {
    if (newTech.trim()) {
      onAddTech(newTech.trim());
      setNewTech("");
    }
  };

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-purple-400">
          {project.title || "New Project"}
        </h3>
        <button
          onClick={onRemove}
          className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-all"
        >
          <Trash2 size={18} />
        </button>
      </div>
      <div className="grid md:grid-cols-2 gap-x-6">
        <InputField
          label="Title"
          value={project.title}
          onChange={(v) => onUpdate("title", v)}
        />
        <InputField
          label="Period"
          value={project.period}
          onChange={(v) => onUpdate("period", v)}
          placeholder="Aug 2025 - Present"
        />
      </div>
      <TextAreaField
        label="Description"
        value={project.description}
        onChange={(v) => onUpdate("description", v)}
        rows={3}
      />
      <InputField
        label="Image Path / URL"
        value={project.image}
        onChange={(v) => onUpdate("image", v)}
        placeholder="/project.png or https://..."
      />

      {/* Tech Stack */}
      <div className="mb-4">
        <label className="block text-sm text-gray-400 mb-2">Tech Stack</label>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={newTech}
            onChange={(e) => setNewTech(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddTech()}
            placeholder="Add technology..."
            className="flex-1 px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-xl text-white text-sm focus:outline-none focus:border-purple-500 transition"
          />
          <button
            onClick={handleAddTech}
            className="px-3 py-2 bg-purple-600 hover:bg-purple-500 rounded-xl transition text-sm"
          >
            <Plus size={16} />
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech, i) => (
            <span
              key={`${tech}-${i}`}
              className="flex items-center gap-1 px-2.5 py-1 bg-zinc-800 border border-zinc-700 rounded-lg text-xs"
            >
              {tech}
              <button
                onClick={() => onRemoveTech(i)}
                className="text-gray-500 hover:text-red-400"
              >
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Links */}
      <div>
        <label className="block text-sm text-gray-400 mb-2">Links</label>
        {project.links.map((link, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input
              type="text"
              value={link.label}
              onChange={(e) => onUpdateLink(i, "label", e.target.value)}
              placeholder="Label (e.g. Source)"
              className="w-32 px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-xl text-white text-sm focus:outline-none focus:border-purple-500 transition"
            />
            <input
              type="text"
              value={link.url}
              onChange={(e) => onUpdateLink(i, "url", e.target.value)}
              placeholder="https://..."
              className="flex-1 px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-xl text-white text-sm focus:outline-none focus:border-purple-500 transition"
            />
            <button
              onClick={() => onRemoveLink(i)}
              className="p-2 text-gray-500 hover:text-red-400"
            >
              <X size={16} />
            </button>
          </div>
        ))}
        <button
          onClick={onAddLink}
          className="text-sm text-purple-400 hover:text-purple-300 flex items-center gap-1 mt-1"
        >
          <Plus size={14} /> Add link
        </button>
      </div>
    </Card>
  );
}

function ProjectsTab({
  projects,
  onUpdate,
  onAdd,
  onRemove,
  onAddTech,
  onRemoveTech,
  onAddLink,
  onUpdateLink,
  onRemoveLink,
}: {
  projects: ProjectItem[];
  onUpdate: (id: string, field: string, value: string) => void;
  onAdd: () => void;
  onRemove: (id: string) => void;
  onAddTech: (id: string, tech: string) => void;
  onRemoveTech: (id: string, i: number) => void;
  onAddLink: (id: string) => void;
  onUpdateLink: (id: string, i: number, field: string, value: string) => void;
  onRemoveLink: (id: string, i: number) => void;
}) {
  return (
    <div className="space-y-6">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onUpdate={(field, value) => onUpdate(project.id, field, value)}
          onRemove={() => onRemove(project.id)}
          onAddTech={(tech) => onAddTech(project.id, tech)}
          onRemoveTech={(i) => onRemoveTech(project.id, i)}
          onAddLink={() => onAddLink(project.id)}
          onUpdateLink={(i, field, value) =>
            onUpdateLink(project.id, i, field, value)
          }
          onRemoveLink={(i) => onRemoveLink(project.id, i)}
        />
      ))}
      <AddButton onClick={onAdd} label="Add Project" />
    </div>
  );
}

function AchievementsTab({
  achievements,
  onUpdate,
  onAdd,
  onRemove,
}: {
  achievements: AchievementItem[];
  onUpdate: (id: string, field: string, value: string) => void;
  onAdd: () => void;
  onRemove: (id: string) => void;
}) {
  return (
    <div className="space-y-6">
      {achievements.map((ach) => (
        <Card key={ach.id}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-purple-400">
              {ach.title || "New Achievement"}
            </h3>
            <button
              onClick={() => onRemove(ach.id)}
              className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-all"
            >
              <Trash2 size={18} />
            </button>
          </div>
          <InputField
            label="Title"
            value={ach.title}
            onChange={(v) => onUpdate(ach.id, "title", v)}
          />
          <TextAreaField
            label="Description"
            value={ach.description}
            onChange={(v) => onUpdate(ach.id, "description", v)}
          />
        </Card>
      ))}
      <AddButton onClick={onAdd} label="Add Achievement" />
    </div>
  );
}

/* ─── Sidebar config ──────────────────────────────────────────── */

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "socials", label: "Socials", icon: Link2 },
  { id: "skills", label: "Skills", icon: Wrench },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "projects", label: "Projects", icon: FolderOpen },
  { id: "achievements", label: "Achievements", icon: Trophy },
];

const tabDescriptions: Record<string, string> = {
  profile: "Update your personal information",
  socials: "Manage your social media links",
  skills: "Add or remove your technical skills",
  experience: "Manage your work experience",
  education: "Update your educational background",
  projects: "Showcase your best projects",
  achievements: "Highlight your achievements",
};

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

/* ─── Main dashboard component ────────────────────────────────── */

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("profile");
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/admin/data");
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      if (!res.ok) throw new Error("Failed");
      setData(await res.json());
    } catch {
      toast.error("Failed to load portfolio data");
    } finally {
      setLoading(false);
    }
  };

  const save = async () => {
    if (!data) return;
    setSaving(true);
    try {
      const res = await fetch("/api/admin/data", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed");
      toast.success("Changes saved successfully! 🎉");
    } catch {
      toast.error("Failed to save changes ❌");
    } finally {
      setSaving(false);
    }
  };

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  /* ── Data update helpers ── */

  const updateProfile = (field: string, value: string) => {
    if (!data) return;
    setData({ ...data, profile: { ...data.profile, [field]: value } });
  };

  const updateSocial = (field: string, value: string) => {
    if (!data) return;
    setData({ ...data, socials: { ...data.socials, [field]: value } });
  };

  // Skills
  const addSkill = (skill: string) => {
    if (!data) return;
    setData({ ...data, skills: [...data.skills, skill] });
  };
  const removeSkill = (index: number) => {
    if (!data) return;
    setData({ ...data, skills: data.skills.filter((_, i) => i !== index) });
  };

  // Experience
  const addExperience = () => {
    if (!data) return;
    setData({
      ...data,
      experience: [
        ...data.experience,
        {
          id: generateId(),
          role: "",
          company: "",
          location: "",
          period: "",
          bullets: [""],
        },
      ],
    });
  };
  const updateExperience = (id: string, field: string, value: string) => {
    if (!data) return;
    setData({
      ...data,
      experience: data.experience.map((e) =>
        e.id === id ? { ...e, [field]: value } : e
      ),
    });
  };
  const removeExperience = (id: string) => {
    if (!data) return;
    setData({
      ...data,
      experience: data.experience.filter((e) => e.id !== id),
    });
  };
  const addBullet = (expId: string) => {
    if (!data) return;
    setData({
      ...data,
      experience: data.experience.map((e) =>
        e.id === expId ? { ...e, bullets: [...e.bullets, ""] } : e
      ),
    });
  };
  const updateBullet = (
    expId: string,
    bulletIndex: number,
    value: string
  ) => {
    if (!data) return;
    setData({
      ...data,
      experience: data.experience.map((e) =>
        e.id === expId
          ? {
              ...e,
              bullets: e.bullets.map((b, i) =>
                i === bulletIndex ? value : b
              ),
            }
          : e
      ),
    });
  };
  const removeBullet = (expId: string, bulletIndex: number) => {
    if (!data) return;
    setData({
      ...data,
      experience: data.experience.map((e) =>
        e.id === expId
          ? { ...e, bullets: e.bullets.filter((_, i) => i !== bulletIndex) }
          : e
      ),
    });
  };

  // Education
  const addEducation = () => {
    if (!data) return;
    setData({
      ...data,
      education: [
        ...data.education,
        {
          id: generateId(),
          degree: "",
          institution: "",
          period: "",
          description: "",
        },
      ],
    });
  };
  const updateEducation = (id: string, field: string, value: string) => {
    if (!data) return;
    setData({
      ...data,
      education: data.education.map((e) =>
        e.id === id ? { ...e, [field]: value } : e
      ),
    });
  };
  const removeEducation = (id: string) => {
    if (!data) return;
    setData({
      ...data,
      education: data.education.filter((e) => e.id !== id),
    });
  };

  // Projects
  const addProject = () => {
    if (!data) return;
    setData({
      ...data,
      projects: [
        ...data.projects,
        {
          id: generateId(),
          title: "",
          period: "",
          description: "",
          image: "",
          tech: [],
          links: [],
        },
      ],
    });
  };
  const updateProject = (id: string, field: string, value: string) => {
    if (!data) return;
    setData({
      ...data,
      projects: data.projects.map((p) =>
        p.id === id ? { ...p, [field]: value } : p
      ),
    });
  };
  const removeProject = (id: string) => {
    if (!data) return;
    setData({ ...data, projects: data.projects.filter((p) => p.id !== id) });
  };
  const addProjectTech = (projectId: string, tech: string) => {
    if (!data) return;
    setData({
      ...data,
      projects: data.projects.map((p) =>
        p.id === projectId ? { ...p, tech: [...p.tech, tech] } : p
      ),
    });
  };
  const removeProjectTech = (projectId: string, techIndex: number) => {
    if (!data) return;
    setData({
      ...data,
      projects: data.projects.map((p) =>
        p.id === projectId
          ? { ...p, tech: p.tech.filter((_, i) => i !== techIndex) }
          : p
      ),
    });
  };
  const addProjectLink = (projectId: string) => {
    if (!data) return;
    setData({
      ...data,
      projects: data.projects.map((p) =>
        p.id === projectId
          ? { ...p, links: [...p.links, { label: "", url: "" }] }
          : p
      ),
    });
  };
  const updateProjectLink = (
    projectId: string,
    linkIndex: number,
    field: string,
    value: string
  ) => {
    if (!data) return;
    setData({
      ...data,
      projects: data.projects.map((p) =>
        p.id === projectId
          ? {
              ...p,
              links: p.links.map((l, i) =>
                i === linkIndex ? { ...l, [field]: value } : l
              ),
            }
          : p
      ),
    });
  };
  const removeProjectLink = (projectId: string, linkIndex: number) => {
    if (!data) return;
    setData({
      ...data,
      projects: data.projects.map((p) =>
        p.id === projectId
          ? { ...p, links: p.links.filter((_, i) => i !== linkIndex) }
          : p
      ),
    });
  };

  // Achievements
  const addAchievement = () => {
    if (!data) return;
    setData({
      ...data,
      achievements: [
        ...data.achievements,
        { id: generateId(), title: "", description: "" },
      ],
    });
  };
  const updateAchievement = (id: string, field: string, value: string) => {
    if (!data) return;
    setData({
      ...data,
      achievements: data.achievements.map((a) =>
        a.id === id ? { ...a, [field]: value } : a
      ),
    });
  };
  const removeAchievement = (id: string) => {
    if (!data) return;
    setData({
      ...data,
      achievements: data.achievements.filter((a) => a.id !== id),
    });
  };

  /* ── Render ── */

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-10 h-10 border-3 border-purple-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-4 text-white">
        <p className="text-gray-400">Failed to load data.</p>
        <button
          onClick={fetchData}
          className="px-6 py-2 bg-purple-600 rounded-xl hover:bg-purple-500 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* ── Desktop Sidebar ── */}
      <aside className="hidden lg:flex flex-col w-64 min-h-screen bg-zinc-900/80 border-r border-zinc-800 p-6 sticky top-0">
        <div className="mb-8">
          <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Admin Panel
          </h1>
          <p className="text-xs text-gray-500 mt-1">Manage your portfolio</p>
        </div>

        <nav className="flex-1 space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                  ${
                    activeTab === tab.id
                      ? "bg-purple-600/20 text-purple-400 border border-purple-500/30"
                      : "text-gray-400 hover:text-white hover:bg-zinc-800"
                  }`}
              >
                <Icon size={18} />
                {tab.label}
                {activeTab === tab.id && (
                  <ChevronRight size={14} className="ml-auto" />
                )}
              </button>
            );
          })}
        </nav>

        <div className="pt-6 border-t border-zinc-800 space-y-1">
          <a
            href="/"
            target="_blank"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-zinc-800 transition-all"
          >
            <Eye size={18} />
            View Site
          </a>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-900/20 transition-all"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* ── Mobile Header ── */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-zinc-900/95 backdrop-blur-md border-b border-zinc-800 px-4 py-3 flex items-center justify-between">
        <h1 className="text-lg font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Admin
        </h1>
        <div className="flex items-center gap-2">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={save}
            disabled={saving}
            className="p-2.5 bg-purple-600 rounded-lg disabled:opacity-50"
          >
            <Save size={18} />
          </motion.button>
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2.5 bg-zinc-800 rounded-lg"
          >
            <Menu size={18} />
          </button>
        </div>
      </div>

      {/* ── Mobile Sidebar Overlay ── */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/60 z-50"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-64 bg-zinc-900 border-r border-zinc-800 p-6 z-50 overflow-y-auto"
            >
              <div className="mb-6 flex items-center justify-between">
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Admin
                </h1>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id);
                        setSidebarOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                        ${
                          activeTab === tab.id
                            ? "bg-purple-600/20 text-purple-400"
                            : "text-gray-400 hover:text-white hover:bg-zinc-800"
                        }`}
                    >
                      <Icon size={18} />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
              <div className="mt-6 pt-6 border-t border-zinc-800 space-y-1">
                <a
                  href="/"
                  target="_blank"
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-zinc-800"
                >
                  <Eye size={18} /> View Site
                </a>
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-400 hover:text-red-300 hover:bg-red-900/20"
                >
                  <LogOut size={18} /> Logout
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ── Main Content ── */}
      <main className="flex-1 p-4 pt-20 lg:p-8 lg:pt-8 overflow-y-auto min-h-screen">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold capitalize">{activeTab}</h2>
              <p className="text-gray-400 text-sm mt-1">
                {tabDescriptions[activeTab]}
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={save}
              disabled={saving}
              className="hidden lg:flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 rounded-xl font-medium disabled:opacity-50 transition-all shadow-lg shadow-purple-500/20"
            >
              <Save size={18} />
              {saving ? "Saving..." : "Save Changes"}
            </motion.button>
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === "profile" && (
                <ProfileTab data={data} onUpdate={updateProfile} />
              )}
              {activeTab === "socials" && (
                <SocialsTab data={data} onUpdate={updateSocial} />
              )}
              {activeTab === "skills" && (
                <SkillsTab
                  skills={data.skills}
                  onAdd={addSkill}
                  onRemove={removeSkill}
                />
              )}
              {activeTab === "experience" && (
                <ExperienceTab
                  experience={data.experience}
                  onUpdate={updateExperience}
                  onAdd={addExperience}
                  onRemove={removeExperience}
                  onAddBullet={addBullet}
                  onUpdateBullet={updateBullet}
                  onRemoveBullet={removeBullet}
                />
              )}
              {activeTab === "education" && (
                <EducationTab
                  education={data.education}
                  onUpdate={updateEducation}
                  onAdd={addEducation}
                  onRemove={removeEducation}
                />
              )}
              {activeTab === "projects" && (
                <ProjectsTab
                  projects={data.projects}
                  onUpdate={updateProject}
                  onAdd={addProject}
                  onRemove={removeProject}
                  onAddTech={addProjectTech}
                  onRemoveTech={removeProjectTech}
                  onAddLink={addProjectLink}
                  onUpdateLink={updateProjectLink}
                  onRemoveLink={removeProjectLink}
                />
              )}
              {activeTab === "achievements" && (
                <AchievementsTab
                  achievements={data.achievements}
                  onUpdate={updateAchievement}
                  onAdd={addAchievement}
                  onRemove={removeAchievement}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
