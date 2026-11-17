/**
 * Сверху до xl — место под ✕ в углу экрана, чтобы она не легла на карточку.
 * Фон модальной карточки: карточка прижата к верху на постоянном отступе;
 * место под полосу прокрутки занято всегда — карточка не сдвигается вбок при смене длины.
 */
export const OVERLAY = 'fixed inset-0 z-50 flex items-start justify-center overflow-y-auto overscroll-contain '
    + '[scrollbar-gutter:stable] bg-slate-900/25 p-3 pt-16 backdrop-blur-sm sm:p-8 sm:pt-16 xl:pt-8 dark:bg-black/60';
