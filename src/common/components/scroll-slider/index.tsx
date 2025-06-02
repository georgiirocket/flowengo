import {
  type FC,
  type HTMLAttributes,
  type PropsWithChildren,
  useRef,
  type MouseEvent,
  type WheelEvent,
} from "react";
import "./scroll-slider.css";
import { twJoin } from "tailwind-merge";

type IScrollSlider = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;

/**
 * Scroll slider component
 */
const ScrollSlider: FC<IScrollSlider> = ({ children, className }) => {
  const scrollSliderRef = useRef<HTMLDivElement>(null);
  const isDownRef = useRef<boolean>(false);
  const startXRef = useRef<number>(0);
  const scrollLeftRef = useRef<number>(0);

  /**
   * Save mouse position, current container's scroll
   */
  const handleMouseDown = (e: MouseEvent<HTMLDivElement>): void => {
    if (!scrollSliderRef.current) {
      return;
    }

    isDownRef.current = true;
    startXRef.current = e.pageX;
    scrollLeftRef.current = scrollSliderRef.current.scrollLeft;
  };

  /**
   * Disable slider mode
   */
  const handleMouseOff = (): void => {
    isDownRef.current = false;
  };

  /**
   * Change scroll of element
   */
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>): void => {
    if (!isDownRef.current || !scrollSliderRef.current) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();
    scrollSliderRef.current.scrollLeft =
      scrollLeftRef.current - (e.pageX - startXRef.current);
  };

  /**
   * Horizontal scroll with wheel
   */
  const handleWheel = (e: WheelEvent<HTMLDivElement>): void => {
    if (!scrollSliderRef.current) {
      return;
    }

    scrollSliderRef.current.scrollTo({
      left: scrollSliderRef.current.scrollLeft + e.deltaY * 2,
    });
  };

  return (
    <div
      draggable={false}
      ref={scrollSliderRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseOff}
      onMouseUp={handleMouseOff}
      onWheel={handleWheel}
      className={twJoin("scrollSlider", className)}
    >
      {children}
    </div>
  );
};

export default ScrollSlider;
