import React from "react";

interface IInput {
  label?: string;
  type: string;
  placeholder?: string;
  value: string;
  icon?: React.ComponentType;

  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Input({
  label,
  type,
  placeholder,
  value,
  icon: Icon,
  onChange,
}: IInput) {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-zinc-300">
        {label}
      </label>
      <div className="h-14 flex-1 px-4 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 rounded-lg flex items-center gap-2">
        {Icon && <Icon />}
        <input
          type={type}
          onChange={onChange}
          className="border-gray-200 bg-white text-md text-gray-700 shadow-sm dark:border-gray-700 dark:bg-transparent dark:text-gray-200 outline-none flex-1"
          placeholder={placeholder}
          value={value}
        />
      </div>
    </div>
  );
}
