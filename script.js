const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle?.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

document.getElementById("year").textContent = new Date().getFullYear();

const modal = document.getElementById("project-modal");
const modalTitle = document.getElementById("modal-title");
const modalText = document.getElementById("modal-text");
const modalTags = document.getElementById("modal-tags");

const studies = {
  attendance: {
    title: "Smart Attendance System",
    text: "Developed a facial-recognition attendance management system for automated student attendance tracking. The system uses OpenCV for real-time face detection and recognition, records attendance with timestamps, and stores attendance records using SQLite. This was the backend-focused final year project where the goal was to turn computer-vision recognition into a usable attendance workflow.",
    tags: ["Python", "Flask", "OpenCV", "face_recognition", "NumPy", "SQLite"]
  }
};

document.querySelectorAll(".case-study").forEach(button => {
  button.addEventListener("click", () => {
    const study = studies[button.dataset.project];
    if (!study) return;
    modalTitle.textContent = study.title;
    modalText.textContent = study.text;
    modalTags.innerHTML = study.tags.map(tag => `<span>${tag}</span>`).join("");
    modal.showModal();
  });
});

document.querySelector(".modal-close")?.addEventListener("click", () => modal.close());
modal?.addEventListener("click", event => {
  if (event.target === modal) modal.close();
});
