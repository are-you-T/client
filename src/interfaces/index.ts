export interface resQuestion {
    error: string | null,
    data: {
        idx: number,
        subject: string,
        parent: string,
        answer: {
        I?: string,
        E?: string,
        S?: string,
        N?: string,
        T?: string,
        F?: string,
        J?: string,
        P?: string,
        },
        mbtiType: string,
        proportion: number
    }
}