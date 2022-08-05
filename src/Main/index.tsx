import React, {
    useState,
    createRef,
    useEffect,
    useCallback,
    useLayoutEffect,
} from 'react';

import Details from './components/Details';
import useStyles from './hooks/useStyles';
import Tree from '../classes/Tree';

const Main: React.FC = () => {
    const canvasRef = createRef<HTMLCanvasElement>();
    const [treeAge, setTreeAge] = useState(1);
    const classes = useStyles();

    const render = useCallback(() => {
        const { current: canvas } = canvasRef;

        if (!canvas) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const context = canvas.getContext('2d');

        if (!context) return;

        const background = context.createLinearGradient(0, 0, 0, canvas.height);

        background.addColorStop(0, 'rgb(33, 102, 155)');
        background.addColorStop(0.3, 'rgb(87, 193, 235)');
        background.addColorStop(0.7, 'rgb(255, 255, 255)');

        context.fillStyle = background;
        context.fillRect(0, 0, canvas.width, canvas.height);

        new Tree(
            { x: canvas.width / 2, y: canvas.height },
            treeAge * 8,
            treeAge,
        ).draw(context);

        context.fillStyle = context;
    }, [canvasRef, treeAge]);

    useEffect(() => {
        window.addEventListener('resize', render);

        return () => {
            window.removeEventListener('resize', render);
        };
    }, [render]);

    useEffect(() => {
        if (treeAge >= 10) return;

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

            <Details />
        </>
    );
};

export default Main;
