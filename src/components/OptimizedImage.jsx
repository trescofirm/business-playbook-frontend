// export default function OptimizedImage({
//   src,
//   alt,
//   width,
//   height,
//   sizes = "(max-width: 600px) 45vw, 280px",
//   loading = "lazy",
//   className,
// }) {
//   if (!src) return null;

//   const cleanSrc = src.split("?")[0];
//   const extension = cleanSrc.match(/\.[^.]+$/)?.[0] || "";
//   const isRaster = /\.(jpe?g|png)$/i.test(extension);
//   const base = isRaster
//     ? cleanSrc.slice(0, -extension.length)
//     : null;

//   const candidates = isRaster
//     ? [320, 480, 640]
//         .filter((size) => width && size < width)
//         .map((size) => `${base}-${size}.webp ${size}w`)
//     : [];

//   return (
//     <picture>
//       {isRaster && (
//         <source
//           type="image/webp"
//           srcSet={
//             candidates.length
//               ? [...candidates, `${base}.webp ${width || ""}w`]
//                   .join(", ")
//               : `${base}.webp`
//           }
//           sizes={sizes}
//         />
//       )}

//       <img
//         src={src}
//         alt={alt}
//         width={width}
//         height={height}
//         loading={loading}
//         decoding="async"
//         className={className}
//         // style={{ maxWidth: "100%", height: "auto" }}
//       />
//     </picture>
//   );
// }




// const RESPONSIVE_WIDTHS = [320, 480, 640];

// export default function OptimizedImage({
//   src,
//   alt,
//   width,
//   height,
//   sizes = "(max-width: 600px) 45vw, 280px",
//   loading = "lazy",
//   fetchPriority,
//   decoding = "async",
//   className,
// }) {
//   if (!src) return null;

//   const cleanSrc = src.split(/[?#]/)[0];
//   const extension = cleanSrc.match(/\.[^.]+$/)?.[0] || "";
//   const isRaster = /\.(jpe?g|png)$/i.test(extension);

//   const base = isRaster
//     ? cleanSrc.slice(0, -extension.length)
//     : null;

//   const webpCandidates = isRaster
//     ? RESPONSIVE_WIDTHS.map(
//         (size) => `${base}-${size}.webp ${size}w`
//       ).join(", ")
//     : undefined;

//   return (
//     <picture>
//       {isRaster && (
//         <source
//           type="image/webp"
//           srcSet={webpCandidates}
//           sizes={sizes}
//         />
//       )}

//       <img
//         src={src}
//         alt={alt}
//         width={width}
//         height={height}
//         sizes={sizes}
//         loading={loading}
//         fetchPriority={fetchPriority}
//         decoding={decoding}
//         className={className}
//       />
//     </picture>
//   );
// }








export default function OptimizedImage({
  src,
  alt = "",
  width,
  height,
  sizes,
  loading = "lazy",
  fetchPriority = "auto",
  decoding = "async",
  className,
}) {
  if (!src) return null;

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      loading={loading}
      fetchPriority={fetchPriority}
      decoding={decoding}
      className={className}
      onError={(event) => {
        console.error(
          "Image failed to load:",
          event.currentTarget.src
        );
      }}
    />
  );
}
