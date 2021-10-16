import { todoView } from "./template";
import { addTodo, changeCompleted, removeTodo } from "./todoEvent";

export interface ITodo {
    id: number;
    content: string;
    completed: boolean;
}

const todoData: ITodo[] = [];

class TodoList {

    private oTodoList: HTMLElement;
    private static instance: TodoList;

    constructor(oTodoList: HTMLElement) {
        this.oTodoList = oTodoList;
    }

    public static create(oTodoList: HTMLElement) {
        if (!TodoList.instance) {
            TodoList.instance = new TodoList(oTodoList);
        }
        return TodoList.instance;
    }

    @addTodo(todoData)
    public addItem(todo: ITodo) {
        const oItem: HTMLElement = document.createElement('div');
        oItem.className = 'todo-item';
        oItem.innerHTML = todoView(todo);
        this.oTodoList.appendChild(oItem);
    }

    @changeCompleted(todoData)
    public toggleCompleted(id: number, completed?: boolean) {
        const oItems: HTMLCollection = document.getElementsByClassName('todo-item');

        // @ts-ignore
        Array.from(oItems).forEach((oItem) => {
            const _id = parseInt(oItem.querySelector('input').dataset.id);
            if (_id === id) {
                const oContent: HTMLElement = oItem.querySelector('span');
                oContent.style.textDecoration = completed ? 'line-through' : 'none';
            }
        })
    }

    @removeTodo(todoData)
    public removeItem(id: number) {
        const oItems: HTMLCollection = document.getElementsByClassName('todo-item');

        // @ts-ignore
        Array.from(oItems).forEach((oItem) => {
            const _id = parseInt(oItem.querySelector('button').dataset.id);
            if (_id === id) {
                oItem.remove();
            }
        })
    }
}

export default TodoList;
