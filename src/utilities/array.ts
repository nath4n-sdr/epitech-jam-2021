export function shuffle<T>(arr: T[]) {
  return arr
    .map((item) => ({item, random: Math.random()}))
    .sort((a, b) => a.random - b.random)
    .map((item) => item.item)
}
