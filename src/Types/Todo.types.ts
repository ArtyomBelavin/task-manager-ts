const TodoStatus = {
    Created: "Created",
    InProcess: "InProcess",
    Done: "Done",
} as const;

export type TodoStatusType = (typeof TodoStatus)[keyof typeof TodoStatus];

export type Todo = {
    id: number;
    title: string;
    description: string;
    status: TodoStatusType;
}