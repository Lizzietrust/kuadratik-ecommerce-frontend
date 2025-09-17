import React from "react";

interface CustomRadioInputProps {
  name: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  label: string;
  activeColor?: string;
  activePriceColor?: string;
  inactiveBorderColor?: string;
  hoverBorderColor?: string;
  labelActiveColor?: string;
  labelInactiveColor?: string;
}

const CustomRadioInput: React.FC<CustomRadioInputProps> = ({
  name,
  value,
  checked,
  onChange,
  label,
  activeColor = "border-[#22A24F] bg-[#22A24F]",
  activePriceColor = "border-[#22A24F] bg-transparent",
  inactiveBorderColor = "border-gray-300 bg-white",
  hoverBorderColor = "hover:border-[#22A24F]",
  labelActiveColor = "text-[#191C1F] font-medium",
  labelInactiveColor = "text-[#475156] font-normal",
}) => {
  const radioClasses = `w-5 h-5 rounded-full border-2 transition-all duration-200 ${
    checked && name === "price"
      ? activePriceColor
      : checked
      ? activeColor : `${inactiveBorderColor} ${hoverBorderColor}`
  }`;

  const labelClasses = `font-public-sans text-sm ${
    checked ? labelActiveColor : labelInactiveColor
  }`;

  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <div className="relative">
        {/* Hidden native radio input */}
        <input
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={() => onChange(value)}
          className="sr-only"
        />
        {/* Custom radio circle */}
        <div className={radioClasses}>
          {/* Inner dot when selected */}
          {checked && (
            <div
              className={`w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
                name === "price" ? "hidden" : ""
              }`}
            ></div>
          )}
        </div>
      </div>
      <span className={labelClasses}>{label}</span>
    </label>
  );
};

export default CustomRadioInput;
