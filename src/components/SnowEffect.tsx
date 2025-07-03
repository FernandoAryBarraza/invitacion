// src/components/SnowEffect.tsx
// Todo el CSS de esta section está en global.css 
import { useEffect } from 'preact/hooks';

export default function SnowEffect() {
  useEffect(() => {
    const xmlns = "http://www.w3.org/2000/svg";

    function createSnowFlake(): void {
      const snowFlake: SVGSVGElement = document.createElementNS(xmlns, "svg");

      snowFlake.setAttribute("class", "snowflake");
      snowFlake.setAttribute("viewBox", "0 0 24 24");

      snowFlake.style.left = `${Math.random() * 100}vw`;
      snowFlake.style.animationDuration = `${Math.random() * 5 + 5}s`;
      snowFlake.style.animationDelay = `${Math.random() * 5}s`;

      snowFlake.innerHTML = `
        <path fill="white" d="M12 2L13 8H17L14 10L15 16L12 14L9 16L10 10L7 8H11L12 2Z"/>
      `;

      const container = document.querySelector(".snow-container") as HTMLElement | null;
      if (container) {
        container.appendChild(snowFlake);

        snowFlake.addEventListener("animationend", () => {
          snowFlake.remove();
          createSnowFlake();
        });
      }
    }

    const snowFlakeCount = 100;
    for (let i = 0; i < snowFlakeCount; i++) {
      setTimeout(createSnowFlake, i * 90);
    }
  }, []);

  return <div class="snow-container"></div>;
}