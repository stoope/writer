function classnames(
  ...classes: Array<string | undefined | null | false | number>
) {
  return classes.filter(Boolean).join(" ");
}

export { classnames };
