"use client"

import { useOptimistic } from "react"
import type { InferSelectModel } from "drizzle-orm"

import type * as schema from "@/db/schema"
import { Todo } from "./todo" // Renamed to avoid conflict with type
import { Form } from "./form"
import { addTodo, removeTodo, toggleTodo } from "./actions"

type TodoType = InferSelectModel<typeof schema.todos>

export function TodoList({ initialTodos }: { initialTodos: TodoType[] }) {
  const [optimisticTodos, addOptimisticTodo] = useOptimistic<
    TodoType[],
    { action: "add" | "remove" | "toggle"; todo: TodoType }
  >(initialTodos, (state, { action, todo }) => {
    switch (action) {
      case "add":
        return [...state, todo]
      case "remove":
        return state.filter((t) => t.id !== todo.id)
      case "toggle":
        return state.map((t) => (t.id === todo.id ? { ...t, completed: !t.completed } : t))
    }
  })

  const handleAddTodo = async (formData: FormData) => {
    const description = formData.get("description") as string
    const newTodo = {
      id: Date.now(), // Temporary ID
      description,
      completed: false,
    } as TodoType // Cast to TodoType
    addOptimisticTodo({ action: "add", todo: newTodo })
    await addTodo(formData)
  }

  const handleRemoveTodo = async (id: number) => {
    addOptimisticTodo({ action: "remove", todo: { id } as TodoType })
    await removeTodo(id)
  }

  const handleToggleTodo = async (id: number) => {
    addOptimisticTodo({
      action: "toggle",
      todo: optimisticTodos.find((t) => t.id === id) as TodoType,
    })
    await toggleTodo(id)
  }

  return (
    <div className="space-y-3">
      {optimisticTodos.map((todo) => (
        <Todo key={todo.id} item={todo} onRemove={handleRemoveTodo} onToggle={handleToggleTodo} />
      ))}
      <Form onSubmit={handleAddTodo} />
    </div>
  )
}
