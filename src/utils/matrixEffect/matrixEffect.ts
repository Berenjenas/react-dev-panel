/**
 * Matrix digital rain effect using HTML5 Canvas
 * Recreates the iconic falling green characters from The Matrix movie
 */

interface MatrixConfig {
	/** Font size in pixels */
	fontSize?: number;
	/** Animation speed (higher = faster) */
	speed?: number;
	/** Canvas background color */
	backgroundColor?: string;
	/** Text color for the matrix characters */
	textColor?: string;
}

interface MatrixDrop {
	y: number;
}

/**
 * Creates and manages a Matrix digital rain effect on a canvas element
 */
export class MatrixEffect {
	private canvas: HTMLCanvasElement;
	private ctx: CanvasRenderingContext2D;
	private intervalId: NodeJS.Timeout | null = null;
	private drops: MatrixDrop[] = [];
	private config: Required<MatrixConfig>;

	/** Matrix characters (katakana and numbers) */
	private readonly chars =
		"アカサタナハマヤラワガザダバパイキシチニヒミリヰギジヂビピウクスツヌフムユルグズヅブプエケセテネヘメレヱゲゼデベペオコソトノホモヨロヲゴゾドボポヴッン0123456789";

	private readonly defaultConfig: Required<MatrixConfig> = {
		fontSize: 18,
		speed: 1,
		backgroundColor: "#0001",
		textColor: "#0F0",
	};

	/**
	 * Creates a new Matrix effect instance
	 *
	 * @param canvas - The canvas element to render the effect on
	 * @param config - Optional configuration for the effect
	 */
	constructor(canvas: HTMLCanvasElement, config: MatrixConfig = {}) {
		this.canvas = canvas;
		this.config = { ...this.defaultConfig, ...config };

		const ctx = canvas.getContext("2d");
		if (!ctx) {
			throw new Error("Failed to get 2D context from canvas");
		}
		this.ctx = ctx;

		this.setupCanvas();
		this.initializeDrops();
	}

	/**
	 * Sets up the canvas size and styling
	 *
	 * @private
	 */
	private setupCanvas(): void {
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		this.canvas.style.position = "fixed";
		this.canvas.style.top = "0";
		this.canvas.style.left = "0";
		this.canvas.style.zIndex = "-1";
		this.canvas.style.background = "#000";

		// Initial black background
		this.ctx.fillStyle = "#000";
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
	}

	/**
	 * Initializes the drops array based on canvas width
	 *
	 * @private
	 */
	private initializeDrops(): void {
		const cols = Math.floor(this.canvas.width / 20) + 1;
		this.drops = Array(cols)
			.fill(null)
			.map(() => ({ y: 0 }));
	}

	/**
	 * Gets a random character from the matrix character set
	 *
	 * @returns Random matrix character
	 * @private
	 */
	private getRandomChar(): string {
		return this.chars[Math.floor(Math.random() * this.chars.length)];
	}

	/**
	 * Renders a single frame of the animation
	 *
	 * @private
	 */
	private draw(): void {
		this.ctx.fillStyle = this.config.backgroundColor;
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

		this.ctx.fillStyle = this.config.textColor;
		this.ctx.font = `${this.config.fontSize}px monospace`;

		this.drops.forEach((drop, index) => {
			const text = Math.random() > 0.5 ? String.fromCharCode(Math.random() * 128) : this.getRandomChar();

			const x = index * 20;
			this.ctx.fillText(text, x, drop.y);

			if (drop.y > 100 + Math.random() * 10000) {
				drop.y = 0;
			} else {
				drop.y += 20 * this.config.speed;
			}
		});
	}

	/**
	 * Animation loop
	 *
	 * @private
	 */
	private animate = (): void => {
		this.draw();
	};

	/**
	 * Starts the Matrix effect animation
	 */
	start(): void {
		if (this.intervalId !== null) {
			return;
		}
		this.intervalId = setInterval(this.animate, 50);
	}

	/**
	 * Stops the Matrix effect animation
	 */
	stop(): void {
		if (this.intervalId !== null) {
			clearInterval(this.intervalId);
			this.intervalId = null;
		}
	}

	/**
	 * Resizes the canvas and reinitializes drops
	 * Call this when window is resized
	 */
	resize(): void {
		this.setupCanvas();
		this.initializeDrops();
	}

	/**
	 * Updates the configuration and applies changes
	 *
	 * @param newConfig - New configuration to merge
	 */
	updateConfig(newConfig: Partial<MatrixConfig>): void {
		this.config = { ...this.config, ...newConfig };

		this.ctx.font = `${this.config.fontSize}px monospace`;

		if (newConfig.fontSize) {
			this.initializeDrops();
		}
	}

	/**
	 * Destroys the effect and cleans up resources
	 */
	destroy(): void {
		this.stop();
		this.canvas.remove();
	}
}

/**
 * Creates a Matrix effect on the document body
 * Convenient function for quick setup
 *
 * @param config - Optional configuration for the effect
 * @returns MatrixEffect instance
 *
 * @example
 * ```typescript
 * const matrix = createMatrixEffect({ fontSize: 20, speed: 2 });
 * matrix.start();
 *
 * // Later...
 * matrix.stop();
 * matrix.destroy();
 * ```
 */
export function createMatrixEffect(config: MatrixConfig = {}): MatrixEffect {
	const canvas = document.createElement("canvas");
	canvas.id = "matrix-effect";
	document.body.appendChild(canvas);

	const effect = new MatrixEffect(canvas, config);

	// Handle window resize
	const handleResize = () => effect.resize();
	window.addEventListener("resize", handleResize);

	// Store original destroy method and extend it
	const originalDestroy = effect.destroy.bind(effect);
	effect.destroy = () => {
		window.removeEventListener("resize", handleResize);
		originalDestroy();
	};

	return effect;
}
