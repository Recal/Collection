type Nullable<T> = T | null;

class CollectionAllocationError extends Error {
  constructor(message: string) {
    super(message); 
    this.name = "CollectionAllocationError"; 
  }
}

export class Collection<T> {
    private holder: T[] = [];

    add(element: T): void {
        this.holder.push(element);
    }

    getBy(cb: (el: T) => boolean): Nullable<T> {
        for(const element of this.holder) {
            if(cb(element)) {
                return element;
            }
        }

        return null;
    }

    instanceOf( cb: (el: T) => boolean): T[] {

        const elHolder: T[] = [];


        for(const element of this.holder) {
            if(cb(element)) {
                elHolder.push(element);
            }
        }

        return elHolder;
    }

    firstOf(cb: (el: T) => boolean): Nullable<T> {
        return this.getBy(cb);
    }

    removeInstanceOf( cb: (el: T) => boolean): void {
        const elHolder = this.instanceOf(cb);

        if(elHolder.length > 0) {
            elHolder.forEach(el => {
                this.holder.splice(this.holder.indexOf(el), 1);
            });
        }
    }

    findAndRemove(element: T): void {
        this.holder.forEach(el => {
            if(el == element) {
                this.holder.splice(this.holder.indexOf(el), 1);
            }
        });
    }

    foldLeft<K>(cb: (oldValue: T,  newValue: T) => K): K {

        let elHolder: any = this.holder[0];

        for(let i = 1; i < this.holder.length; i++) {
            if(this.holder[i+1] != undefined) {
                if(elHolder == null) {
                    elHolder = cb(this.holder[i], this.holder[i+1]);
                } else {
                    elHolder += cb(this.holder[i], this.holder[i+1]);
                }
            }
        }

        return elHolder;
    }

    foldRight<K>(cb: (oldValue: T,  newValue: T) => K): K {
        function internalFold<K>(holder: T[], cb: (oldValue: T, newValue: T) => K): K {
            let elHolder: any = holder[0];

            for(let i = 1; i < holder.length; i++) {
                if(holder[i+1] != undefined) {
                    if(elHolder == null) {
                        elHolder = cb(holder[i], holder[i+1]);
                    } else {
                        elHolder += cb(holder[i], holder[i+1]);
                    }
                }
            }

            return elHolder;
        }
 
        return internalFold(this.holder.reverse(), cb);
    }

    clear(): Collection<T> {
        this.holder = [];
        return this;
    }

    count(): number {
        return this.holder.length;
    }

    elements(): T[] {
        return [...this.holder];
    }
}


export class CappedCollection<T> {

    private holder: T[] = [];
    private size: number;

    constructor(size: number) {
        this.holder = [];
        this.size = size;
    }

    add(element: T): void {
        if(this.holder.length != this.size) {
            this.holder.push(element);
        } else {
            throw new CollectionAllocationError("This collection is capped to " + this.size + " elements.");
        }
    }

    getBy(cb: (el: T) => boolean): Nullable<T> {
        for(const element of this.holder) {
            if(cb(element)) {
                return element;
            }
        }

        return null;
    }

    instanceOf( cb: (el: T) => boolean): T[] {

        const elHolder: T[] = [];


        for(const element of this.holder) {
            if(cb(element)) {
                elHolder.push(element);
            }
        }

        return elHolder;
    }

    firstOf(cb: (el: T) => boolean): Nullable<T> {
        return this.getBy(cb);
    }

    removeInstanceOf( cb: (el: T) => boolean): void {
        const elHolder = this.instanceOf(cb);

        if(elHolder.length > 0) {
            elHolder.forEach(el => {
                this.holder.splice(this.holder.indexOf(el), 1);
            });
        }
    }

    findAndRemove(element: T): void {
        this.holder.forEach(el => {
            if(el == element) {
                this.holder.splice(this.holder.indexOf(el), 1);
            }
        });
    }

    foldLeft<K>(cb: (oldValue: T,  newValue: T) => K): K {

        let elHolder: any = this.holder[0];

        for(let i = 1; i < this.holder.length; i++) {
            if(this.holder[i+1] != undefined) {
                if(elHolder == null) {
                    elHolder = cb(this.holder[i], this.holder[i+1]);
                } else {
                    elHolder += cb(this.holder[i], this.holder[i+1]);
                }
            }
        }

        return elHolder;
    }

    foldRight<K>(cb: (oldValue: T,  newValue: T) => K): K {
        function internalFold<K>(holder: T[], cb: (oldValue: T, newValue: T) => K): K {
            let elHolder: any = holder[0];

            for(let i = 1; i < holder.length; i++) {
                if(holder[i+1] != undefined) {
                    if(elHolder == null) {
                        elHolder = cb(holder[i], holder[i+1]);
                    } else {
                        elHolder += cb(holder[i], holder[i+1]);
                    }
                }
            }

            return elHolder;
        }
 
        return internalFold(this.holder.reverse(), cb);
    }

    clear(): CappedCollection<T> {
        this.holder = [];
        return this;
    }

    count(): number {
        return this.holder.length;
    }

    elements(): T[] {
        return [...this.holder];
    }    
}
