/**
 * Appends an HTML media fragment (#t=seconds) when missing so browsers
 * decode/cue an early frame as the poster (helps inline <video> previews).
 */
export function videoSrcWithFirstFrameCue(url: string, seconds = 0.05): string {
  if (!url || /#t=/i.test(url)) return url;
  const base = url.split("#")[0] ?? url;
  return `${base}#t=${seconds}`;
}
