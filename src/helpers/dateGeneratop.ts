export function dateConverter(date: Date) {
	return date.toLocaleString('en-GB', { timeZone: 'UTC' }).split(',')[0];
}
