export default function removeUndefinedPropsFromAnObject(
  object: Record<string, unknown>
) {
  const newObjectWithoutUndefinedProps: Record<string, unknown> = {}

  Object.keys(object).forEach(
    key =>
      object[key] !== undefined &&
      (newObjectWithoutUndefinedProps[key] = object[key])
  )

  return newObjectWithoutUndefinedProps
}
