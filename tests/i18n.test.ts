import {describe, expect, it} from '@rstest/core';
import type {Term} from '#src/content/model/types.ts';
import {countLabel} from '#src/i18n/format/size/countLabel.ts';
import {rankLabel} from '#src/i18n/format/size/rankLabel.ts';
import {sizeLabel} from '#src/i18n/format/size/sizeLabel.ts';
import {termLabel} from '#src/i18n/format/termLabel.ts';
import {termTranslation} from '#src/i18n/format/termTranslation.ts';
import {textDir} from '#src/i18n/format/textDir.ts';
import {LOCALES} from '#src/i18n/locales.ts';
import {MESSAGES} from '#src/i18n/messages/messages.ts';

const ADAM: Term = ['אדם', 'Адам', 'Adam'];

describe('MESSAGES', () => {
    it('у каждого языка те же ключи и непустые строки', () => {
        const keys = Object.keys(MESSAGES.ru).toSorted();
        for (const locale of LOCALES) {
            expect(Object.keys(MESSAGES[locale]).toSorted()).toEqual(keys);
            for (const value of Object.values(MESSAGES[locale])) {
                const parts = Array.isArray(value) ? value : [value];
                for (const part of parts) expect(String(part).length).toBeGreaterThan(0);
            }
            expect(MESSAGES[locale].floors).toHaveLength(4);
        }
    });
});

describe('форматирование терминов', () => {
    it('имя: перевод и иврит в скобках, на иврите — только иврит', () => {
        const isolated = `${String.fromCodePoint(0x20_68)}אדם${String.fromCodePoint(0x20_69)}`;
        expect(termLabel(ADAM, 'ru')).toBe(`Адам (${isolated})`);
        expect(termLabel(ADAM, 'en')).toBe(`Adam (${isolated})`);
        expect(termLabel(ADAM, 'he')).toBe('אדם');
        expect(termTranslation(ADAM, 'he')).toBe('');
        expect(termTranslation(ADAM, 'ru')).toBe('Адам');
    });

    it('размер главы: стихи с верным склонением и место', () => {
        expect(sizeLabel(176, 1, 'verses', 'ru')).toBe('176 стихов · 1-я по стихам');
        expect(sizeLabel(41, 52, 'verses', 'ru')).toBe('41 стих · 52-я по стихам');
        expect(sizeLabel(122, 9, 'verses', 'ru')).toBe('122 стиха · 9-я по стихам');
        expect(sizeLabel(111, 20, 'verses', 'ru')).toBe('111 стихов · 20-я по стихам');
        expect(sizeLabel(2266, 1, 'words', 'ru')).toBe('2266 слов · 1-я по словам');
        expect(sizeLabel(1931, 3, 'words', 'ru')).toBe('1931 слово · 3-я по словам');
        expect(sizeLabel(1554, 4, 'words', 'ru')).toBe('1554 слова · 4-я по словам');
        expect(sizeLabel(30, 54, 'verses', 'en')).toBe('30 verses · #54 by verses');
        expect(countLabel(2266, 'words', 'ru')).toBe('2266 слов');
        expect(rankLabel(3, 'letters', 'ru')).toBe('3-я по буквам');
        expect(rankLabel(3, 'words', 'he')).toBe('מקום 3 במילים');
        expect(sizeLabel(8632, 1, 'letters', 'ru')).toBe('8632 буквы · 1-я по буквам');
        expect(sizeLabel(1915, 50, 'letters', 'ru')).toBe('1915 букв · 50-я по буквам');
        expect(sizeLabel(1915, 50, 'letters', 'he')).toBe('1915 אותיות · מקום 50 באותיות');
        expect(sizeLabel(512, 52, 'words', 'he')).toBe('512 מילים · מקום 52 במילים');
    });

    it('иврит пишется справа налево', () => {
        expect(textDir('he')).toBe('rtl');
        expect(textDir('ru')).toBe('ltr');
        expect(textDir('en')).toBe('ltr');
    });
});
