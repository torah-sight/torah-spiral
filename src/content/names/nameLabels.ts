import type {NameKey} from '#src/domain/names/types.ts';

/** Как Имя подписано в интерфейсе: с разделителем или заменой буквы, как принято вне свитка. */
export const NAME_LABELS: Record<NameKey, string> = {
    havaya: 'הוי״ה',
    elokim: 'אלקים',
    el: 'א־ל',
    adnut: 'אד־ני',
    shakai: 'ש־די',
    eloah: 'אלו־ה',
    yah: 'י־ה',
    ehyeh: 'אהי״ה'
};
