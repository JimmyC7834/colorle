"use client";

import React, {useEffect, useState} from "react";

type HSB = {
  h: number;
  s: number;
  b: number;
};

interface Props {
  color: string,
  onChange?: (color: string) => void,
}

const hexToHSB = (hex: string): HSB => {
  let r = 0, g = 0, b = 0;
  // 3 digits
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  }
  // 6 digits
  else if (hex.length === 7) {
    r = parseInt(hex[1] + hex[2], 16);
    g = parseInt(hex[3] + hex[4], 16);
    b = parseInt(hex[5] + hex[6], 16);
  }

  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let h = 0;
  let s = 0;
  const v = max;

  if (delta !== 0) {
    s = delta / max;

    if (r === max) {
      h = (g - b) / delta;
    } else if (g === max) {
      h = 2 + (b - r) / delta;
    } else {
      h = 4 + (r - g) / delta;
    }

    h *= 60;
    if (h < 0) h += 360;
  }

  return {
    h: Math.round(h),
    s: Math.round(s * 100),
    b: Math.round(v * 100),
  };
};

const hsbToHex = (hsb: HSB) => {
  const {h, s, b} = hsb;
  const c = (s / 100) * (b / 100);
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = (b / 100) - c;

  let r = 0, g = 0, bl = 0;
  if (h >= 0 && h < 60) {
    r = c;
    g = x;
  } else if (h >= 60 && h < 120) {
    r = x;
    g = c;
  } else if (h >= 120 && h < 180) {
    g = c;
    bl = x;
  } else if (h >= 180 && h < 240) {
    g = x;
    bl = c;
  } else if (h >= 240 && h < 300) {
    r = x;
    bl = c;
  } else if (h >= 300 && h < 360) {
    r = c;
    bl = x;
  }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  bl = Math.round((bl + m) * 255);

  return `#${((1 << 24) + (r << 16) + (g << 8) + bl).toString(16).slice(1).toUpperCase()}`;
};

const HSBColorPicker: React.FC<Props> = ({color, onChange}) => {
  const [hsb, setHSB] = useState<HSB>(hexToHSB(color));

  useEffect(() => {
    setHSB(hexToHSB(color));
  }, [color]);

  const handleHueChange = (hue: number) => {
    setHSB({...hsb, h: hue});
    onChange && onChange(hsbToHex(hsb));
  };
  const handleSaturationChange = (saturation: number) => {
    setHSB({...hsb, s: saturation});
    onChange && onChange(hsbToHex(hsb));
  };
  const handleBrightnessChange = (brightness: number) => {
    setHSB({...hsb, b: brightness})
    onChange && onChange(hsbToHex(hsb));
  };

  const hexColor = hsbToHex(hsb);

  const hueGradient = `linear-gradient(to right, red, yellow, lime, cyan, blue, magenta, red)`;
  const saturationGradient = `linear-gradient(to right, hsl(${hsb.h}, 0%, ${hsb.b}%), hsl(${hsb.h}, 100%, ${hsb.b}%))`;
  const brightnessGradient = `linear-gradient(to right, black, hsl(${hsb.h}, ${hsb.s}%, 50%), white)`;

  return (
    <div style={{width: "12.5rem"}}>
      <div>
        <input
          type="range"
          min="0"
          max="360"
          value={hsb.h}
          onChange={(e) => handleHueChange(Number(e.target.value))}
          className="h-6 rounded-full w-full"
          style={{
            background: hueGradient,
            appearance: "none",
            outline: "none",
            WebkitAppearance: "none",
          }}
        />
        <style jsx>{`
            input[type="range"]::-webkit-slider-thumb {
                appearance: none;
                width: 1.25rem;
                height: 1.25rem;
                background-color: hsl(${hsb.h}, 100%, 50%);
                border: 2px solid white;
                border-radius: 50%;
                cursor: pointer;
            }

            input[type="range"]::-moz-range-thumb {
                width: 1.25rem;
                height: 1.25rem;
                background-color: hsl(${hsb.h}, 100%, 50%);
                border: 2px solid white;
                border-radius: 50%;
                cursor: pointer;
            }
        `}</style>
      </div>

      <div>
        <input
          type="range"
          min="0"
          max="100"
          value={hsb.s}
          onChange={(e) => handleSaturationChange(Number(e.target.value))}
          className="h-6 rounded-full w-full"
          style={{
            background: saturationGradient,
            appearance: "none",
            outline: "none",
            WebkitAppearance: "none",
          }}
        />

        <style jsx>{`
            input[type="range"]::-webkit-slider-thumb {
                appearance: none;
                width: 1.25rem;
                height: 1.25rem;
                background-color: hsl(${hsb.h}, ${hsb.s}%, ${hsb.b}%);
                border: 2px solid white;
                border-radius: 50%;
                cursor: pointer;
            }

            input[type="range"]::-moz-range-thumb {
                width: 1.25rem;
                height: 1.25rem;
                background-color: hsl(${hsb.h}, ${hsb.s}%, ${hsb.b}%);
                border: 2px solid white;
                border-radius: 50%;
                cursor: pointer;
            }
        `}</style>
      </div>

      <div>
        <input
          type="range"
          min="0"
          max="100"
          value={hsb.b}
          onChange={(e) => handleBrightnessChange(Number(e.target.value))}
          className="h-6 rounded-full w-full"
          style={{
            background: brightnessGradient,
            appearance: "none",
            outline: "none",
            WebkitAppearance: "none",
          }}
        />
        <style jsx>{`
            input[type="range"]::-webkit-slider-thumb {
                appearance: none;
                width: 1.25rem;
                height: 1.25rem;
                background-color: hsl(${hsb.h}, ${hsb.s}%, ${hsb.b}%);
                border: 2px solid white;
                border-radius: 50%;
                cursor: pointer;
            }

            input[type="range"]::-moz-range-thumb {
                width: 1.25rem;
                height: 1.25rem;
                background-color: hsl(${hsb.h}, ${hsb.s}%, ${hsb.b}%);
                border: 2px solid white;
                border-radius: 50%;
                cursor: pointer;
            }
        `}</style>
      </div>
    </div>
  );
};

export default HSBColorPicker;
