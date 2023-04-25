export function dateConverter(date: Date) {
	return date.toLocaleString('ua-UA', { timeZone: 'UTC' }).split(',')[0];
}
