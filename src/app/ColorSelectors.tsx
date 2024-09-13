"use client";

import {HexColorInput, HexColorPicker} from "react-colorful";
import HSBColorPicker from "@/app/HSBColorPicker";
import ResponsiveTabsLayout from "@/app/ResponsiveTabsLayout";

interface Props {
  color: string,
  onChange?: (color: string) => void,
}

export default function ColorSelectors({color, onChange}: Props) {
  const hexInput = () =>
    <div className="flex w-48 h-48 justify-center items-center">
      <HexColorInput color={color} onChange={onChange}
                     className="border-gray-700 border-4 text-center rounded-full p-2 text-black w-48"/>
    </div>

  const hexColorPicker = () =>
    <div className="flex w-48 h-48 justify-center items-center">
      <HexColorPicker color={color} onChange={onChange}/>
    </div>

  const hsbColorPicker = () =>
    <div className="flex w-48 h-48 justify-center items-center">
      <HSBColorPicker color={color} onChange={onChange}/>
    </div>

  const tabs = [
    {id: 'tab1', label: 'Tab 1', content: hexInput()},
    {id: 'tab2', label: 'Tab 2', content: hexColorPicker()},
    {id: 'tab3', label: 'Tab 3', content: hsbColorPicker()},
  ];

  return (
    <div className="">
      <ResponsiveTabsLayout tabs={tabs}/>
    </div>
  );
}