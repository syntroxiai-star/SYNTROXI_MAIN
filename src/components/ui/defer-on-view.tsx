import React from 'react';

type Props = {
  rootMargin?: string;
  children: React.ReactNode;
  placeholder?: React.ReactNode;
};

export function DeferOnView({ rootMargin = '200px', children, placeholder = null }: Props) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    if (visible) return;
    if (typeof IntersectionObserver === 'undefined') {
      // If no IntersectionObserver (SSR or old env), load immediately on client
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.disconnect();
            return;
          }
        }
      },
      { rootMargin },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [rootMargin, visible]);

  return <div ref={ref}>{visible ? children : placeholder}</div>;
}

export default DeferOnView;
