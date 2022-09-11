export class MockHttpsError extends Error {
	status: number;
	constructor(props: { status: number; message: string }) {
		super(props.message);
		this.name = 'MockHttpsError';
		this.status = props.status;
	}
}
