export default function classNames(
  primaryClassName: string,
  otherClassNamesSuffixes: { [className: string]: boolean }
) {
  return [
    primaryClassName,
    ...Object.entries(otherClassNamesSuffixes)
      .filter(([name, isIncluded]) => isIncluded)
      .map(([name]) => `${primaryClassName}--${name}`),
  ].join(" ");
}
