import { degreesToRadians } from '../../helpers';
import { IPosition } from '../interfaces';

const BRANCH_LENGTH_MULTIPLIER = 0.78;
const BRANCH_WIDTH_MODIFIER = 2;
const BRANCH_ANGLE_OFFSET = 22;

class Branch {
    /**
     * Create a new brach.
     *
     * @param {IPosition} from The starting position.
     * @param {number} length The length of the branch.
     * @param {number} angle The angle of the branch.
     * @param {number} depth The depth of the branch.
     * @param {number} maxDepthThreshold The maximum depth threshold for the tree this branch belongs to.
     */
    public constructor(
        public readonly from: IPosition,
        public readonly length: number,
        public readonly angle: number,
        public readonly depth: number,
        public readonly maxDepthThreshold: number,
    ) {}

    /**
     * Get the end position of this branch.
     *
     * @return {IPosition}
     */
    public get to(): IPosition {
        const {
            from: { x: fromX, y: fromY },
            angle,
            length,
        } = this;

        return {
            x: fromX + Math.cos(degreesToRadians(angle)) * (length * -1),
            y: fromY + Math.sin(degreesToRadians(angle)) * (length * -1),
        };
    }

    /**
     * Render this branch to the canvas via `context`.
     *
     * @param {CanvasRenderingContext2D} context The canvas context.
     *
     * @return {void}
     */
    private render(context: CanvasRenderingContext2D): void {
        context.lineWidth = Math.max(
            this.maxDepthThreshold - BRANCH_WIDTH_MODIFIER - this.depth,
            1,
        );

        if (this.depth >= this.maxDepthThreshold - 2) {
            context.strokeStyle = '#4D7C0F';
        } else {
            context.strokeStyle = '#5C3317';
        }

        context.beginPath();
        context.moveTo(this.from.x, this.from.y);
        context.lineTo(this.to.x, this.to.y);
        context.stroke();
    }

    /**
     * Draw this branch and its child branches.
     *
     * @param {CanvasRenderingContext2D} context The canvas context.
     *
     * @return {void}
     */
    public draw(context: CanvasRenderingContext2D): void {
        this.render(context);

        if (this.depth >= this.maxDepthThreshold) return;

        const nextLength = this.length * BRANCH_LENGTH_MULTIPLIER;
        const oppositeAngle = this.angle + BRANCH_ANGLE_OFFSET;
        const nextAngle = this.angle - BRANCH_ANGLE_OFFSET;
        const nextDepth = this.depth + 1;

        new Branch(
            this.to,
            nextLength,
            nextAngle,
            nextDepth,
            this.maxDepthThreshold,
        ).draw(context);

        new Branch(
            this.to,
            nextLength,
            oppositeAngle,
            nextDepth,
            this.maxDepthThreshold,
        ).draw(context);
    }
}

export default Branch;
