export class WindowStack<T> {

	private _stack: Array<T> = new Array(64);

	private _size: number = 0;

	public add(element: T) : void {

		if(this._size < 64) {

			this._stack[this._size++] = element;

		}

	}

	public peek() : T {

		if(this._size > 0)

			return this._stack[this._size-1];

		return null;

	}

	public peekStack() : T[] {

		return this._stack;

	}

	public pop() : T {

		if(this._size > 0) {

			const size = --this._size;
			const out = this._stack[size];
			this._stack[size] = null;

			return out;

		}

		return null;

	}

	public size() : number {

		return this._size;

	}

	public empty() : boolean {

		return this._size === 0;

	}

}
