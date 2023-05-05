export function dateConverter(date: Date) {
	return date.toLocaleString('uk-UA', { timeZone: 'UTC' }).split(',')[0];
}
