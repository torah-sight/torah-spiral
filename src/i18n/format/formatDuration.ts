const pad = (n: number): string => String(n).padStart(2, '0');

/** Длительность в мс → «m:ss» или «h:mm:ss». */
export const formatDuration = (ms: number): string => {
    const total = Math.max(0, Math.floor(ms / 1000));
    const hours = Math.floor(total / 3600);
    const minutes = Math.floor((total % 3600) / 60);
    const seconds = total % 60;
    return hours > 0 ? `${hours}:${pad(minutes)}:${pad(seconds)}` : `${minutes}:${pad(seconds)}`;
};
