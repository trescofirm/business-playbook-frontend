
export default function ResponsiveImage({
  src,
  alt,
  width,
  height,
  sizes = "(max-width: 600px) 45vw, 280px",
  loading = "lazy",
  className,
  fetchPriority,
}) {
  if (!src) return null;

  const cleanSrc = src.split("?")[0];
  const extension = cleanSrc.match(/\.[^.]+$/)?.[0];

  // Only transform known JPEG/PNG assets.
  const supportsModernFormats =
    extension && /\.(jpe?g|png)$/i.test(extension);

  const base = supportsModernFormats
    ? cleanSrc.slice(0, -extension.length)
    : null;

  const webpWidths = [320, 480, 640, 960]
    .filter((w) => w < width)
    .map((w) => `${base}-${w}.webp ${w}w`)
    .join(", ");

  return (
    <picture>
      {supportsModernFormats && (
        <>
          <source
            type="image/avif"
            srcSet={`${base}.avif`}
          />
          {webpWidths && (
            <source
              type="image/webp"
              srcSet={webpWidths}
              sizes={sizes}
            />
          )}
          {!webpWidths && (
            <source
              type="image/webp"
              srcSet={`${base}.webp`}
            />
          )}
        </>
      )}

      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        loading={loading}
        decoding="async"
        fetchPriority={fetchPriority}
        className={className}
      />
    </picture>
  );
}
