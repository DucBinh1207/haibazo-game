import clsx, { ClassValue } from "clsx";

export default function cn(...inputClassName: ClassValue[]) {
  return clsx(inputClassName);
}
