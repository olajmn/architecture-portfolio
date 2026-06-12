import { setIntroSeen } from "../../appState.js";

export function initIntro() {
  document.getElementById('introOverlay')?.remove();
  document.getElementById('introLogo')?.remove();
  setIntroSeen();
}
