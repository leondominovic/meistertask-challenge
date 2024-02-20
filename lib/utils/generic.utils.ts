export async function sleep(time: number): Promise<void> {
  return await new Promise((f) => setTimeout(f, time));
}
