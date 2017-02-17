'use strict';

import JSTimestampProcessor from './JSTimestampProcessor';

export default class UnixTimestampProcessor extends JSTimestampProcessor {
	public get name(): string {
		return "UNIX timestamp";
	}

	protected toMillisecondsTimestamp(num: number) {
		return num * 1000;
	}
}
