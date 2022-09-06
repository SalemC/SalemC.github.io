import { useCallback } from 'react';

import { ETheme } from '../enums';

export default function useGenerateBackground(theme: ETheme) {
    return useCallback(
        (context: CanvasRenderingContext2D, height: number): CanvasGradient => {
            const background = context.createLinearGradient(0, 0, 0, height);

            switch (theme) {
                case ETheme.DARK: {
                    background.addColorStop(0, 'rgb(15, 15, 15)');
                    background.addColorStop(0.2, 'rgb(39, 45, 58)');
                    background.addColorStop(0.4, 'rgb(83, 101, 135)');
                    background.addColorStop(0.5, 'rgb(136, 155, 191)');
                    background.addColorStop(0.7, 'rgb(255, 255, 255)');

                    break;
                }

                default:
                case ETheme.LIGHT: {
                    background.addColorStop(0, 'rgb(33, 102, 155)');
                    background.addColorStop(0.3, 'rgb(87, 193, 235)');
                    background.addColorStop(0.7, 'rgb(255, 255, 255)');
                }
            }

            return background;
        },
        [theme],
    );
}
