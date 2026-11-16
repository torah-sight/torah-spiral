import {AntiHookComponent} from '@react-carburetor/core';
import type {ReactNode} from 'react';
import type {IParsha} from '#src/content/model/types.ts';
import {PARSHIOT} from '#src/content/parshiot.ts';
import type {SizeUnit} from '#src/i18n/format/size/units.ts';

const maxVerses = (top: number, parsha: IParsha): number => Math.max(top, parsha.verses);
const maxWords = (top: number, parsha: IParsha): number => Math.max(top, parsha.raw);
const maxLetters = (top: number, parsha: IParsha): number => Math.max(top, parsha.letters);
const MAX: Record<SizeUnit, number> = {
    verses: PARSHIOT.reduce(maxVerses, 1),
    words: PARSHIOT.reduce(maxWords, 1),
    letters: PARSHIOT.reduce(maxLetters, 1)
};

/** Свойства полоски размера. */
export interface ISizeBarProps {
    value: number;
    unit: SizeUnit;
    bar: string;
    title: string;
}

/** Неоновая полоска: размер главы относительно самой большой по той же мере. */
export class SizeBar extends AntiHookComponent<ISizeBarProps> {
    /** Полоска. */
    public render(): ReactNode {
        const width = (this.props.value / MAX[this.props.unit]) * 100;
        return (
            <div title={this.props.title} className="relative mt-1.5 h-1 overflow-hidden rounded-full bg-veil">
                <div
                    className={`absolute inset-y-0 start-0 rounded-full ${this.props.bar}`}
                    style={{width: `${width}%`}}
                />
            </div>
        );
    }
}
