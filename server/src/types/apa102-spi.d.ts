declare module 'apa102-spi' {
  class Apa102spi {
    /** Length of the write buffer in bytes */
    bufferLength: number;
    /** Buffer containing LED data to be sent over SPI */
    writeBuffer: Buffer;

    /**
     * Create a new APA102 LED driver instance
     * @param stringLength Number of LEDs in the string
     * @param clockDivider Even divisor of the base 250MHz rate (0-65536), defaults to 200
     */
    constructor(stringLength: number, clockDivider?: number);

    /**
     * Send the current LED buffer data to the LED string over SPI
     */
    sendLeds(): void;

    /**
     * Set the color of a specific LED
     * @param n LED index (0-based)
     * @param brightness Brightness level (0-31)
     * @param r Red value (0-255)
     * @param g Green value (0-255)
     * @param b Blue value (0-255)
     */
    setLedColor(
      n: number,
      brightness: number,
      r: number,
      g: number,
      b: number
    ): void;

    /**
     * Replace the LED data buffer with a custom buffer
     * @param ledBuffer Buffer containing LED color data
     */
    setBuffer(ledBuffer: Buffer): void;
  }

  export = Apa102spi;
}
