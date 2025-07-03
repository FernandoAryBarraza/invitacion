// src/components/PhotoCarousel.tsx
import { useEffect } from 'preact/hooks';

interface Props {
  images: string[];
  className?: string;
}

export default function PhotoCarousel({ images, className = '' }: Props) {
  useEffect(() => {
    const scrollers = document.querySelectorAll(`.${className}`);

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      scrollers.forEach(scroller => {
        scroller.setAttribute('data-animated', 'true');

        const scrollerInner = scroller.querySelector('.scroller_inner');
        if (!scrollerInner) return;

        const scrollerContent = Array.from(scrollerInner.children);

        scrollerContent.forEach(item => {
          const itemClone = item.cloneNode(true) as HTMLElement;
          itemClone.setAttribute('data-animated', 'true');
          scrollerInner.appendChild(itemClone);
        });
      });
    }
  }, [className]);

  return (
  <div class={`scroller ${className}`}>
    <ul class="scroller_inner tag-list flex gap-4 items-center py-4">
      {images.map((src, index) => {
        const isHorizontal = src.includes("horizontal");
        const imageClass = isHorizontal
          ? "w-[94vw] sm:w-[47vw] aspect-[16/9] max-w-full object-cover rounded"
          : "w-[40vw] sm:w-[20vw] aspect-[3/4] max-w-full object-cover rounded";

        return (
          <li key={index}>
            <img
              src={src}
              alt={`Foto ${index + 1}`}
              class={imageClass}
            />
          </li>
        );
      })}
    </ul>
  </div>
);

}
// El div scroller_inner es ul y le falta la clase tag-list