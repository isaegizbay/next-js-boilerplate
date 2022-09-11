export {};

declare global {
	namespace jest {
		interface Matchers<R> {
			nullOrAny(a: any): R;
		}
		interface Expect {
			nullOrAny(a: any): any;
		}
		interface InverseAsymmetricMatchers {
			nullOrAny(a: any): any;
		}
	}
}
