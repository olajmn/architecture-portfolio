import { projects } from "../../data.js";
import { renderProject } from "./projectRender.js";

export function initProjectPage() {
  const slug = new URLSearchParams(window.location.search).get("slug");

  const project = projects.find(p => p.slug === slug);

  if (!project) {
    console.error("Project not found:", slug);
    return;
  }

  renderProject(project);
}

