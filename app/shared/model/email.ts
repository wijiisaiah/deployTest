export class Email {
    constructor(
        public from: string,
        public subject: string,
        public to?: string,
        public body?: string,
        public type?: string
    ) {}
}
