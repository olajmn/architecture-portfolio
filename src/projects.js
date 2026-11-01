// Thin data-access layer over data/projects.js.
//
// The raw array is data; everything that *reads* it in a particular way
// (find by slug, pick a cover image, build page and image URLs) lives here so
// components never reach into the data shape directly.

// Contents
//
// 1. Projects
//    - getAllProjects()
//    - getProjectBySlug()
//
// 2. Images
//    - getThumbnailImage()
//    - getGalleryImages()
//    - getCoverImage()
//
// 3. Neighbours
//    - getAdjacentProjects()
//
// 4. URLs
//    - projectUrl()
//    - imageUrl()

import { projects } from "../data/projects.js";

// 1. Projects

export function getAllProjects() {
  return projects;
}

export function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug);
}

// 2. Images

// The image shown on the grid card. Uses the
// project's optional `thumbnail` (an image src) and falls back to the cover.
export function getThumbnailImage(project) {
  return project.images.find((image) => image.src === project.thumbnail)
    ?? getCoverImage(project);
}

export function getGalleryImages(project) {
  return project.images.slice(1);
}

// The first image in a project's list is its cover — used as the
// project-page hero.
export function getCoverImage(project) {
  return project.images[0];
}

// 3. Neighbours

// The projects before and after this one in data order, looping at
// both ends — the single source of order for project-to-project navigation.
export function getAdjacentProjects(project) {
  const i = projects.indexOf(project);
  const n = projects.length;
  return {
    prev: projects[(i - 1 + n) % n],
    next: projects[(i + 1) % n],
  };
}

// 4. URLs

export function projectUrl(project) {
  return `project.html?slug=${project.slug}`;
}

export function imageUrl(project, image) {
  return `images/${project.slug}/${image.src}`;
}
