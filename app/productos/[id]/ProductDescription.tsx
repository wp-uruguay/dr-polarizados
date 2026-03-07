"use client";

import { useEffect, useRef, useState } from "react";

interface ProductDescriptionProps {
  content: string;
}

export function ProductDescription({ content }: ProductDescriptionProps) {
  const [expanded, setExpanded] = useState(false);
  const [needsExpand, setNeedsExpand] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      const scrollHeight = contentRef.current.scrollHeight;
      setNeedsExpand(scrollHeight > 320);
    }
  }, []);

  return (
    <div className="product-description-wrapper">
      <div
        ref={contentRef}
        className={`product-description-content ${!expanded && needsExpand ? "collapsed" : ""}`}
        dangerouslySetInnerHTML={{ __html: content }}
      />
      {needsExpand && !expanded && (
        <div className="product-description-fade">
          <button
            type="button"
            className="product-description-toggle"
            onClick={() => setExpanded(true)}
          >
            Seguir leyendo
          </button>
        </div>
      )}
    </div>
  );
}
