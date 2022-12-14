import React, {
    useState,
    createRef,
    useEffect,
    useCallback,
    useLayoutEffect,
} from 'react';

import useGenerateBackground from './hooks/useGenerateBackground';
import Details from './components/Details';
import useStyles from './hooks/useStyles';
import Tree from '../classes/Tree';
import { ETheme } from './enums';

const TREE_MAX_AGE = 10;

const Main: React.FC = () => {
    const canvasRef = createRef<HTMLCanvasElement>();
    const [theme, setTheme] = useState(ETheme.DARK);
    const [treeAge, setTreeAge] = useState(1);
    const classes = useStyles();

    const generateBackground = useGenerateBackground(theme);

    const render = useCallback(() => {
        const { current: canvas } = canvasRef;

        if (!canvas) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const context = canvas.getContext('2d');

        if (!context) return;

        const background = generateBackground(context, canvas.height);

        context.fillStyle = background;
        context.fillRect(0, 0, canvas.width, canvas.height);

        const trees = [
            new Tree(
                { x: canvas.width * 0.25, y: canvas.height },
                treeAge * 4,
                treeAge - 5,
                Infinity,
            ),

            new Tree(
                { x: canvas.width * 0.5, y: canvas.height },
                treeAge * 6,
                treeAge - 3,
                Infinity,
            ),

            new Tree(
                { x: canvas.width * 0.75, y: canvas.height },
                treeAge * 8,
                treeAge,
                TREE_MAX_AGE - 1,
            ),
        ];

        trees.forEach((tree) => tree.draw(context));

        context.fillStyle = context;

        return () => {
            trees.forEach((tree) => tree.destroy());
        };
    }, [canvasRef, treeAge, generateBackground]);

    useEffect(() => {
        const listener = (event: KeyboardEvent) => {
            if (!['T', 't'].includes(event.key)) return;

            setTheme((theme) =>
                theme === ETheme.LIGHT ? ETheme.DARK : ETheme.LIGHT,
            );
        };

        document.addEventListener('keypress', listener);

        return () => {
            document.removeEventListener('keypress', listener);
        };
    }, []);

    useEffect(() => {
        window.addEventListener('resize', render);

        return () => {
            window.removeEventListener('resize', render);
        };
    }, [render]);

    useEffect(() => {
        if (treeAge >= TREE_MAX_AGE) return;

        const timeout = setTimeout(() => {
            setTreeAge((n) => n + 1);
        }, 75);

        return () => {
            clearTimeout(timeout);
        };
    }, [treeAge]);

    useLayoutEffect(render, [render]);

    return (
        <>
            <canvas className={classes.canvas} ref={canvasRef} />

            <Details visible={treeAge >= TREE_MAX_AGE} />
        </>
    );
};

export default Main;
