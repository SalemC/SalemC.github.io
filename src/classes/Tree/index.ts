import { IPosition } from '../interfaces';
import Branch from '../Branch';

const DEFAULT_MAX_DEPTH_THRESHOLD = 10;

class Tree extends Branch {
    /**
     * Create a new tree.
     *
     * @param {IPosition} from The starting position.
     * @param {number} length The length of the trunk.
     * @param {?number} maxDepthThreshold The maximum depth threshold.
     */
    public constructor(
        from: IPosition,
        length: number,
        maxDepthThreshold: number = DEFAULT_MAX_DEPTH_THRESHOLD,
    ) {
        super(from, length, 90, 0, maxDepthThreshold);
    }
}

export default Tree;
