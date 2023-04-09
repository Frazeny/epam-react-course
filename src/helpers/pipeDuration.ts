export function formattedDuration(duration: number): string {
	const hours = Math.floor(duration / 60);
	const minutes = duration % 60;
	return `${hours}:${minutes < 10 ? '0' : ''}${minutes} hours`;
}
