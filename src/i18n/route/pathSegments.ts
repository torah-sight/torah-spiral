/** Сегменты пути без пустых и без конечного index.html. */
export const pathSegments = (pathname: string): string[] => {
    const segments = pathname.split('/').filter(Boolean);
    if (segments.at(-1) === 'index.html') segments.pop();
    return segments;
};
