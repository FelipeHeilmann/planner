import { Node } from './Node'

export class LinkedList<T> {
    protected count: number
    protected head: Node<T> | undefined


    constructor() {
        this.count = 0
        this.head = undefined
    }

    push(element: T): void {
        const node = new Node(element)
        let current: Node<T>

        current = this.head!
        while (current.next != null) {
            current = current.next
        }
        current.next = node
        this.count++
    }

    getElementAt(index: number): Node<T> | undefined {
        if (index >= 0 && index <= this.count) {
            let node = this.head
            for (let i = 0; i < index && node != null; i++) {
                node = node.next
            }
            return node
        }
        return undefined
    }

    setHead(element: T): void {
        this.head = new Node(element)
    }

    isEmpty(): boolean {
        return this.count === 0
    }

    getHead(): Node<T> {
        return this.head!
    }

    size(): number {
        return this.count
    }
}