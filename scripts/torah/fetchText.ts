// Загрузка текста с Sefaria с повторами: временный 5xx или 429 не должен валить проверку содержания.
const ATTEMPTS = 5;
const PAUSE_MS = 2000;

/** Стоит повторить: перегрузка или сбой сервера, а не «нет такой страницы». */
const retryable = (status: number): boolean => status === 429 || status >= 500;

const pause = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

/** Тело ответа; до 5 попыток с нарастающей паузой, сетевые сбои тоже повторяются. */
export const fetchText = async (url: string): Promise<string> => {
    let last = '';
    for (let attempt = 1; attempt <= ATTEMPTS; attempt += 1) {
        try {
            const response = await fetch(url);
            if (response.ok) return await response.text();
            last = String(response.status);
            if (!retryable(response.status)) break;
        } catch (error) {
            last = String(error);
        }
        if (attempt < ATTEMPTS) await pause(PAUSE_MS * attempt);
    }
    throw new Error(`${url}: ${last}`);
};
