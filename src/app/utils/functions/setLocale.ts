export function setLocale(i18n: any, localeCode: string) {
	i18n.locale = localeCode;
	i18n.setLocaleCookie(localeCode);
}
